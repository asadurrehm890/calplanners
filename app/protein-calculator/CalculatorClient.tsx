"use client";

import { useState, useEffect } from "react";


// Types
interface ActivityLevel {
  value: string;
  label: string;
  multiplier: number;
  description: string;
}

interface Goal {
  value: string;
  label: string;
  multiplier: number;
  description: string;
}

interface Result {
  dailyProtein: number;
  proteinPerMeal: number;
  weeklyProtein: number;
  proteinPerKg: number;
  proteinPerLb: number;
  caloriesFromProtein: number;
  recommendation: string;
  mealPlan: string[];
}

export default function ProteinCalculator() {
  // User inputs
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [includePlantBased, setIncludePlantBased] = useState<boolean>(false);

  // Results
  const [result, setResult] = useState<Result>({
    dailyProtein: 0,
    proteinPerMeal: 0,
    weeklyProtein: 0,
    proteinPerKg: 0,
    proteinPerLb: 0,
    caloriesFromProtein: 0,
    recommendation: "",
    mealPlan: [],
  });

  // Activity levels
  const activityLevels: ActivityLevel[] = [
    { value: "sedentary", label: "Sedentary", multiplier: 0.8, description: "Little or no exercise" },
    { value: "light", label: "Lightly Active", multiplier: 1.0, description: "Light exercise 1-3 days/week" },
    { value: "moderate", label: "Moderately Active", multiplier: 1.2, description: "Moderate exercise 3-5 days/week" },
    { value: "active", label: "Very Active", multiplier: 1.4, description: "Hard exercise 6-7 days/week" },
    { value: "extremely", label: "Extremely Active", multiplier: 1.6, description: "Very hard exercise & physical job" },
  ];

  // Goals
  const goals: Goal[] = [
    { value: "maintain", label: "Maintain Weight", multiplier: 1.0, description: "Maintain current weight" },
    { value: "lose", label: "Lose Weight", multiplier: 1.2, description: "Slight calorie deficit" },
    { value: "gain", label: "Gain Muscle", multiplier: 1.6, description: "Calorie surplus for muscle growth" },
    { value: "athlete", label: "Athlete/Recovery", multiplier: 1.8, description: "High performance & recovery" },
  ];

  // Calculate protein needs
  const calculateProtein = () => {
    // Convert weight to kg if needed
    const weightKg = weightUnit === "lb" ? weight * 0.453592 : weight;

    // Get activity multiplier
    const activity = activityLevels.find(a => a.value === activityLevel) || activityLevels[2];
    const goalObj = goals.find(g => g.value === goal) || goals[0];

    // Base protein (g/kg)
    let baseProtein = 0.8; // Minimum for sedentary adults

    // Adjust based on activity
    baseProtein = baseProtein * activity.multiplier;

    // Adjust based on goal
    baseProtein = baseProtein * goalObj.multiplier;

    // Age adjustment (older adults need more protein)
    if (age > 65) {
      baseProtein = baseProtein * 1.2;
    } else if (age > 50) {
      baseProtein = baseProtein * 1.1;
    }

    // Plant-based adjustment (slightly higher due to lower bioavailability)
    if (includePlantBased) {
      baseProtein = baseProtein * 1.1;
    }

    // Calculate daily protein in grams
    const dailyProtein = Number((weightKg * baseProtein).toFixed(1));

    // Calculate per meal
    const proteinPerMeal = Number((dailyProtein / mealsPerDay).toFixed(1));

    // Weekly total
    const weeklyProtein = Number((dailyProtein * 7).toFixed(1));

    // Per kg and per lb
    const proteinPerKg = Number((dailyProtein / weightKg).toFixed(2));
    const proteinPerLb = Number((dailyProtein / (weightKg * 2.20462)).toFixed(2));

    // Calories from protein (4 calories per gram)
    const caloriesFromProtein = Number((dailyProtein * 4).toFixed(0));

    // Generate recommendation
    let recommendation = "";
    if (dailyProtein < 50) {
      recommendation = "⚠️ Your protein intake appears low. Consider increasing protein-rich foods in your diet.";
    } else if (dailyProtein < 80) {
      recommendation = "✅ Your protein intake is adequate for general health and maintenance.";
    } else if (dailyProtein < 120) {
      recommendation = "💪 Great protein intake for active individuals and muscle maintenance.";
    } else {
      recommendation = "🏋️ High protein intake suitable for athletes, bodybuilders, or muscle gain goals.";
    }

    // Generate meal plan suggestions
    const mealPlan = generateMealPlan(dailyProtein, mealsPerDay, includePlantBased);

    setResult({
      dailyProtein,
      proteinPerMeal,
      weeklyProtein,
      proteinPerKg,
      proteinPerLb,
      caloriesFromProtein,
      recommendation,
      mealPlan,
    });
  };

  // Generate meal plan suggestions
  const generateMealPlan = (dailyProtein: number, meals: number, plantBased: boolean): string[] => {
    const proteinPerMeal = dailyProtein / meals;
    const plan: string[] = [];

    const proteinSources = plantBased
      ? [
          { name: "Tofu", protein: 20, serving: "100g" },
          { name: "Lentils", protein: 18, serving: "1 cup cooked" },
          { name: "Chickpeas", protein: 15, serving: "1 cup cooked" },
          { name: "Quinoa", protein: 8, serving: "1 cup cooked" },
          { name: "Seitan", protein: 25, serving: "100g" },
          { name: "Tempeh", protein: 20, serving: "100g" },
          { name: "Edamame", protein: 17, serving: "1 cup" },
          { name: "Nuts & Seeds", protein: 6, serving: "1/4 cup" },
        ]
      : [
          { name: "Chicken Breast", protein: 31, serving: "100g" },
          { name: "Fish (Salmon)", protein: 25, serving: "100g" },
          { name: "Eggs", protein: 6, serving: "1 large egg" },
          { name: "Greek Yogurt", protein: 20, serving: "200g" },
          { name: "Beef (Lean)", protein: 26, serving: "100g" },
          { name: "Tuna", protein: 30, serving: "100g" },
          { name: "Cottage Cheese", protein: 11, serving: "100g" },
          { name: "Protein Powder", protein: 25, serving: "1 scoop" },
        ];

    // Sort by protein content
    proteinSources.sort((a, b) => b.protein - a.protein);

    for (let i = 0; i < Math.min(meals, 5); i++) {
      const targetProtein = proteinPerMeal;
      const source = proteinSources[i % proteinSources.length];
      const servings = Math.ceil(targetProtein / source.protein);
      plan.push(`Meal ${i + 1}: ${servings} serving(s) of ${source.name} (~${(servings * source.protein).toFixed(0)}g protein)`);
    }

    return plan;
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateProtein();
  }, [weight, weightUnit, age, activityLevel, goal, mealsPerDay, includePlantBased]);

  const getRecommendationColor = (protein: number) => {
    if (protein < 50) return "text-red-600 dark:text-red-400";
    if (protein < 80) return "text-yellow-600 dark:text-yellow-400";
    if (protein < 120) return "text-blue-600 dark:text-blue-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <>
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
  <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
    💪 What is the Protein Intake Calculator?
  </h2>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    This tool helps you calculate your optimal daily protein intake based on your weight, activity level, and fitness goals. Protein is essential for muscle building, weight management, and overall health.
  </p>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    Enter your weight, age, activity level, and goal (maintain, lose, gain, athlete). The calculator provides daily protein needs, per-meal distribution, and meal suggestions.
  </p>
  <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mt-2">
    <p className="text-sm font-medium text-black dark:text-white">📋 Example:</p>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      A 180lb moderately active person wanting to build muscle needs 147g of protein daily, approximately 49g per meal across 3 meals.
    </p>
  </div>
</div>
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            💪 Protein Intake Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate your daily protein needs based on weight, activity level, and fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                      min="1"
                      className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as "kg" | "lb")}
                      className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
                    min="1"
                    max="120"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Activity & Goals */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Activity & Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {activityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Fitness Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {goals.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label} - {g.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Meals Per Day
                  </label>
                  <input
                    type="number"
                    value={mealsPerDay}
                    onChange={(e) => setMealsPerDay(Math.max(1, Math.min(6, Number(e.target.value))))}
                    min="1"
                    max="6"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      checked={includePlantBased}
                      onChange={(e) => setIncludePlantBased(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      Plant-based diet
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Diet Recommendations */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Protein Sources
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {includePlantBased ? (
                  <>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🥜</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Tofu</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">20g/100g</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🍲</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Lentils</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">18g/cup</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🌾</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Quinoa</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">8g/cup</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🌰</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Chickpeas</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">15g/cup</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🍗</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Chicken</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">31g/100g</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🐟</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Salmon</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">25g/100g</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🥚</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Eggs</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">6g/egg</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
                      <span className="text-2xl">🥛</span>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Greek Yogurt</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">20g/200g</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your Daily Protein Needs</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Recommended Daily Intake</p>
                  <p className="text-5xl font-bold">{result.dailyProtein}g</p>
                  <p className="text-sm opacity-80 mt-1">{result.caloriesFromProtein} calories from protein</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-80">Per Meal</p>
                    <p className="text-2xl font-bold">{result.proteinPerMeal}g</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Weekly Total</p>
                    <p className="text-2xl font-bold">{result.weeklyProtein}g</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Detailed Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Per kg body weight</span>
                  <span className="font-bold text-black dark:text-white">{result.proteinPerKg}g/kg</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Per lb body weight</span>
                  <span className="font-bold text-black dark:text-white">{result.proteinPerLb}g/lb</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Meals per day</span>
                  <span className="font-bold text-black dark:text-white">{mealsPerDay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Diet type</span>
                  <span className="font-bold text-black dark:text-white">
                    {includePlantBased ? "🌱 Plant-based" : "🍖 Omnivore"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Recommendation
              </h3>
              <p className={`text-base font-medium ${getRecommendationColor(result.dailyProtein)}`}>
                {result.recommendation}
              </p>
            </div>

            {/* Meal Plan Suggestion */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Sample Meal Plan
              </h3>
              <ul className="space-y-2 text-sm">
                {result.mealPlan.map((meal, index) => (
                  <li key={index} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    {meal}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
                Based on {mealsPerDay} meals per day, {includePlantBased ? "plant-based" : "omnivore"} options
              </p>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  inputs: {
                    weight,
                    weightUnit,
                    age,
                    activityLevel,
                    goal,
                    mealsPerDay,
                    includePlantBased,
                  },
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `protein-calculator-${new Date().toISOString().slice(0,10)}.json`;
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
    </>
  );
}