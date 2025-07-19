import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('GHS');
  const [result, setResult] = useState(0);

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
        const res = await fetch('https://api.frankfurter.app/currencies');
        const data = await res.json();
        setCurrencies(Object.keys(data));
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
        setResult(amount);
        return;
    }

    const convert = async () => {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      setResult(data.rates[toCurrency]);
    };

    if(fromCurrency && toCurrency && amount) {
        convert();
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Currency Converter</h2>
      <div className="flex space-x-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="border p-2">
            {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="border p-2">
            {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
      </div>
      <div className="mt-4">
        <p>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
