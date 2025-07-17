import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Withdrawals = ({ agentId }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      const { data, error } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('agent_id', agentId);

      if (error) {
        console.error('Error fetching withdrawals:', error);
      } else {
        setWithdrawals(data);
      }
    };

    fetchWithdrawals();
  }, [agentId]);

  const handleRequestWithdrawal = async () => {
    const { error } = await supabase.functions.invoke('request_withdrawal', {
        body: { agent_id: agentId, amount },
    })

    if (error) {
      console.error('Error requesting withdrawal:', error);
    } else {
      // Refresh withdrawals
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Withdrawals</h1>
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 mr-2"
        />
        <button onClick={handleRequestWithdrawal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Request Withdrawal
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
            <th className="text-left">Requested At</th>
            <th className="text-left">Processed At</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal.id}>
              <td>{withdrawal.id}</td>
              <td>{withdrawal.amount}</td>
              <td>{withdrawal.status}</td>
              <td>{new Date(withdrawal.created_at).toLocaleString()}</td>
              <td>{withdrawal.processed_at ? new Date(withdrawal.processed_at).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Withdrawals;
