import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { user_id, payment_token } = await req.json()

    const Flutterwave = require('flutterwave-node-v3');
    const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

    try {
        const response = await flw.Tokenized.charge({
            token: payment_token,
            currency: "NGN",
            amount: 5000,
            email: "user@gmail.com",
            tx_ref: `verified_agent_${user_id}`
        });
    } catch (error) {
        throw new Error(`Payment failed: ${error.message}`)
    }

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
