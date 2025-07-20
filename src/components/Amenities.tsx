import React from 'react';

const premiumFeatures = [
  'AC',
  'water heater',
  'backup power',
  'gated',
  'gym',
  'pool',
  'concierge',
  'doorman',
];

const Amenities = ({ features }) => {
  const premiumCount = features.filter((feature) =>
    premiumFeatures.includes(feature.toLowerCase())
  ).length;

  const summary = features.slice(0, 5).join(', ');

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">Amenities</h2>
      {premiumCount >= 5 && (
        <p className="text-lg font-bold text-green-500">💡 Fully Equipped</p>
      )}
      <p>{summary}</p>
    </div>
  );
};

export default Amenities;
