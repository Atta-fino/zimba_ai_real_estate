import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

const DIASPORA_ESCROW_FEE_RATE = 0.02 // 2%

serve(async (req) => {
  try {
    const { record: booking } = await req.json()

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role, country')
      .eq('id', booking.user_id)
      .single()

    if (userError) {
      throw new Error(`Error fetching user: ${userError.message}`)
    }

    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('country_code')
      .eq('id', booking.property_id)
      .single()

    if (propertyError) {
      throw new Error(`Error fetching property: ${propertyError.message}`)
    }

    const isDiasporaUser = user.role === 'diaspora' || user.country !== property.country_code

    if (isDiasporaUser) {
      const escrowFee = booking.amount * DIASPORA_ESCROW_FEE_RATE

      const { error: insertError } = await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          amount: escrowFee,
          method: 'escrow_fee',
          status: 'pending',
        })

      if (insertError) {
        throw new Error(`Error inserting escrow fee: ${insertError.message}`)
      }

      // Log for analytics
      await supabase.from('analytics_events').insert({
        event_type: 'diaspora_escrow_fee_applied',
        user_id: booking.user_id,
        meta_json: {
          booking_id: booking.id,
          fee_amount: escrowFee,
        },
      })
    }

    return new Response(JSON.stringify({ message: 'Diaspora escrow fee processed' }), {
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
