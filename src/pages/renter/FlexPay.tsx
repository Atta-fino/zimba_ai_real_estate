import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FlexPay = ({ bookingId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('flexpay_plans')
        .select('*')
        .eq('booking_id', bookingId);

      if (error) {
        console.error('Error fetching FlexPay plans:', error);
      } else {
        setPlans(data);
      }
    };

    fetchPlans();
  }, [bookingId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FlexPay</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Due Date</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.due_date}</td>
              <td>{plan.amount}</td>
              <td>{plan.paid ? 'Paid' : 'Unpaid'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlexPay;
