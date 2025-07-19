import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Assuming Outlet might be used later for nested routes
import Icon from '../../components/AppIcon';

// Placeholder components for dashboard sections
const DashboardOverview = () => (
  <div className="p-6 bg-card rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-muted rounded-md">
        <h3 className="text-lg font-medium">Total Listings</h3>
        <p className="text-3xl font-bold">5 <span className="text-sm font-normal text-muted-foreground">Properties</span></p>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <h3 className="text-lg font-medium">Active Bookings</h3>
        <p className="text-3xl font-bold">2 <span className="text-sm font-normal text-muted-foreground">Incoming</span></p>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <h3 className="text-lg font-medium">Monthly Earnings (Mock)</h3>
        <p className="text-3xl font-bold">₦150,000</p>
      </div>
    </div>
  </div>
);
// Import MyPropertiesSection from its actual file
import MyProperties from './components/MyProperties';
import LandlordBookings from './components/LandlordBookings';
import Earnings from './components/Earnings';
import Monetization from './components/Monetization';
import LandlordTrustScore from './components/LandlordTrustScore';
import LandlordVerification from './components/LandlordVerification';
import CommissionTracker from './components/CommissionTracker'; // Import the new component

// Import Button for the placeholder (if still needed by other placeholders)
import Button from '../../components/ui/Button';


const LandlordDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Default tab

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard', component: <DashboardOverview /> },
    { id: 'my-properties', label: 'My Properties', icon: 'Home', component: <MyProperties
        onViewPropertyBookings={(id) => console.log('Show bookings for property ID:', id)}
      />
    },
    { id: 'verification', label: 'Verification', icon: 'BadgeCheck', component: <LandlordVerification /> },
    { id: 'bookings', label: 'Bookings', icon: 'CalendarCheck', component: <LandlordBookings /> },
    { id: 'earnings', label: 'Earnings', icon: 'Banknote', component: <Earnings /> },
    { id: 'commissions', label: 'Commissions', icon: 'Percent', component: <CommissionTracker /> },
    { id: 'monetization', label: 'Monetization', icon: 'Rocket', component: <Monetization /> },
    { id: 'trust-score', label: 'My TrustScore', icon: 'ShieldCheck', component: <LandlordTrustScore /> },
  ];

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || <DashboardOverview />;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-heading">Landlord Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back, manage your properties and earnings efficiently.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 xl:w-1/5">
            <nav className="space-y-2 sticky top-24"> {/* Sticky sidebar for longer content pages */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-150 ease-in-out
                    transform hover:scale-[1.02] hover:shadow-lg
                    ${activeTab === item.id
                      ? 'bg-primary text-primary-foreground shadow-xl scale-[1.03]'
                      : 'bg-card hover:bg-muted/60'
                    }`}
                >
                  <Icon name={item.icon} size={20} className="mr-3 flex-shrink-0" />
                  <span className="font-medium truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 lg:w-3/4 xl:w-4/5">
            {ActiveComponent}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboardPage;
