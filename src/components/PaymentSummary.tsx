import React from 'react';

const PaymentSummary = ({ booking, commission, diasporaFee, currency }) => {
  const basePrice = booking.properties.price;
  const total = basePrice + (commission?.amount || 0) + (diasporaFee || 0);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Payment Summary</h2>
      <div className="flex justify-between">
        <span>Base Price</span>
        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(basePrice)}</span>
      </div>
      {commission && (
        <div className="flex justify-between">
          <span>Platform Commission ({commission.rate * 100}%)</span>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(commission.amount)}</span>
        </div>
      )}
      {diasporaFee > 0 && (
        <div className="flex justify-between">
          <span>Diaspora Escrow Guarantee Fee</span>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(diasporaFee)}</span>
        </div>
      )}
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(total)}</span>
      </div>
      {diasporaFee > 0 && (
         <p className="text-sm text-gray-500 mt-2">
            Diaspora Escrow Guarantee Fee included for secure cross-border transactions.
         </p>
      )}
    </div>
  );
};

export default PaymentSummary;
