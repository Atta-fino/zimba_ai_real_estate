import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BookingManagement = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, properties!inner(*), users!inner(*)')
        .eq('properties.owner_id', userId);

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Booking Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Property</th>
            <th className="text-left">User</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.properties.title}</td>
              <td>{booking.users.name}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
