"use client";

import { useState, useEffect } from "react";

// Types
interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  fromName: string;
  toName: string;
}

export default function CryptoExchangeRateClient() {
  // State
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("BTC");
  const [toCurrency, setToCurrency] = useState<string>("ETH");
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  // List of supported cryptocurrencies with CoinGecko IDs
  const cryptoList = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "solana", symbol: "SOL", name: "Solana" },
    { id: "cardano", symbol: "ADA", name: "Cardano" },
    { id: "polkadot", symbol: "DOT", name: "Polkadot" },
    { id: "ripple", symbol: "XRP", name: "Ripple" },
    { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
    { id: "chainlink", symbol: "LINK", name: "Chainlink" },
    { id: "polygon", symbol: "MATIC", name: "Polygon" },
    { id: "litecoin", symbol: "LTC", name: "Litecoin" },
    { id: "uniswap", symbol: "UNI", name: "Uniswap" },
    { id: "avalanche-2", symbol: "AVAX", name: "Avalanche" },
    { id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu" },
    { id: "crypto-com-chain", symbol: "CRO", name: "Crypto.com" },
    { id: "stellar", symbol: "XLM", name: "Stellar" },
  ];

  // Fallback prices in case API fails (cached from last successful fetch)
  const [fallbackPrices, setFallbackPrices] = useState<CryptoPrice[]>([]);

  // Fetch crypto prices with fallback
  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using CoinGecko API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const ids = cryptoList.map(c => c.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_high=true&include_24hr_low=true&include_market_cap=true&include_24hr_vol=true`,
        { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        // If we have fallback data, use it
        if (fallbackPrices.length > 0) {
          setCryptoPrices(fallbackPrices);
          setError("Using cached data. API may be rate-limited.");
          setLoading(false);
          return;
        }
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      const prices: CryptoPrice[] = cryptoList.map(crypto => {
        const priceData = data[crypto.id] || {};
        return {
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          price: priceData.usd || 0,
          priceChange24h: priceData.usd_24h_change || 0,
          high24h: priceData.usd_24h_high || 0,
          low24h: priceData.usd_24h_low || 0,
          marketCap: priceData.usd_market_cap || 0,
          volume24h: priceData.usd_24h_vol || 0,
          lastUpdated: new Date().toLocaleString(),
        };
      });

      // Save as fallback
      setFallbackPrices(prices);
      setCryptoPrices(prices);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
      
      // Update exchange rate
      updateExchangeRate(prices);

    } catch (err) {
      console.error('Error fetching crypto prices:', err);
      
      // Use fallback data if available
      if (fallbackPrices.length > 0) {
        setCryptoPrices(fallbackPrices);
        setError("Using cached data. Please try again later for live prices.");
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      }
    } finally {
      setLoading(false);
    }
  };

  // Update exchange rate calculation
  const updateExchangeRate = (prices: CryptoPrice[]) => {
    const from = prices.find(p => p.symbol === fromCurrency);
    const to = prices.find(p => p.symbol === toCurrency);
    
    if (from && to && from.price > 0 && to.price > 0) {
      const rate = from.price / to.price;
      setExchangeRate({
        from: from.symbol,
        to: to.symbol,
        rate: rate,
        fromName: from.name,
        toName: to.name,
      });
      setConvertedAmount(amount * rate);
    }
  };

  // Handle amount change
  const handleAmountChange = (value: number) => {
    setAmount(value);
    if (exchangeRate) {
      setConvertedAmount(value * exchangeRate.rate);
    }
  };

  // Handle currency change
  const handleFromCurrencyChange = (symbol: string) => {
    setFromCurrency(symbol);
    if (symbol === toCurrency) {
      const available = cryptoList.find(c => c.symbol !== symbol);
      if (available) setToCurrency(available.symbol);
    }
  };

  const handleToCurrencyChange = (symbol: string) => {
    setToCurrency(symbol);
    if (symbol === fromCurrency) {
      const available = cryptoList.find(c => c.symbol !== symbol);
      if (available) setFromCurrency(available.symbol);
    }
  };

  // Fetch prices on mount and every 60 seconds
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update exchange rate when currencies or prices change
  useEffect(() => {
    if (cryptoPrices.length > 0) {
      updateExchangeRate(cryptoPrices);
    }
  }, [fromCurrency, toCurrency, cryptoPrices]);

  // Update converted amount when exchange rate changes
  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount(amount * exchangeRate.rate);
    }
  }, [exchangeRate, amount]);

  // Filter crypto list for search
  const filteredCryptos = cryptoPrices.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format currency
  const formatCurrency = (value: number) => {
    if (value === 0) return '$0.00';
    if (value >= 1000) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (value >= 1) {
      return `$${value.toFixed(2)}`;
    } else if (value >= 0.01) {
      return `$${value.toFixed(4)}`;
    } else {
      return `$${value.toFixed(6)}`;
    }
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600 dark:text-green-400";
    if (change < 0) return "text-red-600 dark:text-red-400";
    return "text-zinc-600 dark:text-zinc-400";
  };

  // Check if all prices are zero (likely API failure)
  const hasValidPrices = cryptoPrices.some(p => p.price > 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            💰 Crypto Exchange Rate Tool
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Real-time cryptocurrency prices and exchange rates. Live updates every 60 seconds.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className={`mb-4 p-4 rounded-xl ${error.includes('cached') ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
            ⚠️ {error}
          </div>
        )}

        {/* Exchange Rate Converter */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
            Currency Converter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => handleFromCurrencyChange(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cryptoPrices.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.symbol} - {crypto.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => handleToCurrencyChange(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cryptoPrices.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.symbol} - {crypto.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {exchangeRate && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-center text-lg">
                <span className="font-bold text-black dark:text-white">
                  {amount} {exchangeRate.from}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 mx-2">=</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">
                  {convertedAmount.toFixed(6)} {exchangeRate.to}
                </span>
              </p>
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                1 {exchangeRate.from} = {exchangeRate.rate.toFixed(6)} {exchangeRate.to}
              </p>
            </div>
          )}
        </div>

        {/* Price Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Crypto Prices
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {loading ? 'Updating...' : `Last updated: ${lastUpdated}`}
              </div>
              <button
                onClick={fetchPrices}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳' : '🔄 Refresh'}
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cryptocurrencies..."
              className="w-full px-4 py-2 mb-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {loading && cryptoPrices.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-2">Loading prices...</p>
              </div>
            ) : !hasValidPrices ? (
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                <p>Unable to load prices. Please try again later.</p>
                <button
                  onClick={fetchPrices}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">#</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Symbol</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Price (USD)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">24h Change</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">24h High</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">24h Low</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCryptos.map((crypto, index) => (
                      <tr key={crypto.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-2 text-sm text-zinc-500 dark:text-zinc-400">{index + 1}</td>
                        <td className="py-3 px-2 text-sm font-medium text-black dark:text-white">{crypto.name}</td>
                        <td className="py-3 px-2 text-sm font-mono text-zinc-600 dark:text-zinc-400">{crypto.symbol}</td>
                        <td className="py-3 px-2 text-sm font-mono text-right text-black dark:text-white">
                          {formatCurrency(crypto.price)}
                        </td>
                        <td className={`py-3 px-2 text-sm font-medium text-right ${getPriceChangeColor(crypto.priceChange24h)}`}>
                          {crypto.priceChange24h.toFixed(2)}%
                        </td>
                        <td className="py-3 px-2 text-sm font-mono text-right text-zinc-600 dark:text-zinc-400">
                          {formatCurrency(crypto.high24h)}
                        </td>
                        <td className="py-3 px-2 text-sm font-mono text-right text-zinc-600 dark:text-zinc-400">
                          {formatCurrency(crypto.low24h)}
                        </td>
                        <td className="py-3 px-2 text-sm font-mono text-right text-zinc-600 dark:text-zinc-400">
                          {formatMarketCap(crypto.marketCap)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCryptos.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    No cryptocurrencies found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}