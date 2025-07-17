import React from 'react';

const RemoteTourRequest = ({ propertyId }) => {
  const handleRequestTour = () => {
    // TODO: Implement remote tour request logic
    alert(`Remote tour requested for property ${propertyId}`);
  };

  return (
    <button onClick={handleRequestTour} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Request Remote Tour
    </button>
  );
};

export default RemoteTourRequest;
