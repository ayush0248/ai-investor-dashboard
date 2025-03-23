"use client";
import { useEffect, useState } from "react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export function MarketOverview() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) throw new Error("Failed to fetch stock data");

        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold">Market Overview</h2>
      <p className="text-gray-400">Real-time stock market data</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {stocks.map((stock) => (
            <li key={stock.symbol} className="flex justify-between border-b border-gray-800 py-2">
              <span className="font-medium">{stock.symbol}</span>
              <span className={stock.change >= 0 ? "text-green-400" : "text-red-400"}>
                ₹{stock.price.toFixed(2)} ({stock.change.toFixed(2)}%)
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
