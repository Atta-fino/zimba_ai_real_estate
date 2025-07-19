import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button'; // Assuming Button might be used for CTAs

const Earnings = () => {
  // Mock data for placeholder display
  const mockSummary = {
    totalEarned: 1250000,
    lastPayout: 300000,
    pendingClearance: 150000,
    currency: 'NGN',
    lastPayoutDate: '2024-07-15',
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });


  return (
    <div className="p-1 md:p-0">
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 px-1 md:px-0">Earnings & Payouts</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-card rounded-lg shadow">
          <div className="flex items-center text-muted-foreground mb-1">
            <Icon name="TrendingUp" size={18} className="mr-2" />
            <h3 className="text-sm font-medium">Total Earned (All Time)</h3>
          </div>
          <p className="text-3xl font-bold text-primary">{formatPrice(mockSummary.totalEarned, mockSummary.currency)}</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <div className="flex items-center text-muted-foreground mb-1">
             <Icon name="Wallet" size={18} className="mr-2" />
            <h3 className="text-sm font-medium">Pending Clearance</h3>
          </div>
          <p className="text-3xl font-bold">{formatPrice(mockSummary.pendingClearance, mockSummary.currency)}</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
           <div className="flex items-center text-muted-foreground mb-1">
             <Icon name="Banknote" size={18} className="mr-2" />
            <h3 className="text-sm font-medium">Last Payout</h3>
          </div>
          <p className="text-3xl font-bold">{formatPrice(mockSummary.lastPayout, mockSummary.currency)}</p>
          <p className="text-xs text-muted-foreground mt-1">On {formatDate(mockSummary.lastPayoutDate)}</p>
        </div>
      </div>

      {/* Placeholder for Detailed Reports and Payout Settings */}
      <div className="space-y-8">
        <div className="p-8 bg-card rounded-lg shadow text-center">
          <Icon name="Construction" size={48} className="mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Detailed Earnings Reports Coming Soon!</h3>
          <p className="text-muted-foreground mb-4">
            We're working on providing you with comprehensive reports, including transaction history, monthly breakdowns, and downloadable statements.
          </p>
        </div>

        <div className="p-8 bg-card rounded-lg shadow text-center">
          <Icon name="Landmark" size={48} className="mx-auto text-accent mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Payout Settings & History</h3>
          <p className="text-muted-foreground mb-4">
            Manage your bank details for payouts and view your payout history here once the feature is live.
          </p>
          <Button variant="outline" disabled>
            <Icon name="Settings2" size={16} className="mr-2"/>
            Configure Payout Methods (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
