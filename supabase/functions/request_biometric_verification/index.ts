import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  try {
    const { user_id, id_image_url, biometric_data } = await req.json()

    const { error: insertError } = await supabase
        .from('biometric_verifications')
        .insert({
            user_id,
            id_image_url,
            biometric_data
        })

    if (insertError) {
        throw new Error(`Error inserting biometric verification request: ${insertError.message}`)
    }

    const faceapi = require('face-api.js');
    const canvas = require('canvas');

    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    const idImage = await canvas.loadImage(id_image_url);
    const biometricImage = await canvas.loadImage(biometric_data);

    const idImageDetections = await faceapi.detectAllFaces(idImage).withFaceLandmarks().withFaceDescriptors();
    const biometricImageDetections = await faceapi.detectAllFaces(biometricImage).withFaceLandmarks().withFaceDescriptors();

    const faceMatcher = new faceapi.FaceMatcher(idImageDetections);
    const bestMatch = faceMatcher.findBestMatch(biometricImageDetections[0].descriptor);

    const isVerified = bestMatch.label !== 'unknown';

    const { error: updateError } = await supabase
        .from('biometric_verifications')
        .update({ status: isVerified ? 'approved' : 'rejected', processed_at: new Date() })
        .eq('user_id', user_id)

    if (isVerified) {
        await supabase
            .from('users')
            .update({ verification_status: 'approved' })
            .eq('id', user_id)
    }

    if (updateError) {
        throw new Error(`Error updating biometric verification request: ${updateError.message}`)
    }


    return new Response(JSON.stringify({ message: 'Biometric verification request created successfully' }), {
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
