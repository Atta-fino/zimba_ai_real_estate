import React from 'react';
import Icon from '../AppIcon'; // Assuming AppIcon is in src/components/

const PaymentSummary = ({
  basePrice,
  commissionRate, // e.g., 0.05 for 5%
  diasporaFeeRate = 0.02, // Default diaspora fee rate (e.g., 2%)
  isDiasporaTransaction, // boolean: true if diaspora fee applies
  currency = 'NGN', // Default currency
  transactionType = 'rent' // 'rent' or 'sale'
}) => {
  if (typeof basePrice !== 'number' || basePrice < 0) {
    // Or render an error state
    console.error("PaymentSummary: basePrice must be a non-negative number.");
    return <div className="p-4 text-red-500 bg-red-50 rounded-md">Error: Invalid base price provided.</div>;
  }
  if (typeof commissionRate !== 'number' || commissionRate < 0 || commissionRate > 1) {
     console.error("PaymentSummary: commissionRate must be a number between 0 and 1.");
    return <div className="p-4 text-red-500 bg-red-50 rounded-md">Error: Invalid commission rate provided.</div>;
  }

  const platformCommission = basePrice * commissionRate;
  let diasporaEscrowFee = 0;
  if (isDiasporaTransaction) {
    diasporaEscrowFee = basePrice * diasporaFeeRate; // Calculated on base price
  }

  const totalAmount = basePrice + platformCommission + diasporaEscrowFee;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', { // Make locale dynamic based on user/currency if needed
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2, // Standard for currency
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const commissionPercentage = (commissionRate * 100).toFixed(1); // Show one decimal for percentage
  const diasporaFeePercentage = (diasporaFeeRate * 100).toFixed(1);

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
      <h3 className="text-xl font-semibold font-heading text-foreground mb-6 pb-3 border-b border-border">
        Payment Summary
      </h3>
      <div className="space-y-3 text-sm">
        {/* Base Price */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            {transactionType === 'sale' ? 'Property Sale Price' : 'Base Rent Amount'}
          </span>
          <span className="font-medium text-foreground">{formatPrice(basePrice)}</span>
        </div>

        {/* Platform Commission */}
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            Zimba Platform Fee ({commissionPercentage}%)
          </span>
          <span className="font-medium text-foreground">{formatPrice(platformCommission)}</span>
        </div>

        {/* Diaspora Escrow Guarantee Fee (Conditional) */}
        {isDiasporaTransaction && diasporaEscrowFee > 0 && (
          <div className="flex justify-between items-center text-blue-600 dark:text-blue-400">
            <span className="flex items-center">
              <Icon name="ShieldCheck" size={16} className="mr-1.5 opacity-80" />
              Diaspora Escrow Guarantee ({diasporaFeePercentage}%)
            </span>
            <span className="font-medium">{formatPrice(diasporaEscrowFee)}</span>
          </div>
        )}
      </div>

      {/* Separator */}
      <hr className="my-4 border-border" />

      {/* Total Amount */}
      <div className="flex justify-between items-center text-lg font-bold text-foreground">
        <span>Total Amount Due</span>
        <span>{formatPrice(totalAmount)}</span>
      </div>

      {/* Diaspora Fee Notice (Conditional) */}
      {isDiasporaTransaction && (
        <p className="mt-4 text-xs text-blue-500 dark:text-blue-300 text-center bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-md flex items-start">
          <Icon name="Globe" size={20} className="mr-2 flex-shrink-0  opacity-70" />
          <span>For your peace of mind, a small Diaspora Escrow Guarantee Fee is included. This supports extra security checks and legal safeguards for your cross-border transaction.</span>
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-6 text-center">
        All transactions on Zimba are secure and transparent. Your trust is our priority!
      </p>
    </div>
  );
};

export default PaymentSummary;
