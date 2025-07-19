import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SavedProperties = ({ userId }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*, favorites!inner(*)')
        .eq('favorites.user_id', userId);

      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data);
      }
    };

    fetchProperties();
  }, [userId]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Saved Properties</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Location</th>
            <th className="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedProperties;
