import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Input from './Input';

const CurrencyConverter = ({
  localCurrency = 'NGN',
  foreignCurrency = 'USD',
  initialLocalAmount = 150000,
  mockRate = 1500 // 1 Foreign Currency = X Local Currency
}) => {
  const [localAmount, setLocalAmount] = useState(initialLocalAmount.toString());
  const [foreignAmount, setForeignAmount] = useState((initialLocalAmount / mockRate).toFixed(2));

  const handleLocalChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/,/g, ''); // Remove commas before parsing
    setLocalAmount(numericValue);
    if (numericValue && !isNaN(numericValue)) {
      setForeignAmount((parseFloat(numericValue) / mockRate).toFixed(2));
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (e) => {
    const value = e.target.value;
    setForeignAmount(value);
    if (value && !isNaN(value)) {
      setLocalAmount((parseFloat(value) * mockRate).toFixed(2));
    } else {
      setLocalAmount('');
    }
  };

  const formatLocalPrice = (amount) => {
      if (isNaN(amount) || amount === '') return '';
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-6 bg-card rounded-xl shadow-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="ArrowRightLeft" size={18} className="mr-2 text-primary" />
        Quick Currency Converter
      </h3>
      <div className="space-y-4">
        {/* Local Currency Input */}
        <div>
          <label htmlFor="localCurrency" className="block text-sm font-medium text-muted-foreground mb-1">{localCurrency} (Local)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground text-sm">{localCurrency}</span>
            <Input
              id="localCurrency"
              type="text" // Use text to allow for formatting
              value={formatLocalPrice(localAmount)}
              onChange={handleLocalChange}
              placeholder="0"
              className="pl-12 text-right"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Foreign Currency Input */}
        <div>
          <label htmlFor="foreignCurrency" className="block text-sm font-medium text-muted-foreground mb-1">{foreignCurrency} (Foreign)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground text-sm">{foreignCurrency}</span>
            <Input
              id="foreignCurrency"
              type="number"
              value={foreignAmount}
              onChange={handleForeignChange}
              placeholder="0.00"
              className="pl-12 text-right"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        *Disclaimer: Rate is for estimation purposes only. Current rate: 1 {foreignCurrency} ≈ {mockRate} {localCurrency}.
      </p>
    </div>
  );
};

export default CurrencyConverter;
