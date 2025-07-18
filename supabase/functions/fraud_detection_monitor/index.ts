import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, location, latitude, longitude, owner_id, users(latitude, longitude)')

    if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
    }

    const stringSimilarity = require('string-similarity');

    for (let i = 0; i < properties.length; i++) {
        for (let j = i + 1; j < properties.length; j++) {
            const similarity = stringSimilarity.compareTwoStrings(properties[i].title, properties[j].title);
            if (similarity > 0.8) {
                await supabase
                    .from('properties')
                    .update({ flagged: true })
                    .eq('id', properties[i].id)

                await supabase
                    .from('properties')
                    .update({ flagged: true })
                    .eq('id', properties[j].id)
            }
        }
    }

    for (const property of properties) {
        if (property.users) {
            const distance = getDistance(
                { latitude: property.latitude, longitude: property.longitude },
                { latitude: property.users.latitude, longitude: property.users.longitude }
            );

            if (distance > 10000) { // 10km
                await supabase
                    .from('properties')
                    .update({ flagged: true })
                    .eq('id', property.id)
            }
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
