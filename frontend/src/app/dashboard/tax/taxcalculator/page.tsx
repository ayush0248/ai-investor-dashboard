'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function TaxCalculator() {
  const router = useRouter();
  const [investment, setInvestment] = useState('');
  const [capitalGains, setCapitalGains] = useState('');
  const [dividends, setDividends] = useState('');

  const handleCalculate = async () => {
    const response = await fetch('/api/tax/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ investment, capitalGains, dividends }),
    });

    if (response.ok) {
      router.push('/dashboard/tax/taxsummary'); // Navigate to Summary
    } else {
      alert('Error calculating tax');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tax Calculator</h1>
      <div className="space-y-4">
        <Input
          placeholder="Investment Amount (₹)"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
        <Input
          placeholder="Capital Gains (₹)"
          value={capitalGains}
          onChange={(e) => setCapitalGains(e.target.value)}
        />
        <Input
          placeholder="Dividends Received (₹)"
          value={dividends}
          onChange={(e) => setDividends(e.target.value)}
        />
        <Button onClick={handleCalculate}>Calculate Tax</Button>
      </div>
    </div>
  );
}
