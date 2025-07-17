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

    // Platform commission
    const platformCommissionRateKey = `${booking.transaction_type}_commission_rate`
    const { data: platformCommissionRateSetting, error: platformSettingError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', platformCommissionRateKey)
      .single()

    if (platformSettingError) {
      throw new Error(`Error fetching platform commission rate: ${platformSettingError.message}`)
    }

    const platformCommissionRate = parseFloat(platformCommissionRateSetting.value.value)
    const platformCommissionAmount = booking.properties.price * platformCommissionRate

    await supabase
      .from('commissions')
      .insert({
        booking_id: booking.id,
        amount: platformCommissionAmount,
        type: booking.transaction_type,
        commission_for: 'platform',
      })

    // Agent commission
    if (booking.agent_id) {
        const agentCommissionRateKey = `agent_commission_rate`
        const { data: agentCommissionRateSetting, error: agentSettingError } = await supabase
            .from('settings')
            .select('value')
            .eq('key', agentCommissionRateKey)
            .single()

        if (agentSettingError) {
            throw new Error(`Error fetching agent commission rate: ${agentSettingError.message}`)
        }

        const agentCommissionRate = parseFloat(agentCommissionRateSetting.value.value)
        const agentCommissionAmount = booking.properties.price * agentCommissionRate

        await supabase
            .from('commissions')
            .insert({
                booking_id: booking.id,
                agent_id: booking.agent_id,
                amount: agentCommissionAmount,
                type: booking.transaction_type,
                commission_for: 'agent',
            })
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
