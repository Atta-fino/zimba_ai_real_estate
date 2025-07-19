import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const DocumentUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${userId}/${file.name}`, file, {
        onUploadProgress: (progress) => {
          setUploadProgress((progress.loaded / progress.total) * 100);
        },
      });

    setUploading(false);

    if (error) {
      console.error('Error uploading document:', error);
    } else {
      console.log('Document uploaded successfully:', data);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Document Upload</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.png" />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" disabled={uploading}>
        {uploading ? `Uploading... ${uploadProgress.toFixed(0)}%` : 'Upload'}
      </button>
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
