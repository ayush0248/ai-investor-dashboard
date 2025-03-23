"use client"

import { useEffect, useState } from "react"

const StockMarket = () => {
  interface Stock {
    symbol: string
    close: number
    change: number
    percent_change: number
  }

  const [stocks, setStocks] = useState<Record<string, Stock>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/stocks")
        const data = await response.json()
        setStocks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching stock data:", error)
        setLoading(false)
      }
    }

    fetchStocks()
    const interval = setInterval(fetchStocks, 10000) // Refresh every 10s

    return () => clearInterval(interval) // Cleanup
  }, [])

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Stock Market</h2>
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-2 text-left">Symbol</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Change</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stocks).map((symbol) => {
              const stock = stocks[symbol]
              return (
                <tr key={symbol} className="border-t border-gray-700">
                  <td className="p-2">{stock.symbol}</td>
                  <td className="p-2 text-right">₹{stock.close}</td>
                  <td className={`p-2 text-right ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {stock.change} ({stock.percent_change}%)
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StockMarket
