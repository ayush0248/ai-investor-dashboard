import { useState, useEffect } from "react";

const stocks = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE", "INFY.BSE", "ICICIBANK.BSE"];

export default function Portfolio() {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchStockPrices = async () => {
      const newStockData = {};
      for (let stock of stocks) {
        try {
          const response = await fetch(`/api/stocks?symbol=${stock}`);
          const data = await response.json();
          if (data && data.close) {
            newStockData[stock] = data;
          }
        } catch (error) {
          console.error(`Error fetching ${stock} data`, error);
        }
      }
      setStockData(newStockData);
    };

    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 60000); // Auto-refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-lg font-bold mb-4">Portfolio Holdings</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Stock</th>
            <th className="p-2">Price</th>
            <th className="p-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock} className="border-b">
              <td className="p-2">{stock}</td>
              <td className="p-2">
                ₹{stockData[stock]?.close ? stockData[stock].close.toFixed(2) : "Loading..."}
              </td>
              <td className="p-2">
                {stockData[stock]?.change
                  ? `${stockData[stock].change.toFixed(2)}%`
                  : "Loading..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
