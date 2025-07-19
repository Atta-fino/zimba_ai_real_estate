import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Sift } from 'https://deno.land/x/sift/mod.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

const sift = new Sift({
    apiKey: Deno.env.get('SIFT_API_KEY'),
    accountId: Deno.env.get('SIFT_ACCOUNT_ID'),
})

serve(async (req) => {
  try {
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, location, latitude, longitude, owner_id, users(latitude, longitude, ip_address)')

    if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
    }

    // 1. Duplicate title detection
    const stringSimilarity = require('string-similarity');
    for (let i = 0; i < properties.length; i++) {
        for (let j = i + 1; j < properties.length; j++) {
            const similarity = stringSimilarity.compareTwoStrings(properties[i].title, properties[j].title);
            if (similarity > 0.8) {
                await flagProperty(properties[i].id, 'Duplicate title');
                await flagProperty(properties[j].id, 'Duplicate title');
            }
        }
    }

    // 2. Location mismatch detection
    for (const property of properties) {
        if (property.users) {
            const distance = getDistance(
                { latitude: property.latitude, longitude: property.longitude },
                { latitude: property.users.latitude, longitude: property.users.longitude }
            );

            if (distance > 10000) { // 10km
                await flagProperty(property.id, 'Location mismatch');
            }
        }
    }

    // 3. Sift integration for advanced fraud detection
    for (const property of properties) {
        const siftResponse = await sift.track('$create_content', {
            $user_id: property.owner_id,
            $content_id: property.id,
            $session_id: 'a-session-id', // You should generate a unique session ID for each request
            $ip: property.users.ip_address,
            $user_agent: 'Zimba Backend', // You should get the user agent from the request
            $title: property.title,
            $location: property.location,
            $latitude: property.latitude,
            $longitude: property.longitude,
        });

        if (siftResponse.score > 0.8) {
            await flagProperty(property.id, 'High fraud score from Sift');
        }
    }


    return new Response(JSON.stringify({ message: 'Fraud detection monitor ran successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

async function flagProperty(propertyId, reason) {
    await supabase
        .from('properties')
        .update({ flagged: true, flagged_reason: reason })
        .eq('id', propertyId)
}

function getDistance(coord1, coord2) {
    const R = 6371e3; // metres
    const φ1 = coord1.latitude * Math.PI/180; // φ, λ in radians
    const φ2 = coord2.latitude * Math.PI/180;
    const Δφ = (coord2.latitude-coord1.latitude) * Math.PI/180;
    const Δλ = (coord2.longitude-coord1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}
