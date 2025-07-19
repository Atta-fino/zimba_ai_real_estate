import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon'; // Assuming AppIcon can render different icons by name
import EditProfile from './components/EditProfile';
import AccountSecurity from './components/AccountSecurity';
import NotificationSettings from './components/NotificationSettings';
import LanguagePreferences from './components/LanguagePreferences'; // Import the actual component

// Placeholder components for content of each section
// These will be fleshed out in subsequent steps
// const LanguagePreferences = () => <div className="p-6 bg-card rounded-lg shadow"><h2 className="text-xl font-semibold">Language Preferences</h2><p>Content for language preferences...</p></div>; // Replaced


const UserProfilePage = () => {
  const location = useLocation();
  // Determine active tab based on path or a state if using nested routes differently
  // For simplicity, we'll use a local state and manage content display directly here.
  // Later, this can be refactored to use nested <Route> and <Outlet> more deeply if sub-routes are defined.

  const [activeTab, setActiveTab] = useState('edit-profile'); // Default tab

  const navItems = [
    { id: 'edit-profile', label: 'Edit Profile', icon: 'User', component: <EditProfile /> },
    { id: 'account-security', label: 'Account Security', icon: 'Lock', component: <AccountSecurity /> },
    { id: 'notification-settings', label: 'Notification Settings', icon: 'Bell', component: <NotificationSettings /> },
    { id: 'language-preferences', label: 'Language & Region', icon: 'Globe', component: <LanguagePreferences /> },
  ];

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || <EditProfile />;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-heading">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, security, and preferences.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4 lg:w-1/5">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-150
                    ${activeTab === item.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-muted/50 hover:text-foreground'
                    }`}
                >
                  <Icon name={item.icon} size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 md:w-3/4 lg:w-4/5">
            {ActiveComponent}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
