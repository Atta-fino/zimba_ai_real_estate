import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { action, payload } = await req.json()

    if (action === 'create') {
        const { booking_id, due_date, amount } = payload
        const { error } = await supabase
            .from('flexpay_plans')
            .insert({ booking_id, due_date, amount })
        if(error) throw error
    } else if (action === 'update') {
        const { id, due_date, amount, paid } = payload
        const { error } = await supabase
            .from('flexpay_plans')
            .update({ due_date, amount, paid })
            .eq('id', id)
        if(error) throw error
    } else if (action === 'delete') {
        const { id } = payload
        const { error } = await supabase
            .from('flexpay_plans')
            .delete()
            .eq('id', id)
        if(error) throw error
    }


    return new Response(JSON.stringify({ message: 'FlexPay plan managed successfully' }), {
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
