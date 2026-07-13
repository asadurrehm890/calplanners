"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Equipment ROI Calculator | Smart Business Investment Tool',
  description: 'Calculate the return on investment for your equipment purchases. Make informed decisions and maximize business profitability.',
  keywords: 'ROI calculator, equipment ROI, business investment, payback period, capital investment',
  openGraph: {
    title: 'Equipment ROI Calculator | Smart Business Investment Tool',
    description: 'Calculate the return on investment for your equipment purchases. Make informed business decisions.',
    url: 'https://calplanners.online/equipment-roi-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/equipment-roi-calculator',
  },
};

// Types
interface EquipmentItem {
  id: string;
  name: string;
  purchasePrice: number;
  usefulLife: number; // in years
  salvageValue: number;
  annualMaintenance: number;
  annualRevenue: number;
  annualOperatingCost: number;
  financingType: "cash" | "loan" | "lease";
  interestRate: number;
  downPayment: number;
  leaseTerm: number; // in months
}

interface CalculationResult {
  totalCost: number;
  totalRevenue: number;
  netProfit: number;
  roi: number;
  paybackPeriod: number; // in years
  breakEvenPoint: number; // in years
  annualCashFlow: number;
  monthlyPayment: number;
  totalFinancingCost: number;
}

export default function EquipmentROICalculator() {
  // Equipment items
  const [equipment, setEquipment] = useState<EquipmentItem[]>([
    {
      id: "1",
      name: "CNC Machine",
      purchasePrice: 25000,
      usefulLife: 10,
      salvageValue: 2500,
      annualMaintenance: 1200,
      annualRevenue: 15000,
      annualOperatingCost: 3000,
      financingType: "cash",
      interestRate: 6.5,
      downPayment: 5000,
      leaseTerm: 36,
    },
    {
      id: "2",
      name: "3D Printer",
      purchasePrice: 5000,
      usefulLife: 5,
      salvageValue: 500,
      annualMaintenance: 400,
      annualRevenue: 6000,
      annualOperatingCost: 800,
      financingType: "loan",
      interestRate: 7.0,
      downPayment: 1000,
      leaseTerm: 24,
    },
  ]);

  // State for new equipment
  const [showNewEquipment, setShowNewEquipment] = useState<boolean>(false);
  const [newEquipment, setNewEquipment] = useState<EquipmentItem>({
    id: "",
    name: "",
    purchasePrice: 0,
    usefulLife: 5,
    salvageValue: 0,
    annualMaintenance: 0,
    annualRevenue: 0,
    annualOperatingCost: 0,
    financingType: "cash",
    interestRate: 6.5,
    downPayment: 0,
    leaseTerm: 36,
  });

  // Results
  const [results, setResults] = useState<Map<string, CalculationResult>>(new Map());

  // Calculate ROI for a single equipment
  const calculateROI = (item: EquipmentItem): CalculationResult => {
    // Calculate total revenue over useful life
    const totalRevenue = item.annualRevenue * item.usefulLife;
    
    // Calculate total costs
    const totalOperatingCost = item.annualOperatingCost * item.usefulLife;
    const totalMaintenance = item.annualMaintenance * item.usefulLife;
    
    // Calculate financing costs
    let financingCost = 0;
    let monthlyPayment = 0;
    let totalFinancingCost = 0;
    
    if (item.financingType === "loan") {
      const loanAmount = item.purchasePrice - item.downPayment;
      const monthlyRate = item.interestRate / 100 / 12;
      const numberOfPayments = item.leaseTerm;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        monthlyPayment = loanAmount / numberOfPayments;
      }
      totalFinancingCost = monthlyPayment * numberOfPayments - loanAmount;
      financingCost = totalFinancingCost;
    } else if (item.financingType === "lease") {
      const monthlyRate = item.interestRate / 100 / 12;
      const numberOfPayments = item.leaseTerm;
      if (monthlyRate > 0) {
        monthlyPayment = item.purchasePrice * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        monthlyPayment = item.purchasePrice / numberOfPayments;
      }
      totalFinancingCost = monthlyPayment * numberOfPayments - item.purchasePrice;
      financingCost = totalFinancingCost;
    }
    
    // Total cost including depreciation
    const depreciation = item.purchasePrice - item.salvageValue;
    const totalCost = item.purchasePrice + totalOperatingCost + totalMaintenance + financingCost;
    
    // Net profit
    const netProfit = totalRevenue - totalCost;
    
    // ROI
    const roi = totalRevenue > 0 ? (netProfit / item.purchasePrice) * 100 : 0;
    
    // Payback period (years)
    const annualCashFlow = item.annualRevenue - item.annualOperatingCost - item.annualMaintenance - (item.purchasePrice / item.usefulLife);
    const paybackPeriod = annualCashFlow > 0 ? item.purchasePrice / annualCashFlow : 0;
    
    // Break-even point (years)
    const breakEvenPoint = totalRevenue > 0 ? item.purchasePrice / (item.annualRevenue - item.annualOperatingCost - item.annualMaintenance) : 0;
    
    return {
      totalCost: Number(totalCost.toFixed(2)),
      totalRevenue: Number(totalRevenue.toFixed(2)),
      netProfit: Number(netProfit.toFixed(2)),
      roi: Number(roi.toFixed(1)),
      paybackPeriod: Number(paybackPeriod.toFixed(2)),
      breakEvenPoint: Number(breakEvenPoint.toFixed(2)),
      annualCashFlow: Number(annualCashFlow.toFixed(2)),
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      totalFinancingCost: Number(totalFinancingCost.toFixed(2)),
    };
  };

  // Calculate all results
  const calculateAll = () => {
    const newResults = new Map<string, CalculationResult>();
    equipment.forEach(item => {
      newResults.set(item.id, calculateROI(item));
    });
    setResults(newResults);
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateAll();
  }, [equipment]);

  // Add equipment
  const addEquipment = () => {
    if (!newEquipment.name.trim()) return;
    const id = Date.now().toString();
    setEquipment([...equipment, { ...newEquipment, id }]);
    setNewEquipment({
      id: "",
      name: "",
      purchasePrice: 0,
      usefulLife: 5,
      salvageValue: 0,
      annualMaintenance: 0,
      annualRevenue: 0,
      annualOperatingCost: 0,
      financingType: "cash",
      interestRate: 6.5,
      downPayment: 0,
      leaseTerm: 36,
    });
    setShowNewEquipment(false);
  };

  // Remove equipment
  const removeEquipment = (id: string) => {
    if (equipment.length <= 1) return;
    setEquipment(equipment.filter(item => item.id !== id));
  };

  // Update equipment
  const updateEquipment = (id: string, field: keyof EquipmentItem, value: string | number) => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Get ROI color
  const getROIColor = (roi: number) => {
    if (roi > 50) return "text-green-600 dark:text-green-400";
    if (roi > 20) return "text-blue-600 dark:text-blue-400";
    if (roi > 0) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  // Get ROI emoji
  const getROIEmoji = (roi: number) => {
    if (roi > 50) return "🚀";
    if (roi > 20) return "📈";
    if (roi > 0) return "💪";
    return "⚠️";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            📊 Equipment ROI Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate the return on investment for your equipment purchases and make informed business decisions
          </p>
        </div>

        {/* Add Equipment Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowNewEquipment(!showNewEquipment)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showNewEquipment ? "Cancel" : "+ Add Equipment"}
          </button>
        </div>

        {/* New Equipment Form */}
        {showNewEquipment && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
              New Equipment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Equipment Name
                </label>
                <input
                  type="text"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  placeholder="e.g., CNC Machine"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  value={newEquipment.purchasePrice}
                  onChange={(e) => setNewEquipment({ ...newEquipment, purchasePrice: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Useful Life (years)
                </label>
                <input
                  type="number"
                  value={newEquipment.usefulLife}
                  onChange={(e) => setNewEquipment({ ...newEquipment, usefulLife: Number(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Salvage Value ($)
                </label>
                <input
                  type="number"
                  value={newEquipment.salvageValue}
                  onChange={(e) => setNewEquipment({ ...newEquipment, salvageValue: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Annual Revenue ($)
                </label>
                <input
                  type="number"
                  value={newEquipment.annualRevenue}
                  onChange={(e) => setNewEquipment({ ...newEquipment, annualRevenue: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Annual Operating Cost ($)
                </label>
                <input
                  type="number"
                  value={newEquipment.annualOperatingCost}
                  onChange={(e) => setNewEquipment({ ...newEquipment, annualOperatingCost: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Annual Maintenance ($)
                </label>
                <input
                  type="number"
                  value={newEquipment.annualMaintenance}
                  onChange={(e) => setNewEquipment({ ...newEquipment, annualMaintenance: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Financing Type
                </label>
                <select
                  value={newEquipment.financingType}
                  onChange={(e) => setNewEquipment({ ...newEquipment, financingType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cash">Cash</option>
                  <option value="loan">Loan</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
              {newEquipment.financingType !== "cash" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      value={newEquipment.interestRate}
                      onChange={(e) => setNewEquipment({ ...newEquipment, interestRate: Number(e.target.value) })}
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      {newEquipment.financingType === "loan" ? "Down Payment ($)" : "Lease Term (months)"}
                    </label>
                    <input
                      type="number"
                      value={newEquipment.financingType === "loan" ? newEquipment.downPayment : newEquipment.leaseTerm}
                      onChange={(e) => setNewEquipment({ 
                        ...newEquipment, 
                        [newEquipment.financingType === "loan" ? "downPayment" : "leaseTerm"]: Number(e.target.value) 
                      })}
                      min="0"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={addEquipment}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Add Equipment
              </button>
              <button
                onClick={() => setShowNewEquipment(false)}
                className="px-6 py-2 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {equipment.map((item) => {
            const result = results.get(item.id);
            if (!result) return null;

            return (
              <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    {item.name}
                  </h2>
                  <button
                    onClick={() => removeEquipment(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove equipment"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Purchase Price
                    </label>
                    <input
                      type="number"
                      value={item.purchasePrice}
                      onChange={(e) => updateEquipment(item.id, "purchasePrice", Number(e.target.value))}
                      className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Useful Life (years)
                    </label>
                    <input
                      type="number"
                      value={item.usefulLife}
                      onChange={(e) => updateEquipment(item.id, "usefulLife", Number(e.target.value))}
                      className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Annual Revenue
                    </label>
                    <input
                      type="number"
                      value={item.annualRevenue}
                      onChange={(e) => updateEquipment(item.id, "annualRevenue", Number(e.target.value))}
                      className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Annual Cost
                    </label>
                    <input
                      type="number"
                      value={item.annualOperatingCost}
                      onChange={(e) => updateEquipment(item.id, "annualOperatingCost", Number(e.target.value))}
                      className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">ROI</p>
                    <p className={`text-xl font-bold ${getROIColor(result.roi)}`}>
                      {result.roi}% {getROIEmoji(result.roi)}
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Net Profit</p>
                    <p className={`text-xl font-bold ${result.netProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      ${result.netProfit.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Payback Period</p>
                    <p className="text-xl font-bold text-black dark:text-white">
                      {result.paybackPeriod > 0 ? `${result.paybackPeriod} yrs` : "N/A"}
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Break-Even</p>
                    <p className="text-xl font-bold text-black dark:text-white">
                      {result.breakEvenPoint > 0 ? `${result.breakEvenPoint} yrs` : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Total Cost:</span>
                    <span className="font-medium text-black dark:text-white ml-2">${result.totalCost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Total Revenue:</span>
                    <span className="font-medium text-black dark:text-white ml-2">${result.totalRevenue.toLocaleString()}</span>
                  </div>
                  {result.monthlyPayment > 0 && (
                    <div className="col-span-2">
                      <span className="text-zinc-500 dark:text-zinc-400">Monthly Payment:</span>
                      <span className="font-medium text-black dark:text-white ml-2">${result.monthlyPayment.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}