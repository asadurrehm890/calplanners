"use client";

import { useState, useEffect } from "react";

// Types
interface CostItem {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  unit: string;
  type: "wax" | "fragrance" | "container" | "wick" | "packaging" | "other";
}

interface CalculatedItem extends CostItem {
  costPerCandle: number;
  totalCost: number;
}

interface CalculationResult {
  totalCost: number;
  costPerUnit: number;
  profitMargin: number;
  sellingPrice: number;
  items: CalculatedItem[];
}

export default function CandleCalculator() {
  // State for cost items
  const [items, setItems] = useState<CostItem[]>([
    { id: "1", name: "Soy Wax", cost: 15.99, quantity: 10, unit: "lbs", type: "wax" },
    { id: "2", name: "Fragrance Oil", cost: 12.50, quantity: 4, unit: "oz", type: "fragrance" },
    { id: "3", name: "Glass Jar", cost: 3.99, quantity: 12, unit: "pieces", type: "container" },
    { id: "4", name: "Wick", cost: 0.50, quantity: 50, unit: "pieces", type: "wick" },
    { id: "5", name: "Label", cost: 0.25, quantity: 100, unit: "pieces", type: "packaging" },
  ]);
  
  // State for additional inputs
  const [waxPerCandle, setWaxPerCandle] = useState<number>(8); // ounces
  const [fragrancePerCandle, setFragrancePerCandle] = useState<number>(0.8); // ounces
  const [numberOfCandles, setNumberOfCandles] = useState<number>(10);
  const [desiredProfitMargin, setDesiredProfitMargin] = useState<number>(40);
  const [selectedType, setSelectedType] = useState<string>("all");
  
  // State for results
  const [results, setResults] = useState<CalculationResult>({
    totalCost: 0,
    costPerUnit: 0,
    profitMargin: 0,
    sellingPrice: 0,
    items: [],
  });

  // Add new item
  const addItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      name: "New Item",
      cost: 0,
      quantity: 1,
      unit: "unit",
      type: "other",
    };
    setItems([...items, newItem]);
  };

  // Remove item
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: string, field: keyof CostItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate costs
  const calculateCosts = () => {
    // Calculate cost per item based on usage
    const calculatedItems: CalculatedItem[] = items.map(item => {
      let costPerCandle = 0;
      
      switch(item.type) {
        case "wax":
          costPerCandle = (item.cost / item.quantity) * (waxPerCandle / 16); // Convert oz to lbs
          break;
        case "fragrance":
          costPerCandle = (item.cost / item.quantity) * fragrancePerCandle;
          break;
        case "container":
        case "wick":
        case "packaging":
        case "other":
          costPerCandle = item.cost / item.quantity;
          break;
        default:
          costPerCandle = 0;
      }
      
      const totalCost = costPerCandle * numberOfCandles;
      
      return {
        ...item,
        costPerCandle: Number(costPerCandle.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
      };
    });

    // Calculate totals
    const totalCost = calculatedItems.reduce((sum, item) => sum + item.totalCost, 0);
    const costPerUnit = totalCost / numberOfCandles;
    const sellingPrice = costPerUnit / (1 - (desiredProfitMargin / 100));
    const profitMargin = ((sellingPrice - costPerUnit) / sellingPrice) * 100;

    setResults({
      totalCost: Number(totalCost.toFixed(2)),
      costPerUnit: Number(costPerUnit.toFixed(2)),
      profitMargin: Number(profitMargin.toFixed(1)),
      sellingPrice: Number(sellingPrice.toFixed(2)),
      items: calculatedItems,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateCosts();
  }, [items, waxPerCandle, fragrancePerCandle, numberOfCandles, desiredProfitMargin]);

  const filteredItems = selectedType === "all" 
    ? items 
    : items.filter(item => item.type === selectedType);

  const typeOptions = [
    { value: "all", label: "All Items" },
    { value: "wax", label: "Wax" },
    { value: "fragrance", label: "Fragrance" },
    { value: "container", label: "Containers" },
    { value: "wick", label: "Wicks" },
    { value: "packaging", label: "Packaging" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🕯️ Candle Making Cost Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Calculate your candle costs, profit margins, and selling prices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Settings Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Production Settings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Number of Candles
                  </label>
                  <input
                    type="number"
                    value={numberOfCandles}
                    onChange={(e) => setNumberOfCandles(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Wax per Candle (oz)
                  </label>
                  <input
                    type="number"
                    value={waxPerCandle}
                    onChange={(e) => setWaxPerCandle(Number(e.target.value))}
                    min="1"
                    step="0.5"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Fragrance per Candle (oz)
                  </label>
                  <input
                    type="number"
                    value={fragrancePerCandle}
                    onChange={(e) => setFragrancePerCandle(Number(e.target.value))}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Materials & Costs
                </h2>
                <div className="flex gap-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addItem}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Item</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Type</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Cost ($)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Qty</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Unit</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Per Candle</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Total</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => {
                      const calculatedItem = results.items.find(i => i.id === item.id);
                      return (
                        <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(item.id, "name", e.target.value)}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                              placeholder="Item name"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <select
                              value={item.type}
                              onChange={(e) => updateItem(item.id, "type", e.target.value as CostItem["type"])}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                            >
                              {typeOptions.filter(opt => opt.value !== "all").map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={item.cost}
                              onChange={(e) => updateItem(item.id, "cost", Number(e.target.value))}
                              min="0"
                              step="0.01"
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                              min="0"
                              step="0.01"
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                              placeholder="unit"
                            />
                          </td>
                          <td className="py-2 px-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            ${(calculatedItem?.costPerCandle || 0).toFixed(2)}
                          </td>
                          <td className="py-2 px-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            ${(calculatedItem?.totalCost || 0).toFixed(2)}
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    No items found. Add some materials to get started!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80">Total Cost</p>
                  <p className="text-3xl font-bold">${results.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Cost Per Candle</p>
                  <p className="text-2xl font-bold">${results.costPerUnit.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Profit Margin Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Profit Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Desired Profit Margin (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      value={desiredProfitMargin}
                      onChange={(e) => setDesiredProfitMargin(Number(e.target.value))}
                      min="10"
                      max="80"
                      className="flex-1 accent-blue-600"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[60px]">
                      {desiredProfitMargin}%
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Suggested Selling Price</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${results.sellingPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Actual Profit Margin</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {results.profitMargin}%
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Cost Breakdown
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {results.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{item.name}</span>
                    <span className="font-medium text-black dark:text-white">
                      ${item.totalCost.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-bold">
                <span className="text-black dark:text-white">Total</span>
                <span className="text-black dark:text-white">${results.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  results,
                  settings: { numberOfCandles, waxPerCandle, fragrancePerCandle, desiredProfitMargin },
                  items,
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `candle-cost-calculator-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-600 transition-colors font-medium"
            >
              📥 Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}