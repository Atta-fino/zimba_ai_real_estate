import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';

const LanguageContext = React.createContext({ language: 'en' });

const ProfilePage = () => {
  const { language } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // In a real app, you would fetch the user's profile and transactions from your backend
        // For now, we'll use mock data
        setUser({ username: 'testuser' });
        setTransactions([
          { id: 'txn_123', property: 'Modern 2-Bedroom Apartment', status: 'completed', amount: 900000 },
          { id: 'txn_456', property: 'Luxury Self-Contain Studio', status: 'payment_confirmed', amount: 500000 },
        ]);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const t = {
    en: {
      title: "My Profile",
      logout: "Logout",
      transactions: "My Transactions",
      property: "Property",
      status: "Status",
      amount: "Amount",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please <Link to="/login" className="text-primary hover:underline">log in</Link> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <main className="pt-16 md:pt-24 pb-20 md:pb-8">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-heading">{t.en.title}</h1>
            <Button variant="outline" onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}>
              <Icon name="LogOut" size={16} className="mr-2" />
              {t.en.logout}
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4">{t.en.transactions}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2">{t.en.property}</th>
                    <th className="p-2">{t.en.status}</th>
                    <th className="p-2">{t.en.amount}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id} className="border-b border-border">
                      <td className="p-2">{tx.property}</td>
                      <td className="p-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                          {tx.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(tx.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
