"use client";

import { useState, useEffect } from "react";

// Types
interface MaterialItem {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  unit: string;
  type: "hook" | "thread" | "feather" | "fur" | "synthetic" | "bead" | "wire" | "other";
  usagePerFly: number;
}

interface CalculationResult {
  totalCost: number;
  costPerFly: number;
  materialsPerFly: MaterialItem[];
  totalMaterialsUsed: number;
}

export default function FlyTyingEstimator() {
  // State for material items
  const [items, setItems] = useState<MaterialItem[]>([
    { id: "1", name: "Dry Fly Hooks", cost: 8.99, quantity: 25, unit: "hooks", type: "hook", usagePerFly: 1 },
    { id: "2", name: "Thread (White)", cost: 3.99, quantity: 100, unit: "yards", type: "thread", usagePerFly: 0.5 },
    { id: "3", name: "Hackle Feathers", cost: 12.99, quantity: 20, unit: "feathers", type: "feather", usagePerFly: 1 },
    { id: "4", name: "Bead Heads", cost: 6.99, quantity: 10, unit: "beads", type: "bead", usagePerFly: 1 },
    { id: "5", name: "Tinsel Wire", cost: 4.99, quantity: 50, unit: "yards", type: "wire", usagePerFly: 0.3 },
  ]);
  
  // State for additional inputs
  const [numberOfFlies, setNumberOfFlies] = useState<number>(10);
  const [selectedType, setSelectedType] = useState<string>("all");
  
  // State for results
  const [results, setResults] = useState<CalculationResult>({
    totalCost: 0,
    costPerFly: 0,
    materialsPerFly: [],
    totalMaterialsUsed: 0,
  });

  // Add new item
  const addItem = () => {
    const newItem: MaterialItem = {
      id: Date.now().toString(),
      name: "New Material",
      cost: 0,
      quantity: 1,
      unit: "unit",
      type: "other",
      usagePerFly: 1,
    };
    setItems([...items, newItem]);
  };

  // Remove item
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: string, field: keyof MaterialItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate costs
  const calculateCosts = () => {
    // Calculate cost per fly for each material
    const calculatedItems = items.map(item => {
      const costPerUnit = item.cost / item.quantity;
      const costPerFly = costPerUnit * item.usagePerFly;
      const totalUsage = item.usagePerFly * numberOfFlies;
      const totalCost = (costPerUnit * totalUsage);
      
      return {
        ...item,
        costPerUnit: Number(costPerUnit.toFixed(3)),
        costPerFly: Number(costPerFly.toFixed(3)),
        totalUsage: Number(totalUsage.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        remainingMaterials: Number((item.quantity - totalUsage).toFixed(2)),
        willNeedMore: totalUsage > item.quantity,
      };
    });

    // Calculate totals
    const totalCost = calculatedItems.reduce((sum, item) => sum + item.totalCost, 0);
    const costPerFly = totalCost / numberOfFlies;
    const totalMaterialsUsed = calculatedItems.reduce((sum, item) => sum + item.totalUsage, 0);

    setResults({
      totalCost: Number(totalCost.toFixed(2)),
      costPerFly: Number(costPerFly.toFixed(2)),
      materialsPerFly: calculatedItems as any,
      totalMaterialsUsed: Number(totalMaterialsUsed.toFixed(2)),
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateCosts();
  }, [items, numberOfFlies]);

  const filteredItems = selectedType === "all" 
    ? items 
    : items.filter(item => item.type === selectedType);

  const typeOptions = [
    { value: "all", label: "All Materials" },
    { value: "hook", label: "Hooks" },
    { value: "thread", label: "Thread" },
    { value: "feather", label: "Feathers" },
    { value: "fur", label: "Fur" },
    { value: "synthetic", label: "Synthetics" },
    { value: "bead", label: "Beads" },
    { value: "wire", label: "Wire" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🎣 Fly Tying Material Estimator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Calculate material costs, usage, and estimate how many flies you can tie
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Number of Flies to Tie
                  </label>
                  <input
                    type="number"
                    value={numberOfFlies}
                    onChange={(e) => setNumberOfFlies(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setNumberOfFlies(Math.max(1, numberOfFlies + 5))}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    +5 Flies
                  </button>
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
                    + Add Material
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Material</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Type</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Cost ($)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Qty</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Unit</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Per Fly</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Total</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, "name", e.target.value)}
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                            placeholder="Material name"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(item.id, "type", e.target.value)}
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
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={item.usagePerFly}
                            onChange={(e) => updateItem(item.id, "usagePerFly", Number(e.target.value))}
                            min="0"
                            step="0.01"
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          ${(results.materialsPerFly.find(i => i.id === item.id)?.totalCost || 0).toFixed(2)}
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
                    ))}
                  </tbody>
                </table>
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                    No materials added. Start adding your fly tying materials!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80">Total Cost</p>
                  <p className="text-3xl font-bold">${results.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Cost Per Fly</p>
                  <p className="text-2xl font-bold">${results.costPerFly.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Materials Used</p>
                  <p className="text-2xl font-bold">{results.totalMaterialsUsed.toFixed(1)} units</p>
                </div>
              </div>
            </div>

            {/* Material Breakdown Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Material Breakdown
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {results.materialsPerFly.map((item: any) => (
                  <div key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">{item.name}</span>
                      <span className="font-medium text-black dark:text-white">
                        ${item.totalCost?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>{item.usagePerFly} {item.unit}/fly</span>
                      <span className={item.willNeedMore ? "text-red-500" : "text-green-500"}>
                        {item.willNeedMore ? "⚠️ Need more" : `✓ ${item.remainingMaterials.toFixed(1)} remaining`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-bold">
                <span className="text-black dark:text-white">Total</span>
                <span className="text-black dark:text-white">${results.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Materials</span>
                  <span className="font-medium text-black dark:text-white">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Flies to Tie</span>
                  <span className="font-medium text-black dark:text-white">{numberOfFlies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Material Types</span>
                  <span className="font-medium text-black dark:text-white">
                    {new Set(items.map(i => i.type)).size}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-600 dark:text-zinc-400">Cost per Fly</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${results.costPerFly.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  results,
                  settings: { numberOfFlies },
                  items,
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `fly-tying-estimator-${new Date().toISOString().slice(0,10)}.json`;
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