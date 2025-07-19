import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*, users(email)')
        .eq('transaction_type', 'rent')
        .lte('rent_due_date', new Date().toISOString())

    if (error) {
        throw new Error(`Error fetching bookings: ${error.message}`)
    }

    for (const booking of bookings) {
        // Send in-app notification
        await supabase
            .from('notifications')
            .insert({
                user_id: booking.user_id,
                message: `Your rent for property ${booking.property_id} is due on ${booking.rent_due_date}`
            })

        // Send email
        console.log(`Sending rent reminder email to ${booking.users.email}`)

        // Send WhatsApp message
        console.log(`Sending rent reminder WhatsApp message to ${booking.users.phone}`)
    }


    return new Response(JSON.stringify({ message: 'Rent reminders sent successfully' }), {
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
