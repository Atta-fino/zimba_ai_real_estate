import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const countryFlags = {
  GH: '🇬🇭',
};

const LegalGuides = ({ countryCode }) => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const { data, error } = await supabase
        .from('legal_guides')
        .select('*')
        .eq('country_code', countryCode);

      if (error) {
        console.error('Error fetching legal guides:', error);
      } else {
        setGuides(data);
      }
    };

    fetchGuides();
  }, [countryCode]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Legal Guides</h1>
      <div>
        {guides.map((guide) => (
          <div key={guide.id} className="mb-4 p-4 border rounded-lg">
            <h2 className="text-xl font-bold">
              {countryFlags[guide.country_code]} {guide.title}
            </h2>
            <ul>
              {guide.content.split('\\n').map((line, index) => (
                <li key={index} className="ml-4 list-disc">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalGuides;
