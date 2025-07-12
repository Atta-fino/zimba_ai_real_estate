// supabase/functions/apply_diaspora_escrow_fee/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient, User, Property, Booking, Setting, AnalyticsEvent } from "../shared/supabase-client.ts";

console.log("Apply Diaspora Escrow Fee Edge Function initializing...");

/**
 * This function calculates an additional escrow fee for diaspora users.
 * It could be triggered by a webhook when a booking is created, or called directly
 * before finalizing a payment amount.
 *
 * It checks if the booking user is a diaspora user OR if their country
 * differs from the property's country.
 */
serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      headers: { "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const payload = await req.json();
    // Assuming payload contains the booking record or at least booking_id
    const bookingId = payload.record?.id || payload.booking_id;
    if (!bookingId) {
      return new Response(JSON.stringify({ error: "Booking ID is required." }), { status: 400 });
    }

    console.log(`Checking diaspora status for booking: ${bookingId}`);

    // 1. Fetch the full booking, user, and property details
    // In a real query, you'd join these:
    // .from('bookings').select('*, user:users(*), property:properties(*)')
    const bookingResult = await supabaseClient.from("bookings").select("*"); // Mock returns first booking
    const userResult = await supabaseClient.from("users").select("*"); // Mock returns first user
    const propertyResult = await supabaseClient.from("properties").select("*"); // Mock returns first property

    const booking: Booking | null = bookingResult.data?.[0];
    const user: User | null = userResult.data?.[0];
    const property: Property | null = propertyResult.data?.[0];

    if (!booking || !user || !property) {
      return new Response(JSON.stringify({ error: "Could not retrieve booking, user, or property details." }), { status: 500 });
    }

    console.log(`User role: ${user.role}, User country: ${user.country}, Property country: ${property.country}`);


    // 2. Check if the diaspora fee condition is met
    const isDiasporaUser = user.role === 'diaspora';
    const isCrossBorderTransaction = user.country !== property.country;

    if (!isDiasporaUser && !isCrossBorderTransaction) {
      console.log("Condition for diaspora fee not met. No fee applied.");
      return new Response(JSON.stringify({ fee_applied: false, fee_amount: 0 }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log(`Diaspora fee condition met. isDiasporaUser: ${isDiasporaUser}, isCrossBorder: ${isCrossBorderTransaction}`);

    // 3. Get the diaspora escrow fee rate from settings
    const allSettings = (await supabaseClient.from("settings").select("key,value")).data as Setting[];
    const rateSetting = allSettings?.find(s => s.key === 'diaspora_escrow_fee_rate');

    if (!rateSetting || typeof rateSetting.value !== 'number') {
      console.error("Diaspora escrow fee rate not found or invalid in settings.");
      return new Response(JSON.stringify({ error: "Diaspora fee rate setting is missing or invalid." }), { status: 500 });
    }
    const diasporaRate = rateSetting.value as number;
    console.log(`Diaspora fee rate: ${diasporaRate}`);

    // 4. Calculate the fee
    const escrowFee = booking.amount * diasporaRate;
    console.log(`Calculated diaspora escrow fee: ${escrowFee}`);

    // 5. Log this event for analytics
    const event: AnalyticsEvent = {
        event_type: 'diaspora_fee_applied',
        user_id: user.id,
        meta_json: {
            booking_id: booking.id,
            fee_amount: escrowFee,
            currency: booking.currency_code,
            rate_applied: diasporaRate,
            reason: isDiasporaUser ? 'user_role_diaspora' : 'cross_border_transaction',
        }
    };

    const { error: logError } = await supabaseClient.from("analytics_events").insert([event]);
    if (logError) {
        // Non-critical error, so we don't fail the whole request, just log it.
        console.error("Failed to log diaspora fee analytics event:", logError.message);
    } else {
        console.log("Diaspora fee analytics event logged successfully.");
    }

    // This function's primary job might be to return the fee so another process can add it to the total.
    // Or it could directly update the payment/booking record.
    // Returning the fee is a safer, more modular approach.
    return new Response(JSON.stringify({
        fee_applied: true,
        fee_amount: escrowFee,
        currency: booking.currency_code,
        new_total_amount: booking.amount + escrowFee, // Example of new total
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Unhandled error in apply_diaspora_escrow_fee:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Internal server error." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/*
Example Invocation:
curl -i --location --request POST 'http://localhost:8000/apply_diaspora_escrow_fee' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "record": { "id": "mock_booking_id" }
  }'
*/
