import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CommissionAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data, error } = await supabase
        .from('commission_analytics')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching commission analytics:', error);
      } else {
        setAnalytics(data);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Commission Analytics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={analytics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_commission" stroke="#8884d8" />
          <Line type="monotone" dataKey="platform_commission" stroke="#82ca9d" />
          <Line type="monotone" dataKey="agent_commission" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommissionAnalytics;
