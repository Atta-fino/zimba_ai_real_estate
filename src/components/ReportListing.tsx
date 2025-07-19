import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ReportListing = ({ propertyId, userId }) => {
  const handleReport = async () => {
    const { error } = await supabase
      .from('flags')
      .insert({
        type: 'listing',
        reason: 'User reported this listing as suspicious',
        submitted_by: userId,
        property_id: propertyId
      });

    if (error) {
      console.error('Error reporting listing:', error);
    } else {
      alert('Listing reported successfully');
    }
  };

  return (
    <button onClick={handleReport} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Report Listing
    </button>
  );
};

export default ReportListing;
