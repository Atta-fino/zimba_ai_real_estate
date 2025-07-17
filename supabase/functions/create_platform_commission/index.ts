import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { record: payment } = await req.json()

    if (payment.status !== 'confirmed') {
      return new Response(JSON.stringify({ message: 'Payment not confirmed' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*, properties(*)')
      .eq('id', payment.booking_id)
      .single()

    if (bookingError) {
      throw new Error(`Error fetching booking: ${bookingError.message}`)
    }

    const commissionRateKey = `${booking.transaction_type}_commission_rate`
    const { data: commissionRateSetting, error: settingError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', commissionRateKey)
      .single()

    if (settingError) {
      throw new Error(`Error fetching commission rate: ${settingError.message}`)
    }

    const commissionRate = parseFloat(commissionRateSetting.value.value)
    const commissionAmount = booking.properties.price * commissionRate

    const { error: insertError } = await supabase
      .from('commissions')
      .insert({
        booking_id: booking.id,
        amount: commissionAmount,
        type: booking.transaction_type,
      })

    if (insertError) {
      throw new Error(`Error inserting commission: ${insertError.message}`)
    }

    return new Response(JSON.stringify({ message: 'Commission created successfully' }), {
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
