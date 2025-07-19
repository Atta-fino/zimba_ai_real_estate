import React from 'react';

const Step1_EmailPassword = ({ onNext }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create your account</h1>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input type="email" className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input type="password" className="border p-2 w-full" />
      </div>
      <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
};

export default Step1_EmailPassword;
