import React, { useState, useEffect } from 'react';
import Mapbox from './Mapbox';
import { Marker } from 'react-map-gl';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FindAgent = () => {
  const [location, setLocation] = useState('');
  const [agents, setAgents] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'agent')
      .textSearch('location', location, { type: 'websearch' });

    if (error) {
      console.error('Error finding agents:', error);
    } else {
      setAgents(data);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Find a Local Agent</h2>
      <div className="flex">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                {agents.map((agent) => (
                <div key={agent.id} className="p-2 border-b">
                    <p className="font-bold">{agent.name}</p>
                    <p>{agent.location}</p>
                    {/* Add rating display and form here */}
                </div>
                ))}
            </div>
            <div className="h-96">
                <Mapbox latitude={6.5244} longitude={3.3792}>
                    {agents.map(agent => (
                        <Marker key={agent.id} longitude={agent.longitude} latitude={agent.latitude} />
                    ))}
                </Mapbox>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FindAgent;
