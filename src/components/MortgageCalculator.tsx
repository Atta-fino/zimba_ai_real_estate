import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [amortization, setAmortization] = useState([]);

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    setMonthlyPayment(payment);

    let balance = principal;
    const newAmortization = [];
    for (let i = 0; i < numberOfPayments; i++) {
        const interest = balance * monthlyInterestRate;
        const principalPaid = payment - interest;
        balance -= principalPaid;
        newAmortization.push({
            month: i + 1,
            interest,
            principal: principalPaid,
            balance
        });
    }
    setAmortization(newAmortization);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Mortgage Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2">Principal</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(parseFloat(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Loan Term (years)</label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={calculateMonthlyPayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Calculate
      </button>
      {monthlyPayment > 0 && (
        <div className="mt-4">
          <p>Monthly Payment: {monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      {amortization.length > 0 && (
        <div className="mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={amortization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
