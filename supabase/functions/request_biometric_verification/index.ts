import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Tesseract } from "https://deno.land/x/tesseract/mod.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

export const app = new Application();

app.use(async (ctx) => {
  try {
    const { user_id, id_image_url, biometric_data, metadata } = await ctx.request.body().value;

    // 1. Insert initial verification request
    const { data: verification, error: insertError } = await supabase
        .from('biometric_verifications')
        .insert({
            user_id,
            id_image_url,
            biometric_data,
            metadata,
        })
        .single()

    if (insertError) {
        throw new Error(`Error inserting biometric verification request: ${insertError.message}`)
    }

    // 2. Perform OCR on the ID document
    const tesseract = new Tesseract();
    const ocrResult = await tesseract.recognize(id_image_url);

    // 3. Perform Face ID match using a secure FaceID API
    const faceIdResponse = await fetch('https://api.faceid.com/v1/match', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('FACEID_API_KEY')}`,
        },
        body: JSON.stringify({
            id_image_url,
            biometric_data,
        }),
    });

    const faceIdResult = await faceIdResponse.json();

    let isFaceMatch = faceIdResult.isMatch;
    let reason = faceIdResult.reason;

    // 4. Admin review cues
    let status = 'approved';
    if (!isFaceMatch) {
      status = 'rejected';
    } else if (metadata.ip_address && metadata.gps_location) {
        // Basic check for location mismatch
        if (metadata.ip_address.country !== metadata.gps_location.country) {
            status = 'flagged';
            reason = 'IP address and GPS location mismatch.';
        }
    }


    // 5. Update verification status
    const { error: updateError } = await supabase
        .from('biometric_verifications')
        .update({ status, reason, processed_at: new Date() })
        .eq('id', verification.id)

    if (updateError) {
        throw new Error(`Error updating biometric verification request: ${updateError.message}`)
    }

    if (status === 'approved') {
        await supabase
            .from('users')
            .update({ verification_status: 'approved' })
            .eq('id', user_id)
    }

    ctx.response.status = 200;
    ctx.response.body = { status, reason };

  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

await app.listen({ port: 8000 });
