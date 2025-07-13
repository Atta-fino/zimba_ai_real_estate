import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import CommissionsOverview from './panels/CommissionsOverview';
import VerificationQueue from './panels/VerificationQueue';
import FlagQueue from './panels/FlagQueue'; // Import the actual component

// Placeholder components for other admin panels (will be replaced)
// const FlagQueuePanel = () => <div className="p-6 bg-card rounded-lg shadow-lg"><h2 className="text-xl font-semibold">Flag Queue</h2><p>Reported content and users will be listed here for review.</p></div>; // Replaced
// Add more placeholders as needed: Users, Properties, Settings etc.


const AdminDashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL or default to 'commissions'
  // Example: /admin/commissions, /admin/verification
  const getCurrentTab = () => {
    const pathParts = location.pathname.split('/');
    return pathParts[2] || 'commissions'; // Default to 'commissions' if no sub-path
  }
  const [activeTab, setActiveTab] = useState(getCurrentTab());

  React.useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);


  const handleNavClick = (tabId, path) => {
    setActiveTab(tabId);
    navigate(path);
  }

  const navItems = [
    // Order can be adjusted based on importance/workflow
    { id: 'verification-queue', path: '/admin/verification', label: 'Verification Queue', icon: 'UserCheck', component: <VerificationQueue /> },
    { id: 'flag-queue', path: '/admin/flags', label: 'Flag Queue', icon: 'Flag', component: <FlagQueue /> },
    { id: 'commissions', path: '/admin/commissions', label: 'Commissions', icon: 'Percent', component: <CommissionsOverview /> },
    // { id: 'users', path: '/admin/users', label: 'User Management', icon: 'Users', component: <UserManagementPanel /> },
    // { id: 'properties', path: '/admin/properties', label: 'Property Management', icon: 'Home', component: <PropertyManagementPanel /> },
    // { id: 'settings', path: '/admin/settings', label: 'App Settings', icon: 'Settings', component: <AppSettingsPanel /> },
  ];

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || <CommissionsOverview />;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-card dark:bg-gray-800 p-4 space-y-2 shadow-lg h-screen sticky top-0">
          <div className="text-center py-4 mb-4 border-b border-border dark:border-gray-700">
            <Link to="/admin" className="flex items-center justify-center space-x-2">
                <Icon name="ShieldCheck" size={32} className="text-primary" />
                <h1 className="text-xl font-bold text-primary">Zimba Admin</h1>
            </Link>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.path)}
              className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors duration-150
                ${activeTab === item.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted/50 dark:hover:bg-gray-700 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-100'
                }`}
            >
              <Icon name={item.icon} size={18} className="mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-border dark:border-gray-700">
             <Link to="/" className="w-full flex items-center px-3 py-2.5 rounded-md text-sm text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-700 hover:text-foreground dark:hover:text-gray-100">
                <Icon name="LogOut" size={18} className="mr-3"/> Go to Main Site
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Here we can use Outlet if we define child routes for each panel */}
          {/* For now, rendering ActiveComponent directly based on state */}
          {ActiveComponent}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
