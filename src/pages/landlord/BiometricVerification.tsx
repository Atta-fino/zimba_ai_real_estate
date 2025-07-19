import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BiometricVerification = ({ userId }) => {
  const [idImageUrl, setIdImageUrl] = useState('');
  const [biometricData, setBiometricData] = useState('');

  const handleUpload = async () => {
    const { error } = await supabase.functions.invoke('request_biometric_verification', {
        body: { user_id: userId, id_image_url: idImageUrl, biometric_data: biometricData },
    })

    if (error) {
      console.error('Error requesting biometric verification:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Biometric Verification</h1>
      <div className="mb-4">
        <label className="block mb-2">ID Image URL</label>
        <input
          type="text"
          value={idImageUrl}
          onChange={(e) => setIdImageUrl(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Biometric Data</label>
        <textarea
          value={biometricData}
          onChange={(e) => setBiometricData(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
    </div>
  );
};

export default BiometricVerification;
