import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user.role === 'admin' && (
        <div>
          {/* Admin widgets go here */}
        </div>
      )}
      {user.role === 'landlord' && (
        <div>
          {/* Landlord widgets go here */}
        </div>
      )}
      {user.role === 'renter' && (
        <div>
          {/* Renter widgets go here */}
        </div>
      )}
      {user.role === 'diaspora' && (
        <div>
          {/* Diaspora widgets go here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
