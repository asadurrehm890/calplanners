"use client";

import { useState, useEffect } from "react";

// Types
interface TurtleSpecies {
  name: string;
  adultSize: number; // in inches
  minTankSize: number; // in gallons
  tankSizePerInch: number; // additional gallons per inch
  description: string;
}

interface CalculationResult {
  recommendedTankSize: number;
  minTankSize: number;
  currentTankSize: number;
  isAdequate: boolean;
  shortfall: number;
  growthFactor: number;
  species: string;
}

export default function TurtleTankCalculator() {
  // Turtle species data
  const species: TurtleSpecies[] = [
    {
      name: "Red-Eared Slider",
      adultSize: 12,
      minTankSize: 40,
      tankSizePerInch: 10,
      description: "One of the most common pet turtles"
    },
    {
      name: "Painted Turtle",
      adultSize: 8,
      minTankSize: 30,
      tankSizePerInch: 8,
      description: "Colorful and active basking turtles"
    },
    {
      name: "Musk Turtle",
      adultSize: 5,
      minTankSize: 20,
      tankSizePerInch: 5,
      description: "Small, bottom-dwelling turtles"
    },
    {
      name: "Map Turtle",
      adultSize: 10,
      minTankSize: 35,
      tankSizePerInch: 8,
      description: "Excellent swimmers with distinctive shell patterns"
    },
    {
      name: "African Sideneck",
      adultSize: 12,
      minTankSize: 40,
      tankSizePerInch: 10,
      description: "Unique neck-folding turtles from Africa"
    },
    {
      name: "Western Painted",
      adultSize: 7,
      minTankSize: 25,
      tankSizePerInch: 7,
      description: "Smaller variety of painted turtle"
    },
    {
      name: "Cooter Turtle",
      adultSize: 14,
      minTankSize: 50,
      tankSizePerInch: 12,
      description: "Larger, river-dwelling turtles"
    },
    {
      name: "Yellow-Bellied Slider",
      adultSize: 11,
      minTankSize: 40,
      tankSizePerInch: 9,
      description: "Similar to Red-Eared Sliders with yellow markings"
    },
    {
      name: "Box Turtle (Aquatic)",
      adultSize: 6,
      minTankSize: 30,
      tankSizePerInch: 6,
      description: "Semi-aquatic turtles that need both land and water"
    },
    {
      name: "Snapping Turtle",
      adultSize: 16,
      minTankSize: 75,
      tankSizePerInch: 15,
      description: "Large, powerful turtles that need significant space"
    },
  ];

  // State
  const [selectedSpecies, setSelectedSpecies] = useState<string>(species[0].name);
  const [currentShellLength, setCurrentShellLength] = useState<number>(4);
  const [numberOfTurtles, setNumberOfTurtles] = useState<number>(1);
  const [currentTankSize, setCurrentTankSize] = useState<number>(20);
  const [includeBaskingArea, setIncludeBaskingArea] = useState<boolean>(true);
  const [result, setResult] = useState<CalculationResult>({
    recommendedTankSize: 0,
    minTankSize: 0,
    currentTankSize: 0,
    isAdequate: false,
    shortfall: 0,
    growthFactor: 0,
    species: "",
  });

  // Get selected species data
  const getSpeciesData = (name: string): TurtleSpecies => {
    return species.find(s => s.name === name) || species[0];
  };

  // Calculate tank size
  const calculateTankSize = () => {
    const speciesData = getSpeciesData(selectedSpecies);
    
    // Base calculation: 10 gallons per inch of shell length (standard rule)
    // But adjust based on species
    const baseGallons = currentShellLength * 10;
    
    // Species-specific adjustment
    const speciesAdjustment = speciesData.tankSizePerInch / 10;
    const adjustedBase = baseGallons * speciesAdjustment;
    
    // Minimum tank size for the species
    const speciesMin = speciesData.minTankSize;
    
    // Calculate recommended size (use the larger of adjusted base or species minimum)
    let recommended = Math.max(adjustedBase, speciesMin);
    
    // Add space for multiple turtles (50% more per additional turtle)
    if (numberOfTurtles > 1) {
      recommended = recommended * (1 + (numberOfTurtles - 1) * 0.5);
    }
    
    // Add space for basking area if needed
    if (includeBaskingArea) {
      recommended = recommended * 1.1;
    }
    
    // Round up to nearest 5 gallons
    recommended = Math.ceil(recommended / 5) * 5;
    
    // Check if current tank is adequate
    const isAdequate = currentTankSize >= recommended;
    const shortfall = isAdequate ? 0 : recommended - currentTankSize;
    
    // Calculate growth factor (how much more space they'll need at adult size)
    const adultSize = speciesData.adultSize;
    const growthFactor = adultSize / currentShellLength;
    
    setResult({
      recommendedTankSize: recommended,
      minTankSize: speciesMin,
      currentTankSize: currentTankSize,
      isAdequate: isAdequate,
      shortfall: shortfall,
      growthFactor: growthFactor,
      species: selectedSpecies,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateTankSize();
  }, [selectedSpecies, currentShellLength, numberOfTurtles, currentTankSize, includeBaskingArea]);

  // Get recommendation text
  const getRecommendationText = () => {
    if (result.isAdequate) {
      return "✅ Your current tank is adequate!";
    } else {
      return `⚠️ Your tank needs to be at least ${result.recommendedTankSize} gallons. You need ${result.shortfall} more gallons.`;
    }
  };

  // Get color based on adequacy
  const getRecommendationColor = () => {
    return result.isAdequate ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🐢 Turtle Tank Size Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Find the perfect tank size for your turtle based on species, size, and number of turtles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Species Selection */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Turtle Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Species
                  </label>
                  <select
                    value={selectedSpecies}
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {species.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} (Adult: {s.adultSize}", Min: {s.minTankSize} gal)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {getSpeciesData(selectedSpecies).description}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Number of Turtles
                  </label>
                  <input
                    type="number"
                    value={numberOfTurtles}
                    onChange={(e) => setNumberOfTurtles(Math.max(1, Number(e.target.value)))}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Size Inputs */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Size & Tank Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Shell Length (inches)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      value={currentShellLength}
                      onChange={(e) => setCurrentShellLength(Number(e.target.value))}
                      min="1"
                      max="20"
                      step="0.5"
                      className="flex-1 accent-blue-600"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[60px]">
                      {currentShellLength}"
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Current Tank Size (gallons)
                  </label>
                  <input
                    type="number"
                    value={currentTankSize}
                    onChange={(e) => setCurrentTankSize(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeBaskingArea}
                    onChange={(e) => setIncludeBaskingArea(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Include space for basking area (adds 10% to tank size)
                  </span>
                </label>
              </div>
            </div>

            {/* Species Information */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Species Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Adult Size</p>
                  <p className="text-lg font-bold text-black dark:text-white">
                    {getSpeciesData(selectedSpecies).adultSize}"
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Minimum Tank Size</p>
                  <p className="text-lg font-bold text-black dark:text-white">
                    {getSpeciesData(selectedSpecies).minTankSize} gal
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Growth Factor</p>
                  <p className="text-lg font-bold text-black dark:text-white">
                    {result.growthFactor.toFixed(1)}x
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result Card */}
            <div className={`rounded-2xl p-6 shadow-sm ${
              result.isAdequate 
                ? 'bg-gradient-to-br from-green-600 to-emerald-600' 
                : 'bg-gradient-to-br from-red-600 to-rose-600'
            } text-white`}>
              <h3 className="text-lg font-semibold mb-4">Recommendation</h3>
              <p className="text-2xl font-bold mb-2">{getRecommendationText()}</p>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="opacity-80">Recommended Tank Size</span>
                  <span className="font-bold">{result.recommendedTankSize} gallons</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="opacity-80">Minimum Tank Size</span>
                  <span className="font-bold">{result.minTankSize} gallons</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Current Tank Size</span>
                  <span className="font-bold">{result.currentTankSize} gallons</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Turtle Species</span>
                  <span className="font-medium text-black dark:text-white">{result.species}</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <span className="text-zinc-600 dark:text-zinc-400">Shell Length</span>
                  <span className="font-medium text-black dark:text-white">{currentShellLength}"</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <span className="text-zinc-600 dark:text-zinc-400">Number of Turtles</span>
                  <span className="font-medium text-black dark:text-white">{numberOfTurtles}</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <span className="text-zinc-600 dark:text-zinc-400">Basking Area</span>
                  <span className="font-medium text-black dark:text-white">
                    {includeBaskingArea ? '✅ Included' : '❌ Not included'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <span className="text-zinc-600 dark:text-zinc-400">Status</span>
                  <span className={`font-bold ${result.isAdequate ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {result.isAdequate ? '✅ Adequate' : '⚠️ Needs Upgrade'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tank Size Guide */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                General Tank Size Guide
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">1-2" Turtle</span>
                  <span className="font-medium text-black dark:text-white">10-20 gallons</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-2">
                  <span className="text-zinc-600 dark:text-zinc-400">3-4" Turtle</span>
                  <span className="font-medium text-black dark:text-white">20-40 gallons</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-2">
                  <span className="text-zinc-600 dark:text-zinc-400">5-6" Turtle</span>
                  <span className="font-medium text-black dark:text-white">40-60 gallons</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-2">
                  <span className="text-zinc-600 dark:text-zinc-400">7-10" Turtle</span>
                  <span className="font-medium text-black dark:text-white">60-100 gallons</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-700 pt-2">
                  <span className="text-zinc-600 dark:text-zinc-400">10-15" Turtle</span>
                  <span className="font-medium text-black dark:text-white">100+ gallons</span>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 Rule of thumb: 10 gallons per inch of shell length for aquatic turtles.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  inputs: {
                    species: selectedSpecies,
                    shellLength: currentShellLength,
                    numberOfTurtles,
                    currentTankSize,
                    includeBaskingArea,
                  },
                  timestamp: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `turtle-tank-calculator-${new Date().toISOString().slice(0,10)}.json`;
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