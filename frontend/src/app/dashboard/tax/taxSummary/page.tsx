'use client';
import React, { useEffect, useState } from 'react';

export default function TaxSummary() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch('/api/tax/summary');
      const data = await response.json();
      setSummary(data);
    };

    fetchSummary();
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tax Summary</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p>📊 <strong>Capital Gains Tax:</strong> ₹{summary.capitalGainsTax.toFixed(2)}</p>
        <p>📈 <strong>Dividend Tax:</strong> ₹{summary.dividendTax.toFixed(2)}</p>
        <p>💰 <strong>Total Tax Liability:</strong> ₹{summary.totalTax.toFixed(2)}</p>
      </div>
    </div>
  );
}
