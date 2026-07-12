"use client";

import { useState, useEffect } from "react";

// Types
interface BodyPart {
  id: string;
  name: string;
  width: number; // in inches
  height: number; // in inches
  isRequired: boolean;
  furType: "long" | "medium" | "short" | "specialty";
  patternDirection: "nap" | "non-nap";
}

interface FurType {
  name: string;
  width: number; // fabric width in inches
  yield: number; // percentage of usable fabric
  stretch: number; // stretch factor
  pricePerYard: number;
}

interface CalculationResult {
  totalYards: number;
  totalCost: number;
  parts: {
    id: string;
    name: string;
    yardage: number;
    cost: number;
  }[];
  wastePercentage: number;
  recommendedYards: number;
}

export default function FursuitFurCalculator() {
  // Fur types available
  const furTypes: FurType[] = [
    { name: "Standard (60\" wide)", width: 60, yield: 0.85, stretch: 1.0, pricePerYard: 25.00 },
    { name: "Premium (58\" wide)", width: 58, yield: 0.88, stretch: 1.05, pricePerYard: 35.00 },
    { name: "Long Pile (54\" wide)", width: 54, yield: 0.80, stretch: 0.9, pricePerYard: 40.00 },
    { name: "Shag (48\" wide)", width: 48, yield: 0.75, stretch: 0.8, pricePerYard: 45.00 },
    { name: "Minky (44\" wide)", width: 44, yield: 0.90, stretch: 1.2, pricePerYard: 20.00 },
  ];

  // Body parts with default measurements
  const defaultParts: BodyPart[] = [
    { id: "head", name: "Head Base", width: 20, height: 24, isRequired: true, furType: "medium", patternDirection: "nap" },
    { id: "bodysuit", name: "Bodysuit", width: 36, height: 60, isRequired: true, furType: "medium", patternDirection: "nap" },
    { id: "arms", name: "Arms (pair)", width: 16, height: 28, isRequired: true, furType: "medium", patternDirection: "nap" },
    { id: "legs", name: "Legs (pair)", width: 20, height: 32, isRequired: true, furType: "medium", patternDirection: "nap" },
    { id: "feet", name: "Feet (pair)", width: 18, height: 12, isRequired: true, furType: "short", patternDirection: "nap" },
    { id: "hands", name: "Hands (pair)", width: 12, height: 10, isRequired: true, furType: "short", patternDirection: "nap" },
    { id: "tail", name: "Tail", width: 8, height: 30, isRequired: false, furType: "medium", patternDirection: "nap" },
    { id: "ears", name: "Ears (pair)", width: 10, height: 14, isRequired: true, furType: "short", patternDirection: "nap" },
    { id: "chest", name: "Chest Piece", width: 24, height: 18, isRequired: false, furType: "medium", patternDirection: "nap" },
    { id: "paws", name: "Paw Pads", width: 8, height: 6, isRequired: false, furType: "short", patternDirection: "non-nap" },
  ];

  // State
  const [parts, setParts] = useState<BodyPart[]>(defaultParts);
  const [selectedFurType, setSelectedFurType] = useState<string>(furTypes[0].name);
  const [wastePercentage, setWastePercentage] = useState<number>(15);
  const [includeSeamAllowance, setIncludeSeamAllowance] = useState<boolean>(true);
  
  const [result, setResult] = useState<CalculationResult>({
    totalYards: 0,
    totalCost: 0,
    parts: [],
    wastePercentage: 15,
    recommendedYards: 0,
  });

  // Get selected fur type data
  const getFurType = (name: string): FurType => {
    return furTypes.find(f => f.name === name) || furTypes[0];
  };

  // Calculate yardage for a single part
  const calculatePartYardage = (part: BodyPart, furType: FurType): number => {
    // Base area in square inches
    let area = part.width * part.height;
    
    // Add seam allowance (1 inch extra on each side)
    if (includeSeamAllowance) {
      area = (part.width + 2) * (part.height + 2);
    }
    
    // Adjust for fur type (some furs are less efficient)
    area = area / furType.yield;
    
    // Adjust for stretch
    area = area * furType.stretch;
    
    // Convert to square yards (1 sq yd = 1296 sq in)
    let yardage = (area / 1296) * 2; // Multiply by 2 for pattern pieces
    
    // Adjust for nap direction (adds 10-20% waste)
    if (part.patternDirection === "nap") {
      yardage = yardage * 1.15;
    }
    
    // Round up to nearest 0.1 yard
    yardage = Math.ceil(yardage * 10) / 10;
    
    return yardage;
  };

  // Calculate total yardage and cost
  const calculateTotals = () => {
    const furType = getFurType(selectedFurType);
    
    const calculatedParts = parts
      .filter(part => part.isRequired)
      .map(part => {
        const yardage = calculatePartYardage(part, furType);
        const cost = yardage * furType.pricePerYard;
        return {
          id: part.id,
          name: part.name,
          yardage: Number(yardage.toFixed(2)),
          cost: Number(cost.toFixed(2)),
        };
      });

    let totalYards = calculatedParts.reduce((sum, p) => sum + p.yardage, 0);
    const totalCost = calculatedParts.reduce((sum, p) => sum + p.cost, 0);
    
    // Add waste percentage
    const wasteMultiplier = 1 + (wastePercentage / 100);
    const totalWithWaste = totalYards * wasteMultiplier;
    
    // Add extra for pattern matching (10% of total)
    const patternMatchExtra = totalWithWaste * 0.10;
    
    // Final recommended yardage
    const recommendedYards = Math.ceil((totalWithWaste + patternMatchExtra) * 10) / 10;
    
    setResult({
      totalYards: Number(totalYards.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      parts: calculatedParts,
      wastePercentage: wastePercentage,
      recommendedYards: recommendedYards,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateTotals();
  }, [parts, selectedFurType, wastePercentage, includeSeamAllowance]);

  // Add a custom part
  const addCustomPart = () => {
    const newPart: BodyPart = {
      id: `custom-${Date.now()}`,
      name: "Custom Part",
      width: 12,
      height: 12,
      isRequired: true,
      furType: "medium",
      patternDirection: "nap",
    };
    setParts([...parts, newPart]);
  };

  // Remove a part
  const removePart = (id: string) => {
    if (parts.filter(p => p.isRequired).length <= 1) return;
    setParts(parts.map(p => p.id === id ? { ...p, isRequired: false } : p));
  };

  // Toggle part requirement
  const togglePart = (id: string) => {
    setParts(parts.map(p => p.id === id ? { ...p, isRequired: !p.isRequired } : p));
  };

  // Update part dimensions
  const updatePart = (id: string, field: keyof BodyPart, value: number | string) => {
    setParts(parts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const getFurTypeColor = (type: string) => {
    switch(type) {
      case "long": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      case "medium": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "short": return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "specialty": return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🦊 Fursuit Fur Yardage Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate exactly how much fur you need for your fursuit project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Settings Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Project Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Fur Type
                  </label>
                  <select
                    value={selectedFurType}
                    onChange={(e) => setSelectedFurType(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {furTypes.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.name} (${f.pricePerYard}/yd)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Waste Percentage
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      value={wastePercentage}
                      onChange={(e) => setWastePercentage(Number(e.target.value))}
                      min="5"
                      max="30"
                      className="flex-1 accent-blue-600"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[50px]">
                      {wastePercentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeSeamAllowance}
                    onChange={(e) => setIncludeSeamAllowance(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Include seam allowance (adds 1" to each side)
                  </span>
                </label>
              </div>
            </div>

            {/* Body Parts */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Body Parts
                </h2>
                <button
                  onClick={addCustomPart}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  + Add Custom Part
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Part</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Include</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Width (in)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Height (in)</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fur Type</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Yards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((part) => {
                      const calcPart = result.parts.find(p => p.id === part.id);
                      return (
                        <tr key={part.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={part.name}
                              onChange={(e) => updatePart(part.id, "name", e.target.value)}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                              placeholder="Part name"
                            />
                          </td>
                          <td className="py-2 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={part.isRequired}
                              onChange={() => togglePart(part.id)}
                              className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={part.width}
                              onChange={(e) => updatePart(part.id, "width", Number(e.target.value))}
                              min="1"
                              step="0.5"
                              disabled={!part.isRequired}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="number"
                              value={part.height}
                              onChange={(e) => updatePart(part.id, "height", Number(e.target.value))}
                              min="1"
                              step="0.5"
                              disabled={!part.isRequired}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <select
                              value={part.furType}
                              onChange={(e) => updatePart(part.id, "furType", e.target.value)}
                              disabled={!part.isRequired}
                              className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <option value="long">Long Pile</option>
                              <option value="medium">Medium</option>
                              <option value="short">Short</option>
                              <option value="specialty">Specialty</option>
                            </select>
                          </td>
                          <td className="py-2 px-2 text-right text-sm font-medium text-black dark:text-white">
                            {part.isRequired && calcPart ? calcPart.yardage.toFixed(2) : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Material Summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Total Fur Needed</p>
                  <p className="text-3xl font-bold">{result.totalYards.toFixed(2)} yards</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Recommended with Waste</p>
                  <p className="text-2xl font-bold">{result.recommendedYards.toFixed(2)} yards</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Estimated Cost</p>
                  <p className="text-2xl font-bold">${result.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Part Breakdown */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Part Breakdown
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {result.parts.map((part) => (
                  <div key={part.id} className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">{part.name}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-black dark:text-white">{part.yardage} yd</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">${part.cost.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-bold">
                <span className="text-black dark:text-white">Total</span>
                <span className="text-black dark:text-white">{result.totalYards.toFixed(2)} yd (${result.totalCost.toFixed(2)})</span>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                💡 Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  Always buy 10-20% extra for mistakes and pattern matching
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  Consider nap direction when cutting (fur lies differently)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  Test with cheap fabric first before cutting expensive fur
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400">•</span>
                  Mark the back of fur to avoid cutting mistakes
                </li>
              </ul>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  settings: {
                    furType: selectedFurType,
                    wastePercentage,
                    includeSeamAllowance,
                  },
                  parts: parts.filter(p => p.isRequired),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `fursuit-fur-calculator-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-600 transition-colors font-medium"
            >
              📥 Export Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}