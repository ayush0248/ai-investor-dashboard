"use client";
import Link from 'next/link';

export default function TaxDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tax Management Dashboard</h1>
      <p className="mb-4">Welcome to your tax management section. Choose an option below:</p>
      
      <div className="space-y-4">
        {/* Link to Tax Calculator */}
        <Link href="/dashboard/tax/taxcalculator" className="block bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition">
          🧮 Calculate Your Taxes
        </Link>

        {/* Link to Tax Summary */}
        <Link href="/dashboard/tax/taxsummary" className="block bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600 transition">
          📊 View Tax Summary
        </Link>
      </div>
    </div>
  );
}
