import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">User Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
