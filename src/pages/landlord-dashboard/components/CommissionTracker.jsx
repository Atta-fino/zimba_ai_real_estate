import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom'; // For linking to booking/property if needed

// Mock data for commissions (aligns with new schema)
const mockCommissions = [
  {
    id: 'comm1',
    agent_id: null, // Platform commission
    booking_id: 'booking1', // From LandlordBookings mock
    property_name: 'Spacious 3-Bedroom Apartment in Lekki', // Denormalized for display
    amount: 250000, // 5% of 5,000,000
    type: 'rent',
    currency_code: 'NGN',
    timestamp: '2024-07-16T10:30:00Z',
  },
  {
    id: 'comm2',
    agent_id: 'agent_user_123', // Example agent commission
    booking_id: 'booking_agent_abc',
    property_name: 'Luxury Villa Sale in Banana Island',
    amount: 1500000, // 3% of 50,000,000 (example sale)
    type: 'sale',
    currency_code: 'NGN',
    timestamp: '2024-06-20T15:00:00Z',
  },
  {
    id: 'comm3',
    agent_id: null,
    booking_id: 'booking3', // From LandlordBookings mock (office space)
    property_name: 'Modern Office Space in Ikeja',
    amount: 125000, // 5% of 2,500,000
    type: 'rent',
    currency_code: 'NGN',
    timestamp: '2024-06-11T09:00:00Z',
  },
];


const CommissionTracker = () => {
  const [commissions, setCommissions] = useState(mockCommissions);
  // TODO: Add state for filters (date range, type)

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 2, // Show cents for commission amounts
    }).format(price);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const totalPlatformCommissions = commissions
    .filter(c => c.agent_id === null)
    .reduce((sum, c) => sum + c.amount, 0);

  const totalAgentCommissions = commissions
    .filter(c => c.agent_id !== null)
    .reduce((sum, c) => sum + c.amount, 0);


  return (
    <div className="p-1 md:p-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 px-1 md:px-0 gap-4">
        <div>
            <h2 className="text-2xl font-semibold font-heading text-foreground">Commissions Overview</h2>
            <p className="text-sm text-muted-foreground">Track earnings from platform fees and agent activities.</p>
        </div>
        {/* Placeholder for Date Range Filter */}
        {/* <Button variant="outline"><Icon name="Calendar" className="mr-2"/>Date Range</Button> */}
      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-card rounded-xl shadow-lg">
          <div className="flex items-center text-muted-foreground mb-2">
            <Icon name="Building" size={20} className="mr-2 text-primary" />
            <h3 className="text-md font-semibold">Platform Earnings (All Time)</h3>
          </div>
          <p className="text-3xl font-bold text-primary">{formatPrice(totalPlatformCommissions, 'NGN')}</p>
          <p className="text-xs text-muted-foreground mt-1">From rent & sale transaction fees.</p>
        </div>
        <div className="p-6 bg-card rounded-xl shadow-lg">
          <div className="flex items-center text-muted-foreground mb-2">
            <Icon name="Users" size={20} className="mr-2 text-accent" />
            <h3 className="text-md font-semibold">Agent Commissions (All Time)</h3>
          </div>
          <p className="text-3xl font-bold text-accent">{formatPrice(totalAgentCommissions, 'NGN')}</p>
          <p className="text-xs text-muted-foreground mt-1">Paid out or pending for registered agents.</p>
        </div>
      </div>

      {/* Commission List Table */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Recent Commission Records</h3>
            {/* Placeholder for Type Filter */}
            {/* <Select size="sm"><option>All Types</option><option>Rent</option><option>Sale</option></Select> */}
        </div>
        {commissions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-50"/>
            No commission records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Property / Booking ID</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Type</th>
                  <th className="p-3 text-right font-semibold text-muted-foreground">Amount</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map(comm => (
                  <tr key={comm.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{formatDate(comm.timestamp)}</td>
                    <td className="p-3">
                        <p className="font-medium text-foreground truncate max-w-xs" title={comm.property_name}>{comm.property_name}</p>
                        <p className="text-xs text-muted-foreground">Booking: {comm.booking_id}</p>
                    </td>
                    <td className="p-3 capitalize">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${comm.type === 'rent' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {comm.type}
                        </span>
                    </td>
                    <td className="p-3 text-right font-semibold text-foreground whitespace-nowrap">{formatPrice(comm.amount, comm.currency_code)}</td>
                    <td className="p-3 text-muted-foreground">
                      {comm.agent_id ? `Agent: ${comm.agent_id.substring(0,8)}...` : 'Platform Fee'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-4 border-t border-border text-center">
            <Button variant="ghost" size="sm" disabled>Load More (Coming Soon)</Button>
        </div>
      </div>

       {/* Referral Program Info (from previous placeholder) */}
       <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <Icon name="Gift" size={32} className="mx-auto text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-blue-700">Zimba Referral Program</h3>
          <p className="text-sm text-blue-600 mt-1 mb-3">
            Invite friends to Zimba and earn rewards! For each successful referral, you'll receive a ₵5 (or equivalent) boost for your listings or other benefits.
          </p>
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700" disabled>
            <Icon name="Send" size={16} className="mr-2" />
            Invite Friends (Coming Soon)
          </Button>
        </div>
    </div>
  );
};

export default CommissionTracker;
