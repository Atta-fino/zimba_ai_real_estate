import React from 'react';

const Step2_CountryLanguage = ({ onNext, onBack }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select your country and language</h1>
      <div className="mb-4">
        <label className="block mb-2">Country</label>
        <select className="border p-2 w-full">
          {/* Add country options here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Language</label>
        <select className="border p-2 w-full">
          {/* Add language options here */}
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

export default Step2_CountryLanguage;
