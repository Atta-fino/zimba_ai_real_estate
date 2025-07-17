import React from 'react';

const Step3_Role = ({ onNext, onBack }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">What is your role?</h1>
      <div className="mb-4">
        <select className="border p-2 w-full">
          <option value="buyer">Buyer</option>
          <option value="renter">Renter</option>
          <option value="landlord">Landlord</option>
          <option value="diaspora">Diaspora</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
        <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Role;
