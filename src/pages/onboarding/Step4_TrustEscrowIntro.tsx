import React from 'react';

const Step4_TrustEscrowIntro = ({ onFinish, onBack }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trust & Escrow</h1>
      <p className="mb-4">
        Zimba uses a Trust & Escrow system to protect both buyers and sellers.
        When you book a property, your payment is held in a secure escrow account until you confirm that you are satisfied with the property.
      </p>
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
        <button onClick={onFinish} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step4_TrustEscrowIntro;
