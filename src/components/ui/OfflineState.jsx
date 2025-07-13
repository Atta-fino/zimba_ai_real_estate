import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const OfflineState = ({ onRetry }) => {
  return (
    <div className="text-center py-12 px-6 bg-amber-50 border border-amber-200 rounded-lg shadow-md">
      <Icon name="WifiOff" size={48} className="mx-auto text-amber-500 mb-4" />
      <h3 className="text-xl font-semibold text-amber-800 mb-2">You appear to be offline.</h3>
      <p className="text-amber-700 mb-6">
        We're having trouble connecting to the internet. Please check your connection. You might be seeing a limited or cached version of this page.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Try to Reconnect
        </Button>
      )}
    </div>
  );
};

export default OfflineState;
