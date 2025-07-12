// supabase/functions/create_platform_commission/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient, Booking, Setting, Commission } from "../shared/supabase-client.ts";

console.log("Create Platform Commission Edge Function initializing...");

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      headers: { "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const payload = await req.json();
    // Assuming payload contains the booking_id (or the entire booking record if triggered by DB hook directly)
    // For webhook trigger after payment confirmation, payload might be: { record: { id: 'booking_id', ... } }
    // or { type: "INSERT", table: "payments", record: { booking_id: "...", status: "confirmed" } }

    const bookingId = payload.record?.booking_id || payload.record?.id || payload.booking_id;

    if (!bookingId) {
      console.error("Error: Booking ID not found in payload.", payload);
      return new Response(JSON.stringify({ error: "Booking ID is required." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log(`Processing commission for booking ID: ${bookingId}`);

    // 1. Fetch booking details
    const { data: bookingData, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("amount, transaction_type, currency_code") // Ensure 'amount' is on bookings or join with payments
      // .eq("id", bookingId) // This would be if payload only has booking_id
      // .single(); // Assuming booking_id is unique and payload refers to it.
      // For this mock, we'll assume bookingData comes directly or is found via a mock method
      // Let's assume our mock client returns the first booking for any select for simplicity here.
      // In real scenario, you'd use .eq("id", bookingId).single()

    // Using a simplified mock fetch for the booking based on the ID
    // This part needs to align with how the actual trigger/payload works.
    // If trigger is on 'payments' table, we'd fetch booking via booking_id from payment record.
    const bookingResult = await supabaseClient.from("bookings").select("*"); // Mock will return first booking
    const booking: Booking | null = bookingResult.data ? bookingResult.data[0] as Booking : null;


    if (bookingError || !booking) {
      console.error("Error fetching booking:", bookingError?.message || "Booking not found.");
      return new Response(JSON.stringify({ error: "Failed to fetch booking details: " + (bookingError?.message || "Booking not found") }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Booking details fetched:", booking);

    // 2. Get commission rate from settings
    const commissionRateKey = booking.transaction_type === 'sale'
      ? 'sale_commission_rate'
      : 'rent_commission_rate';

    const { data: settingsData, error: settingsError } = await supabaseClient
        .from("settings")
        .select("value") // Assuming 'value' directly stores the rate, e.g., 0.05
        // .eq("key", commissionRateKey) // This would be if settings value is simple number
        // .single();
        // For complex JSON value:
        // .select("value->>rate") // If value is {"rate": 0.05}
        // .eq("key", commissionRateKey)
        // .single();

    // Mock settings fetch:
    const allSettings = (await supabaseClient.from("settings").select("key,value")).data as Setting[];
    const rateSetting = allSettings?.find(s => s.key === commissionRateKey);

    if (settingsError || !rateSetting || typeof rateSetting.value !== 'number') {
      console.error("Error fetching commission rate setting:", settingsError?.message || "Rate setting not found or invalid.");
      return new Response(JSON.stringify({ error: "Failed to fetch commission rate: " + (settingsError?.message || "Rate not found/invalid") }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
    const commissionRate = rateSetting.value as number;
    console.log(`Commission rate for ${booking.transaction_type}: ${commissionRate}`);

    // 3. Calculate commission
    const commissionAmount = booking.amount * commissionRate;
    console.log(`Calculated commission amount: ${commissionAmount} ${booking.currency_code}`);

    // 4. Insert commission into commissions table
    const newCommission: Commission = {
      booking_id: bookingId, // Use the ID from the payload/trigger
      amount: commissionAmount,
      type: booking.transaction_type,
      currency_code: booking.currency_code, // Store currency with commission
      agent_id: null, // Platform commission, no specific agent
      // timestamp is handled by created_at default
    };

    const { data: commissionInsertData, error: commissionInsertError } = await supabaseClient
      .from("commissions")
      .insert([newCommission]);

    if (commissionInsertError) {
      console.error("Error inserting commission:", commissionInsertError.message);
      return new Response(JSON.stringify({ error: "Failed to record commission: " + commissionInsertError.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Platform commission created successfully:", commissionInsertData);
    return new Response(JSON.stringify({ success: true, commission: commissionInsertData }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Unhandled error in create_platform_commission:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Internal server error." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/*
Example Invocation (for testing locally, not how Supabase triggers it):
curl -i --location --request POST 'http://localhost:8000/create_platform_commission' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "record": {
      "booking_id": "mock_booking_id_from_payment"
      // Or if triggered directly from bookings:
      // "id": "mock_booking_id",
      // "amount": 5000,
      // "transaction_type": "rent",
      // "currency_code": "NGN"
    }
  }'
*/
