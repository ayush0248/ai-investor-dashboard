// Types for stock data
export interface StockData {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    volume: number
    high: number
    low: number
  }
  
  // Mock data for Indian stocks (for development)
  const mockStocks = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: 2934.75,
      change: 23.45,
      changePercent: 0.81,
      volume: 5234567,
      high: 2945.2,
      low: 2910.5,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd.",
      price: 3567.8,
      change: -12.35,
      changePercent: -0.35,
      volume: 1234567,
      high: 3580.1,
      low: 3550.25,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      price: 1678.45,
      change: 15.75,
      changePercent: 0.95,
      volume: 3456789,
      high: 1685.3,
      low: 1665.2,
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd.",
      price: 1456.3,
      change: -8.45,
      changePercent: -0.58,
      volume: 2345678,
      high: 1470.15,
      low: 1450.1,
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd.",
      price: 1023.55,
      change: 7.85,
      changePercent: 0.77,
      volume: 4567890,
      high: 1030.4,
      low: 1015.7,
    },
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever Ltd.",
      price: 2456.7,
      change: -18.3,
      changePercent: -0.74,
      volume: 1234567,
      high: 2475.0,
      low: 2450.25,
    },
    {
      symbol: "BAJFINANCE",
      name: "Bajaj Finance Ltd.",
      price: 6789.25,
      change: 45.6,
      changePercent: 0.68,
      volume: 987654,
      high: 6800.5,
      low: 6750.3,
    },
    {
      symbol: "SBIN",
      name: "State Bank of India",
      price: 678.9,
      change: 5.45,
      changePercent: 0.81,
      volume: 8765432,
      high: 682.3,
      low: 675.1,
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd.",
      price: 1234.55,
      change: -7.65,
      changePercent: -0.62,
      volume: 3456789,
      high: 1245.2,
      low: 1230.4,
    },
    {
      symbol: "KOTAKBANK",
      name: "Kotak Mahindra Bank Ltd.",
      price: 1876.3,
      change: 12.45,
      changePercent: 0.67,
      volume: 2345678,
      high: 1880.5,
      low: 1865.75,
    },
    {
      symbol: "ASIANPAINT",
      name: "Asian Paints Ltd.",
      price: 3245.6,
      change: -23.45,
      changePercent: -0.72,
      volume: 1234567,
      high: 3270.25,
      low: 3240.1,
    },
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd.",
      price: 10234.75,
      change: 87.65,
      changePercent: 0.86,
      volume: 876543,
      high: 10300.5,
      low: 10200.25,
    },
  ]
  
  /**
   * Fetches real-time Indian stock data
   *
   * In production, replace this with a real API call to a stock market data provider
   */
  export async function fetchIndianStockData(): Promise<StockData[]> {
    // For development/demo purposes, use mock data with random variations
    if (process.env.NODE_ENV === "development") {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))
  
      // Add some randomness to the prices to simulate real-time changes
      return mockStocks.map((stock) => {
        const changePercent = (Math.random() - 0.5) * 2 // Random change between -1% and 1%
        const change = stock.price * (changePercent / 100)
        const newPrice = Number.parseFloat((stock.price + change).toFixed(2))
  
        return {
          ...stock,
          price: newPrice,
          change: Number.parseFloat(change.toFixed(2)),
          changePercent: Number.parseFloat(changePercent.toFixed(2)),
          high: Math.max(stock.high, newPrice),
          low: Math.min(stock.low, newPrice),
        }
      })
    }
  
    // In production, use a real API
    // Here are examples of how to fetch from different APIs:
  
    // Example 1: Using NSE India API (you'll need to handle CORS)
    // const response = await fetch('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050');
    // const data = await response.json();
    // return data.data.map(item => ({
    //   symbol: item.symbol,
    //   name: item.meta.companyName || item.symbol,
    //   price: item.lastPrice,
    //   change: item.change,
    //   changePercent: item.pChange,
    //   volume: item.totalTradedVolume,
    //   high: item.dayHigh,
    //   low: item.dayLow
    // }));
  
    // Example 2: Using Alpha Vantage API
    // const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    // const symbols = ['RELIANCE.BSE', 'TCS.BSE', 'HDFCBANK.BSE']; // Add your symbols
    // const promises = symbols.map(async (symbol) => {
    //   const response = await fetch(
    //     `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    //   );
    //   const data = await response.json();
    //   const quote = data['Global Quote'];
    //   return {
    //     symbol: symbol.split('.')[0],
    //     name: symbol.split('.')[0], // You might want to map these to full names
    //     price: parseFloat(quote['05. price']),
    //     change: parseFloat(quote['09. change']),
    //     changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    //     volume: parseInt(quote['06. volume']),
    //     high: 0, // Not available in this API call
    //     low: 0, // Not available in this API call
    //   };
    // });
    // return Promise.all(promises);
  
    // Example 3: Using Yahoo Finance API via RapidAPI
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
    //     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
    //   }
    // };
    //
    // const symbols = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS']; // Add your symbols
    // const promises = symbols.map(async (symbol) => {
    //   const response = await fetch(
    //     `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
    //     options
    //   );
    //   const data = await response.json();
    //   const quote = data[0];
    //   return {
    //     symbol: symbol.split('.')[0],
    //     name: quote.longName || symbol,
    //     price: quote.regularMarketPrice,
    //     change: quote.regularMarketChange,
    //     changePercent: quote.regularMarketChangePercent,
    //     volume: quote.regularMarketVolume,
    //     high: quote.regularMarketDayHigh,
    //     low: quote.regularMarketDayLow
    //   };
    // });
    // return Promise.all(promises);
  
    // Fallback to mock data if no API is configured
    return mockStocks
  }
  
  