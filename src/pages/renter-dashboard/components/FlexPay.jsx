import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

// Mock data for an example FlexPay plan
const mockFlexPayPlan = {
  propertyId: 'propFlex1',
  propertyName: 'Modern 2-Bedroom Flat, Ikeja',
  propertyImage: '/assets/images/stock/apartment_2_a.jpg', // Example image
  totalRent: 1200000,
  currency: 'NGN',
  upfrontPayment: 300000, // e.g., 3 months of 100k/month if total rent implies 100k/month for 12 months. Let's adjust.
  // If totalRent is annual, and FlexPay is 3 months upfront, then monthly is 100k.
  // For this example, let's say monthly rent is 100k. So 3 months upfront = 300k.
  // Then 9 more monthly payments.
  monthlyInstallment: 100000,
  installmentsPaid: 2, // Out of 9 remaining
  totalInstallments: 9, // after upfront
  nextPaymentDate: '2024-09-01',
  isActive: true,
};


const FlexPay = () => {
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0, // Clean display for larger sums
    }).format(price);
  };
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Calculate progress for the progress bar
  const progressPercentage = mockFlexPayPlan.isActive ? (mockFlexPayPlan.installmentsPaid / mockFlexPayPlan.totalInstallments) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-heading text-foreground">FlexPay Management</h2>
      </div>

      {/* Introduction to FlexPay */}
      <div className="p-6 bg-card rounded-xl shadow-lg mb-8 border border-primary/30">
        <div className="flex items-start">
          <Icon name="CalendarClock" size={32} className="mr-4 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">Pay Your Rent Conveniently with FlexPay!</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Zimba's FlexPay allows you to split your rent into manageable installments after an initial upfront payment. Look for properties with the 'FlexPay Enabled' option.
            </p>
            <p className="text-xs text-muted-foreground">
              Landlords can choose to enable FlexPay on their listings. If enabled, you typically pay 3 months upfront, then the rest in monthly installments.
            </p>
          </div>
        </div>
      </div>

      {/* Mock FlexPay Plan Display (if user has one) */}
      {mockFlexPayPlan.isActive ? (
        <div className="p-6 bg-card rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-1">Your Active FlexPay Plan:</h3>
          <Link to={`/property-detail-view/${mockFlexPayPlan.propertyId}`} className="hover:underline">
            <p className="text-md text-primary mb-4">{mockFlexPayPlan.propertyName}</p>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4 text-sm">
            <div>
                <p className="text-muted-foreground">Total Annual Rent:</p>
                <p className="font-semibold text-foreground">{formatPrice(mockFlexPayPlan.totalRent, mockFlexPayPlan.currency)}</p>
            </div>
             <div>
                <p className="text-muted-foreground">Upfront Payment Made:</p>
                <p className="font-semibold text-foreground">{formatPrice(mockFlexPayPlan.upfrontPayment, mockFlexPayPlan.currency)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Monthly Installment:</p>
              <p className="font-semibold text-foreground">{formatPrice(mockFlexPayPlan.monthlyInstallment, mockFlexPayPlan.currency)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Next Payment Due:</p>
              <p className="font-semibold text-red-500">{formatDate(mockFlexPayPlan.nextPaymentDate)}</p>
            </div>
          </div>

          {/* Progress Bar for Installments */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Installments Paid: {mockFlexPayPlan.installmentsPaid} of {mockFlexPayPlan.totalInstallments}</span>
              <span>{progressPercentage.toFixed(0)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button size="lg" className="flex-1">
              <Icon name="CreditCard" className="mr-2" /> Make Next Payment
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Icon name="History" className="mr-2" /> View Payment History
            </Button>
          </div>
           <p className="text-xs text-muted-foreground mt-4 text-center">
            On-time payments are rewarded and contribute positively to your TrustScore! Late payments may incur penalties.
          </p>
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Active FlexPay Plans</h3>
          <p className="text-muted-foreground">You currently do not have any active FlexPay installment plans.</p>
           <p className="text-xs text-muted-foreground mt-2">Look for the FlexPay badge on property listings!</p>
        </div>
      )}
    </div>
  );
};

export default FlexPay;
