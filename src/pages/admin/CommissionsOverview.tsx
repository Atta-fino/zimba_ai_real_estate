import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CommissionsOverview = () => {
  const [commissions, setCommissions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    type: '',
    city: '',
    property: '',
    agent: '',
  });

  useEffect(() => {
    const fetchCommissions = async () => {
      let query = supabase.from('commissions').select(`
        *,
        bookings:booking_id (
          properties:property_id (
            title,
            location
          )
        ),
        agents:agent_id (
          name
        )
      `);

      if (filters.dateRange.start) {
        query = query.gte('created_at', filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        query = query.lte('created_at', filters.dateRange.end);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      // Add other filters here

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching commissions:', error);
      } else {
        setCommissions(data);
      }
    };

    fetchCommissions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const exportToCsv = () => {
    const headers = ['ID', 'Booking ID', 'Amount', 'Type', 'Agent', 'Timestamp'];
    const rows = commissions.map(c => [c.id, c.booking_id, c.amount, c.type, c.agents?.name, c.created_at].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commissions.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Commissions Overview</h1>
      {/* Add filter inputs here */}
      <button onClick={exportToCsv} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Export to CSV
      </button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Booking ID</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Type</th>
            <th className="text-left">Agent</th>
            <th className="text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr key={commission.id}>
              <td>{commission.id}</td>
              <td>{commission.booking_id}</td>
              <td>{commission.amount}</td>
              <td>{commission.type}</td>
              <td>{commission.agents?.name || 'N/A'}</td>
              <td>{new Date(commission.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionsOverview;
