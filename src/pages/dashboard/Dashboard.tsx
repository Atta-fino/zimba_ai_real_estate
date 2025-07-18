import React from 'react';
import CommissionsOverview from '../admin/CommissionsOverview';
import CommissionAnalytics from '../admin/CommissionAnalytics';
import Withdrawals from '../agent/Withdrawals';
import BiometricVerification from '../landlord/BiometricVerification';
import FlexPay from '../renter/FlexPay';
import Referrals from '../user/Referrals';
import LegalGuides from '../user/LegalGuides';
import CurrencyConverter from '../../components/CurrencyConverter';
import RemoteTourRequest from '../../components/RemoteTourRequest';
import DocumentUpload from '../../components/DocumentUpload';
import MortgageCalculator from '../../components/MortgageCalculator';
import FindAgent from '../../components/FindAgent';
import UserManagement from '../admin/UserManagement';
import SettingsManagement from '../admin/SettingsManagement';
import PropertyManagement from '../landlord/PropertyManagement';
import BookingManagement from '../landlord/BookingManagement';
import SavedProperties from '../renter/SavedProperties';
import BookingHistory from '../renter/BookingHistory';

const Dashboard = ({ user }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user.role === 'admin' && (
        <div className="grid grid-cols-2 gap-4">
          <CommissionsOverview />
          <CommissionAnalytics />
          <UserManagement />
          <SettingsManagement />
        </div>
      )}
      {user.role === 'landlord' && (
        <div className="grid grid-cols-2 gap-4">
          <BiometricVerification userId={user.id} />
          <PropertyManagement userId={user.id} />
          <BookingManagement userId={user.id} />
        </div>
      )}
       {user.role === 'agent' && (
        <div className="grid grid-cols-2 gap-4">
            <Withdrawals agentId={user.id} />
        </div>
      )}
      {user.role === 'renter' && (
        <div className="grid grid-cols-2 gap-4">
          <FlexPay bookingId={user.bookingId} />
          <Referrals userId={user.id} />
          <LegalGuides countryCode={user.countryCode} />
          <SavedProperties userId={user.id} />
          <BookingHistory userId={user.id} />
        </div>
      )}
      {user.role === 'diaspora' && (
        <div className="grid grid-cols-2 gap-4">
          <CurrencyConverter />
          <RemoteTourRequest />
          <DocumentUpload userId={user.id} />
          <MortgageCalculator />
          <FindAgent />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
