import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RemoteTourRequest = ({ propertyId }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleRequestTour = () => {
    // TODO: Implement remote tour request logic
    alert(`Remote tour requested for property ${propertyId} on ${startDate}`);
  };

  return (
    <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-2">Request a Remote Tour</h2>
        <div className="flex items-center space-x-4">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <button onClick={handleRequestTour} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Request Tour
            </button>
        </div>
    </div>
  );
};

export default RemoteTourRequest;
