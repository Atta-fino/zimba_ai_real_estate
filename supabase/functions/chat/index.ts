import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { messages } = await req.json()

    // TODO: Implement actual chat logic
    const lastMessage = messages[messages.length - 1].text.toLowerCase()
    let reply = "I'm sorry, I don't understand."

    if (lastMessage.includes("hello")) {
      reply = "Hello! How can I help you today?"
    } else if (lastMessage.includes("help")) {
      reply = "I can help you with finding properties, understanding the buying process, and more. What do you need help with?"
    }

    return new Response(JSON.stringify({ reply }), {
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
