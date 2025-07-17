import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Referrals = ({ userId }) => {
  const [referrals, setReferrals] = useState([]);
  const [inviteeEmail, setInviteeEmail] = useState('');

  useEffect(() => {
    const fetchReferrals = async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('inviter_id', userId);

      if (error) {
        console.error('Error fetching referrals:', error);
      } else {
        setReferrals(data);
      }
    };

    fetchReferrals();
  }, [userId]);

  const handleInvite = async () => {
    const { error } = await supabase.functions.invoke('manage_referral', {
        body: { inviter_id: userId, invitee_email: inviteeEmail },
    })

    if (error) {
      console.error('Error inviting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Referrals</h1>
      <div className="mb-4">
        <input
          type="email"
          value={inviteeEmail}
          onChange={(e) => setInviteeEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleInvite} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Invite
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Invitee Email</th>
            <th className="text-left">Reward Earned</th>
            <th className="text-left">Invited At</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <tr key={referral.id}>
              <td>{referral.invitee_email}</td>
              <td>{referral.reward_earned ? 'Yes' : 'No'}</td>
              <td>{new Date(referral.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Referrals;
