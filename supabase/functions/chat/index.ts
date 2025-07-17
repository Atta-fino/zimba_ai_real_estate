import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { messages } = await req.json()

    const dialogflow = require('@google-cloud/dialogflow');
    const sessionClient = new dialogflow.SessionsClient();

    const sessionPath = sessionClient.projectAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, '123456');

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: messages[messages.length - 1].text,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (result.intent.displayName === 'property_recommendation') {
        const { data: searchHistory, error } = await supabase
            .from('analytics_events')
            .select('meta_json')
            .eq('user_id', '123') // TODO: Get user ID from session
            .eq('event_type', 'search')
            .limit(1)
            .single()

        if(error) throw error

        const lastSearch = searchHistory.meta_json.query
        const { data: recommendedProperties, error: recommendationError } = await supabase
            .from('properties')
            .select('*')
            .textSearch('title', lastSearch, { type: 'websearch' })
            .limit(3)

        if(recommendationError) throw recommendationError

        const propertyNames = recommendedProperties.map(p => p.title).join(', ')
        const reply = `Based on your recent search for "${lastSearch}", you might be interested in: ${propertyNames}`

        return new Response(JSON.stringify({ reply }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    }

    return new Response(JSON.stringify({ reply: result.fulfillmentText }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
