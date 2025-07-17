import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { user_id, payment_token } = await req.json()

    // TODO: Process payment with Flutterwave or Stripe

    const { error } = await supabase
        .from('users')
        .update({ verified_agent: true })
        .eq('id', user_id)

    if (error) {
        throw new Error(`Error upgrading to verified agent: ${error.message}`)
    }

    return new Response(JSON.stringify({ message: 'Upgraded to verified agent successfully' }), {
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
