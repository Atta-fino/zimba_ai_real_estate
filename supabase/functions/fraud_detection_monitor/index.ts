import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, location')

    if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
    }

    const duplicates = properties.reduce((acc, property) => {
        const key = `${property.title}|${property.location}`
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(property.id)
        return acc
    }, {})

    for (const key in duplicates) {
        if (duplicates[key].length > 1) {
            // Flag duplicate listings
            for (const id of duplicates[key]) {
                await supabase
                    .from('properties')
                    .update({ flagged: true })
                    .eq('id', id)
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
