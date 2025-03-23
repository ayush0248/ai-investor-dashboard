import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export default async function handler(req, res) {
  try {
    const symbols = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"];
    
    const stockData = await Promise.all(
      symbols.map(async (symbol) => {
        const result = await yahooFinance.quote(symbol);
        return {
          symbol: result.symbol,
          price: result.regularMarketPrice,
          change: result.regularMarketChangePercent
        };
      })
    );

    res.status(200).json(stockData);
  } catch (error) {
    console.error("Stock API Error:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
