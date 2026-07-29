"use client";

import { useState, useEffect } from "react";

// Types
interface Transaction {
  id: string;
  date: string;
  type: "buy" | "sell";
  coin: string;
  amount: number;
  price: number;
  fees: number;
  notes: string;
}

interface Holding {
  coin: string;
  totalBought: number;
  totalSold: number;
  netAmount: number;
  averageBuyPrice: number;
  currentPrice: number;
  currentValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface PriceData {
  [key: string]: number;
}

// CoinGecko API mapping
const coinMapping: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'ADA': 'cardano',
  'DOT': 'polkadot',
  'XRP': 'ripple',
  'DOGE': 'dogecoin',
  'LINK': 'chainlink',
  'MATIC': 'polygon',
  'LTC': 'litecoin',
  'UNI': 'uniswap',
  'AVAX': 'avalanche-2',
  'SHIB': 'shiba-inu',
  'XLM': 'stellar',
};

const coinNames: { [key: string]: string } = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'SOL': 'Solana',
  'ADA': 'Cardano',
  'DOT': 'Polkadot',
  'XRP': 'Ripple',
  'DOGE': 'Dogecoin',
  'LINK': 'Chainlink',
  'MATIC': 'Polygon',
  'LTC': 'Litecoin',
  'UNI': 'Uniswap',
  'AVAX': 'Avalanche',
  'SHIB': 'Shiba Inu',
  'XLM': 'Stellar',
};

export default function CryptoProfitLossClient() {
  // State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPrices, setCurrentPrices] = useState<PriceData>({});
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "transactions" | "add">("summary");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // New transaction form
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: "buy",
    coin: "BTC",
    amount: 0,
    price: 0,
    fees: 0,
    notes: "",
  });

  // Add transaction
  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.price) {
      alert("Please fill in all required fields.");
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      ...newTransaction,
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      type: "buy",
      coin: "BTC",
      amount: 0,
      price: 0,
      fees: 0,
      notes: "",
    });
    setActiveTab("summary");
  };

  // Remove transaction
  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Fetch current prices from CoinGecko
  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const coins = Object.keys(coinMapping);
      const ids = coins.map(c => coinMapping[c]).join(',');
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      const prices: PriceData = {};
      
      coins.forEach(coin => {
        const id = coinMapping[coin];
        prices[coin] = data[id]?.usd || 0;
      });
      
      setCurrentPrices(prices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  };

  // Calculate holdings
  const calculateHoldings = () => {
    const holdingsMap: { [key: string]: { totalBought: number; totalSold: number; totalCost: number; totalBuyAmount: number } } = {};
    
    transactions.forEach(t => {
      if (!holdingsMap[t.coin]) {
        holdingsMap[t.coin] = {
          totalBought: 0,
          totalSold: 0,
          totalCost: 0,
          totalBuyAmount: 0,
        };
      }
      
      const totalCost = t.amount * t.price + t.fees;
      
      if (t.type === "buy") {
        holdingsMap[t.coin].totalBought += t.amount;
        holdingsMap[t.coin].totalCost += totalCost;
        holdingsMap[t.coin].totalBuyAmount += t.amount;
      } else {
        holdingsMap[t.coin].totalSold += t.amount;
        // Pro-rata cost for sold amount
        const avgCost = holdingsMap[t.coin].totalCost / holdingsMap[t.coin].totalBought;
        holdingsMap[t.coin].totalCost -= t.amount * avgCost;
        holdingsMap[t.coin].totalBought -= t.amount;
      }
    });

    const holdingsList: Holding[] = Object.keys(holdingsMap).map(coin => {
      const data = holdingsMap[coin];
      const netAmount = data.totalBought;
      const currentPrice = currentPrices[coin] || 0;
      const currentValue = netAmount * currentPrice;
      const averageBuyPrice = data.totalBought > 0 ? data.totalCost / data.totalBought : 0;
      const totalCost = data.totalCost;
      const profitLoss = currentValue - totalCost;
      const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

      return {
        coin,
        totalBought: data.totalBought,
        totalSold: data.totalSold,
        netAmount: Number(netAmount.toFixed(8)),
        averageBuyPrice: Number(averageBuyPrice.toFixed(4)),
        currentPrice: Number(currentPrice.toFixed(2)),
        currentValue: Number(currentValue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        profitLoss: Number(profitLoss.toFixed(2)),
        profitLossPercent: Number(profitLossPercent.toFixed(2)),
      };
    });

    // Filter out coins with zero balance
    setHoldings(holdingsList.filter(h => h.netAmount > 0.00000001));
  };

  // Auto-calculate when transactions or prices change
  useEffect(() => {
    calculateHoldings();
  }, [transactions, currentPrices]);

  // Fetch prices on mount and every 60 seconds
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total portfolio value
  const totalPortfolioValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.totalCost, 0);
  const totalProfitLoss = holdings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalProfitLossPercent = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

  // Get available coins for dropdown
  const availableCoins = Object.keys(coinMapping);

  // Filter holdings by search
  const filteredHoldings = holdings.filter(h => 
    h.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coinNames[h.coin]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            📊 Crypto Profit/Loss Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Track your cryptocurrency investments, calculate profits and losses, and monitor your portfolio performance in real-time.
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 text-white">
            <p className="text-sm opacity-80">Total Value</p>
            <p className="text-2xl font-bold">${totalPortfolioValue.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-4 text-white">
            <p className="text-sm opacity-80">Total Invested</p>
            <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
          </div>
          <div className={`bg-gradient-to-br rounded-2xl p-4 text-white ${totalProfitLoss >= 0 ? 'from-green-600 to-emerald-600' : 'from-red-600 to-rose-600'}`}>
            <p className="text-sm opacity-80">Total P/L</p>
            <p className="text-2xl font-bold">{totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)}</p>
          </div>
          <div className={`bg-gradient-to-br rounded-2xl p-4 text-white ${totalProfitLossPercent >= 0 ? 'from-green-600 to-emerald-600' : 'from-red-600 to-rose-600'}`}>
            <p className="text-sm opacity-80">Total ROI</p>
            <p className="text-2xl font-bold">{totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-sm flex mb-6">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "summary"
                ? "bg-blue-600 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            📊 Portfolio Summary
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "transactions"
                ? "bg-blue-600 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            📋 Transactions
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
              activeTab === "add"
                ? "bg-blue-600 text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            ➕ Add Transaction
          </button>
        </div>

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Your Holdings
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search coins..."
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={fetchPrices}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {loading ? '⏳' : '🔄 Refresh Prices'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                ⚠️ {error}
              </div>
            )}

            {filteredHoldings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Coin</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Amount</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg Buy</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Current Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Value</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">P/L</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHoldings.map((holding) => (
                      <tr key={holding.coin} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-2">
                          <span className="font-medium text-black dark:text-white">{holding.coin}</span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">{coinNames[holding.coin]}</span>
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          {holding.netAmount.toFixed(4)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          ${holding.averageBuyPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          ${holding.currentPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm font-medium text-black dark:text-white">
                          ${holding.currentValue.toFixed(2)}
                        </td>
                        <td className={`py-3 px-2 text-right font-mono text-sm font-medium ${holding.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {holding.profitLoss >= 0 ? '+' : ''}${holding.profitLoss.toFixed(2)}
                        </td>
                        <td className={`py-3 px-2 text-right font-mono text-sm font-medium ${holding.profitLossPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {holding.profitLossPercent >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-500 dark:text-zinc-400">No holdings yet. Add your first transaction to start tracking!</p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ➕ Add Transaction
                </button>
              </div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Transaction History
            </h2>
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Date</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Type</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Coin</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Amount</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fees</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Total</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...transactions].reverse().map((t) => (
                      <tr key={t.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-2 text-sm text-zinc-600 dark:text-zinc-400">{t.date}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.type === 'buy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                            {t.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium text-black dark:text-white">{t.coin}</td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          {t.amount.toFixed(4)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          ${t.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm text-zinc-600 dark:text-zinc-400">
                          ${t.fees.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-sm font-medium text-black dark:text-white">
                          ${(t.amount * t.price + t.fees).toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => removeTransaction(t.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-500 dark:text-zinc-400">No transactions yet. Add your first transaction to start tracking!</p>
              </div>
            )}
          </div>
        )}

        {/* Add Transaction Tab */}
        {activeTab === "add" && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              Add Transaction
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Type
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as "buy" | "sell" })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Coin
                </label>
                <select
                  value={newTransaction.coin}
                  onChange={(e) => setNewTransaction({ ...newTransaction, coin: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {availableCoins.map((coin) => (
                    <option key={coin} value={coin}>
                      {coin} - {coinNames[coin]}
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
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                  min="0"
                  step="0.0001"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Price (USD)
                </label>
                <input
                  type="number"
                  value={newTransaction.price}
                  onChange={(e) => setNewTransaction({ ...newTransaction, price: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Fees (USD)
                </label>
                <input
                  type="number"
                  value={newTransaction.fees}
                  onChange={(e) => setNewTransaction({ ...newTransaction, fees: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  placeholder="Add a note about this transaction..."
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={addTransaction}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ➕ Add Transaction
              </button>
              <button
                onClick={() => setActiveTab("summary")}
                className="px-6 py-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}