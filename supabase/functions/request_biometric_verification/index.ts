import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { user_id, id_image_url, biometric_data } = await req.json()

    const { error: insertError } = await supabase
        .from('biometric_verifications')
        .insert({
            user_id,
            id_image_url,
            biometric_data
        })

    if (insertError) {
        throw new Error(`Error inserting biometric verification request: ${insertError.message}`)
    }

    // Simulate a call to a third-party API
    const isVerified = Math.random() > 0.5

    const { error: updateError } = await supabase
        .from('biometric_verifications')
        .update({ status: isVerified ? 'approved' : 'rejected', processed_at: new Date() })
        .eq('user_id', user_id)

    if (updateError) {
        throw new Error(`Error updating biometric verification request: ${updateError.message}`)
    }


    return new Response(JSON.stringify({ message: 'Biometric verification request created successfully' }), {
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
