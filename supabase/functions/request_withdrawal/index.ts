import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { agent_id, amount } = await req.json()

    // First, check if the agent has enough balance
    const { data: agentCommissions, error: commissionError } = await supabase
        .from('commissions')
        .select('amount')
        .eq('agent_id', agent_id)
        .eq('commission_for', 'agent')

    if(commissionError) {
        throw new Error(`Error fetching agent commissions: ${commissionError.message}`)
    }

    const totalEarnings = agentCommissions.reduce((acc, commission) => acc + commission.amount, 0)

    const { data: agentWithdrawals, error: withdrawalError } = await supabase
        .from('withdrawals')
        .select('amount')
        .eq('agent_id', agent_id)
        .eq('status', 'approved')

    if(withdrawalError) {
        throw new Error(`Error fetching agent withdrawals: ${withdrawalError.message}`)
    }

    const totalWithdrawn = agentWithdrawals.reduce((acc, withdrawal) => acc + withdrawal.amount, 0)

    if (totalEarnings - totalWithdrawn < amount) {
        return new Response(JSON.stringify({ error: 'Insufficient balance' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }


    const { error: insertError } = await supabase
      .from('withdrawals')
      .insert({
        agent_id,
        amount,
      })

    if (insertError) {
      throw new Error(`Error inserting withdrawal request: ${insertError.message}`)
    }

    return new Response(JSON.stringify({ message: 'Withdrawal request created successfully' }), {
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
