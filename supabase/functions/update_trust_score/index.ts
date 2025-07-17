import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { user_id, score_change, reason } = await req.json()

    const { data: currentScore, error: currentScoreError } = await supabase
        .from('trust_scores')
        .select('score')
        .eq('user_id', user_id)
        .single()

    if (currentScoreError) {
        throw new Error(`Error fetching current score: ${currentScoreError.message}`)
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
