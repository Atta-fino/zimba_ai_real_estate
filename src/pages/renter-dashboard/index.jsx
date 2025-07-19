import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button'; // For any CTAs in placeholders
import MyBookings from './components/MyBookings';
import SavedProperties from './components/SavedProperties';
import FlexPay from './components/FlexPay';
import LegalGuides from './components/LegalGuides';
import RenterTrustScore from './components/RenterTrustScore';
import DocumentUpload from './components/DocumentUpload'; // Import the new component
import { useDiaspora } from '../../context/DiasporaContext'; // Import diaspora hook

// Placeholder components for Renter Dashboard sections


const RenterDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('my-bookings'); // Default tab
  const { isDiasporaUser } = useDiaspora(); // Use the diaspora hook

  // Mock user for context, e.g., for Legal Guides
  const mockUser = { name: "Amina Diallo", country: "KE" }; // Example: User in Kenya

  const navItems = [
    { id: 'my-bookings', label: 'My Bookings', icon: 'CalendarHeart', component: <MyBookings /> },
    { id: 'saved-properties', label: 'Saved Properties', icon: 'Heart', component: <SavedProperties /> },
    { id: 'flex-pay', label: 'FlexPay', icon: 'CreditCard', component: <FlexPay /> },
    // Conditionally add the 'My Documents' tab for diaspora users
    ...(isDiasporaUser ? [{ id: 'my-documents', label: 'My Documents', icon: 'FileText', component: <DocumentUpload /> }] : []),
    { id: 'trust-score', label: 'My TrustScore', icon: 'ShieldCheck', component: <RenterTrustScore /> },
    { id: 'legal-guides', label: 'Legal Guides', icon: 'ScrollText', component: <LegalGuides userCountryCode={mockUser.country} /> },
  ];

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || <MyBookings />;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-heading">Welcome, {mockUser.name}!</h1>
          <p className="text-muted-foreground text-lg">Here's your personal dashboard to manage your Zimba journey.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 xl:w-1/5">
            <nav className="space-y-2 sticky top-24">
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
            {/* Placeholder for AI Smart Suggest - could be a dismissible banner or a small section */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                <div className="flex items-start">
                    <Icon name="Sparkles" size={20} className="mr-2 text-blue-500 flex-shrink-0"/>
                    <div>
                        <h4 className="font-semibold mb-0.5">Zimba Smart Suggestions (Coming Soon!)</h4>
                        <p>Get personalized property recommendations based on your activity and preferences. Your next dream home might be just a click away!</p>
                    </div>
                </div>
            </div>
            {ActiveComponent}
          </main>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboardPage;
