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
    marketCap?: number
    previousClose?: number
  }
  
  // List of major Indian stocks (NSE)
  export const INDIAN_STOCK_SYMBOLS = [
    "RELIANCE.NS",
    "TCS.NS",
    "HDFCBANK.NS",
    "INFY.NS",
    "ICICIBANK.NS",
    "HINDUNILVR.NS",
    "SBIN.NS",
    "BHARTIARTL.NS",
    "KOTAKBANK.NS",
    "LT.NS",
    "AXISBANK.NS",
    "BAJFINANCE.NS",
    "ASIANPAINT.NS",
    "MARUTI.NS",
    "TATAMOTORS.NS",
    "WIPRO.NS",
    "SUNPHARMA.NS",
    "TITAN.NS",
    "ULTRACEMCO.NS",
    "NTPC.NS",
  ]
  
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
  
  // Fetch Indian market indices (NIFTY and SENSEX)
  export async function fetchIndianIndices(): Promise<{
    nifty: number
    niftyChange: number
    niftyChangePercent: number
    sensex: number
    sensexChange: number
    sensexChangePercent: number
  }> {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      }
  
      const [niftyResponse, sensexResponse] = await Promise.all([
        fetch("https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/%5ENSEI", options),
        fetch("https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/%5EBSESN", options),
      ])
  
      const niftyData = await niftyResponse.json()
      const sensexData = await sensexResponse.json()
  
      return {
        nifty: niftyData[0]?.regularMarketPrice || 22055.18,
        niftyChange: niftyData[0]?.regularMarketChange || 92.65,
        niftyChangePercent: niftyData[0]?.regularMarketChangePercent || 0.42,
        sensex: sensexData[0]?.regularMarketPrice || 72643.31,
        sensexChange: sensexData[0]?.regularMarketChange || 276.45,
        sensexChangePercent: sensexData[0]?.regularMarketChangePercent || 0.38,
      }
    } catch (error) {
      console.error("Error fetching indices:", error)
      // Return fallback data if API fails
      return {
        nifty: 22055.18,
        niftyChange: 92.65,
        niftyChangePercent: 0.42,
        sensex: 72643.31,
        sensexChange: 276.45,
        sensexChangePercent: 0.38,
      }
    }
  }
  
  /**
   * Fetches real-time Indian stock data using Yahoo Finance API via RapidAPI
   */
  export async function fetchIndianStockData(): Promise<StockData[]> {
    try {
      // Use the RAPID_API_KEY from environment variables
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      }
  
      // Join symbols with comma for batch request
      const symbolsString = INDIAN_STOCK_SYMBOLS.join(",")
  
      // Make the API request
      const response = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbolsString}`, options)
  
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Transform the API response to our StockData format
      return data.map((quote: any) => ({
        symbol: quote.symbol.split(".")[0],
        name: quote.longName || quote.shortName || quote.symbol,
        price: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        volume: quote.regularMarketVolume || 0,
        high: quote.regularMarketDayHigh || 0,
        low: quote.regularMarketDayLow || 0,
        marketCap: quote.marketCap || 0,
        previousClose: quote.regularMarketPreviousClose || 0,
      }))
    } catch (error) {
      console.error("Error fetching stock data:", error)
  
      // If API fails, use fallback mock data for development
      if (process.env.NODE_ENV === "development") {
        console.log("Using fallback mock data")
        return getMockStockData()
      }
  
      // In production, rethrow the error to be handled by the component
      throw error
    }
  }
  
  // Fetch detailed data for a specific stock
  export async function fetchStockDetails(symbol: string): Promise<any> {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      }
  
      // Add .NS suffix for NSE stocks
      const fullSymbol = symbol.includes(".") ? symbol : `${symbol}.NS`
  
      const response = await fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${fullSymbol}`, options)
  
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }
  
      const data = await response.json()
      return data[0]
    } catch (error) {
      console.error(`Error fetching details for ${symbol}:`, error)
      throw error
    }
  }
  
  // Fallback mock data function
  function getMockStockData(): StockData[] {
    return [
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
    ]
  }
  
  