import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

const weights = {
    deal_completed: 10,
    verification_completed: 20,
    flag_received: -30,
    responsiveness: 5,
};

serve(async (req) => {
  try {
    const { user_id, action, responsiveness_score } = await req.json()

    const { data: currentScore, error: currentScoreError } = await supabase
        .from('trust_scores')
        .select('score')
        .eq('user_id', user_id)
        .single()

    if (currentScoreError) {
        throw new Error(`Error fetching current score: ${currentScoreError.message}`)
    }

    let score_change = 0;
    let reason = '';

    switch (action) {
        case 'deal_completed':
            score_change = weights.deal_completed;
            reason = 'Deal completed successfully';
            break;
        case 'verification_completed':
            score_change = weights.verification_completed;
            reason = 'Verification completed successfully';
            break;
        case 'flag_received':
            score_change = weights.flag_received;
            reason = 'Flag received from another user';
            break;
        case 'responsiveness':
            score_change = weights.responsiveness * responsiveness_score;
            reason = 'Responsiveness score updated';
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }


    const newScore = currentScore.score + score_change

    const { error: updateError } = await supabase
        .from('trust_scores')
        .update({ score: newScore })
        .eq('user_id', user_id)

    if (updateError) {
        throw new Error(`Error updating score: ${updateError.message}`)
    }

    const { error: historyError } = await supabase
        .from('trust_score_history')
        .insert({
            user_id,
            score_change,
            reason
        })

    if (historyError) {
        throw new Error(`Error inserting score history: ${historyError.message}`)
    }


    return new Response(JSON.stringify({ message: 'Trust score updated successfully' }), {
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
