// supabase/functions/apply_diaspora_escrow_fee/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient, User, Property, Booking, Setting, AnalyticsEvent } from "../shared/supabase-client.ts";

console.log("🚀 Diaspora Escrow Fee Function Starting...");

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      headers: { "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const payload = await req.json();
    const bookingId = payload.record?.id || payload.booking_id;

    if (!bookingId) {
      return new Response(JSON.stringify({ error: "Booking ID is required." }), { status: 400 });
    }

    // Fetch booking
    const { data: booking, error: bookingErr } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      throw new Error("Booking not found.");
    }

    // Fetch user
    const { data: user, error: userErr } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", booking.user_id)
      .single();

    if (userErr || !user) {
      throw new Error("User not found.");
    }

    // Fetch property
    const { data: property, error: propErr } = await supabaseClient
      .from("properties")
      .select("*")
      .eq("id", booking.property_id)
      .single();

    if (propErr || !property) {
      throw new Error("Property not found.");
    }

    const isDiasporaUser = user.role === 'diaspora';
    const isCrossBorder = user.country !== property.country;

    if (!isDiasporaUser && !isCrossBorder) {
      return new Response(JSON.stringify({ fee_applied: false, fee_amount: 0 }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Fetch diaspora fee rate
    const { data: settings } = await supabaseClient
      .from("settings")
      .select("key,value")
      .eq("key", "diaspora_escrow_fee_rate");

    const feeRate = parseFloat(settings?.[0]?.value || "0.02");
    const escrowFee = booking.amount * feeRate;

    // Insert analytics
    const analyticsEvent: AnalyticsEvent = {
      event_type: "diaspora_escrow_fee_applied",
      user_id: user.id,
      meta_json: {
        booking_id: booking.id,
        fee_amount: escrowFee,
        currency: booking.currency_code,
        reason: isDiasporaUser ? "role=diaspora" : "country mismatch",
      },
    };

    const { error: analyticsError } = await supabaseClient
      .from("analytics_events")
      .insert([analyticsEvent]);

    if (analyticsError) {
      console.warn("Analytics log failed:", analyticsError.message);
    }

    return new Response(JSON.stringify({
      fee_applied: true,
      fee_amount: escrowFee,
      currency: booking.currency_code,
      new_total: booking.amount + escrowFee,
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    console.error("Unhandled error:", err.message);
    return new Response(JSON.stringify({ error: err.message || "Server error." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
