import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const dateString = yesterday.toISOString().slice(0, 10)

    const { data: commissions, error } = await supabase
        .from('commissions')
        .select('amount, commission_for')
        .gte('created_at', `${dateString}T00:00:00.000Z`)
        .lt('created_at', `${dateString}T23:59:59.999Z`)

    if (error) {
        throw new Error(`Error fetching commissions: ${error.message}`)
    }

    const totalCommission = commissions.reduce((acc, commission) => acc + commission.amount, 0)
    const platformCommission = commissions
        .filter(c => c.commission_for === 'platform')
        .reduce((acc, commission) => acc + commission.amount, 0)
    const agentCommission = commissions
        .filter(c => c.commission_for === 'agent')
        .reduce((acc, commission) => acc + commission.amount, 0)
    const totalTransactions = commissions.length

    const { error: insertError } = await supabase
        .from('commission_analytics')
        .insert({
            date: dateString,
            total_commission: totalCommission,
            platform_commission: platformCommission,
            agent_commission: agentCommission,
            total_transactions: totalTransactions
        })

    if (insertError) {
        throw new Error(`Error inserting commission analytics: ${insertError.message}`)
    }


    return new Response(JSON.stringify({ message: 'Commission analytics updated successfully' }), {
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
