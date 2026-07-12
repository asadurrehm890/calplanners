"use client";

import { useState, useEffect } from "react";

// Types
interface TimelineResult {
  totalWeeks: number;
  totalMonths: number;
  totalDays: number;
  weeklyLoss: number;
  monthlyLoss: number;
  milestones: {
    week: number;
    date: string;
    weight: number;
    loss: number;
  }[];
  goalDate: string;
  recommendedCalories: number;
  exerciseMinutes: number;
}

export default function WeightLossTimeline() {
  // User inputs
  const [currentWeight, setCurrentWeight] = useState<number>(180);
  const [goalWeight, setGoalWeight] = useState<number>(150);
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1.5);
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [gender, setGender] = useState<string>("female");
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(65); // inches

  // Results
  const [result, setResult] = useState<TimelineResult>({
    totalWeeks: 0,
    totalMonths: 0,
    totalDays: 0,
    weeklyLoss: 0,
    monthlyLoss: 0,
    milestones: [],
    goalDate: "",
    recommendedCalories: 0,
    exerciseMinutes: 0,
  });

  // Calculate BMR
  const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
    // Convert weight to kg if needed
    const weightKg = weightUnit === "lb" ? weight * 0.453592 : weight;
    
    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * height - 5 * age - 161;
    }
    return bmr;
  };

  // Get activity multiplier
  const getActivityMultiplier = (level: string): number => {
    const multipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very: 1.9,
    };
    return multipliers[level] || 1.55;
  };

  // Calculate timeline
  const calculateTimeline = () => {
    // Convert weights to kg if needed
    const currentKg = weightUnit === "lb" ? currentWeight * 0.453592 : currentWeight;
    const goalKg = weightUnit === "lb" ? goalWeight * 0.453592 : goalWeight;
    const totalKgToLose = currentKg - goalKg;
    
    // Convert weekly goal to kg
    const weeklyKgLoss = weightUnit === "lb" ? weeklyGoal * 0.453592 : weeklyGoal;
    
    // Calculate total weeks
    const totalWeeks = totalKgToLose / weeklyKgLoss;
    const totalDays = Math.ceil(totalWeeks * 7);
    const totalMonths = totalDays / 30.44;

    // Calculate weight loss per week in user's unit
    const weeklyLoss = weeklyGoal;
    const monthlyLoss = weeklyGoal * 4.345;

    // Calculate BMR and TDEE
    const bmr = calculateBMR(currentWeight, height, age, gender);
    const activityMultiplier = getActivityMultiplier(activityLevel);
    const tdee = bmr * activityMultiplier;
    
    // Calculate recommended daily calories for weight loss
    const dailyCalorieDeficit = (weeklyGoal * 3500) / 7; // 3500 calories per lb
    const recommendedCalories = Math.max(1200, tdee - dailyCalorieDeficit);

    // Calculate recommended exercise minutes
    const exerciseMinutes = Math.round((dailyCalorieDeficit / 5) / 60 * 60);

    // Generate milestones (every 5% of the way)
    const milestones = [];
    const numMilestones = 10;
    const step = 100 / numMilestones;
    
    for (let i = 1; i <= numMilestones; i++) {
      const percent = i * step;
      const lossSoFar = totalKgToLose * (percent / 100);
      const currentWeightAtMilestone = currentKg - lossSoFar;
      const weekAtMilestone = i * (totalWeeks / numMilestones);
      
      // Calculate date
      const date = new Date();
      date.setDate(date.getDate() + Math.round(weekAtMilestone * 7));
      
      milestones.push({
        week: Math.round(weekAtMilestone * 10) / 10,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        weight: Number((weightUnit === "lb" ? currentWeightAtMilestone / 0.453592 : currentWeightAtMilestone).toFixed(1)),
        loss: Number((weightUnit === "lb" ? lossSoFar / 0.453592 : lossSoFar).toFixed(1)),
      });
    }

    // Calculate goal date
    const goalDate = new Date();
    goalDate.setDate(goalDate.getDate() + totalDays);

    setResult({
      totalWeeks: Number(totalWeeks.toFixed(1)),
      totalMonths: Number(totalMonths.toFixed(1)),
      totalDays: totalDays,
      weeklyLoss: Number(weeklyLoss.toFixed(1)),
      monthlyLoss: Number(monthlyLoss.toFixed(1)),
      milestones: milestones,
      goalDate: goalDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      recommendedCalories: Math.round(recommendedCalories),
      exerciseMinutes: exerciseMinutes,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateTimeline();
  }, [currentWeight, goalWeight, weightUnit, weeklyGoal, activityLevel, gender, age, height]);

  const getProgressColor = (weeks: number, totalWeeks: number) => {
    const progress = (weeks / totalWeeks) * 100;
    if (progress < 25) return "bg-blue-500";
    if (progress < 50) return "bg-green-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            🎯 Weight Loss Timeline Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Plan your weight loss journey with a realistic timeline based on your goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Weight Info */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Weight Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Current Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(Math.max(1, Number(e.target.value)))}
                      min="1"
                      className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="flex items-center text-zinc-600 dark:text-zinc-400 font-medium">
                      {weightUnit}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Goal Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goalWeight}
                      onChange={(e) => setGoalWeight(Math.max(1, Number(e.target.value)))}
                      min="1"
                      className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="flex items-center text-zinc-600 dark:text-zinc-400 font-medium">
                      {weightUnit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Weight Unit
                </label>
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as "lb" | "kg")}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="lb">Pounds (lb)</option>
                  <option value="kg">Kilograms (kg)</option>
                </select>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
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
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Height (inches)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Weight Loss Settings */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Weight Loss Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Weekly Weight Loss Goal
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      value={weeklyGoal}
                      onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                      min="0.5"
                      max="3"
                      step="0.25"
                      className="flex-1 accent-blue-600"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[60px]">
                      {weeklyGoal.toFixed(1)} {weightUnit}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Safe range: 0.5-2 {weightUnit} per week
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="active">Very Active</option>
                    <option value="very">Extremely Active</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your Timeline</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Time to Reach Goal</p>
                  <p className="text-4xl font-bold">{result.totalWeeks} weeks</p>
                  <p className="text-sm opacity-80 mt-1">
                    ({result.totalMonths} months · {result.totalDays} days)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-80">Weekly Loss</p>
                    <p className="text-2xl font-bold">{result.weeklyLoss} {weightUnit}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Monthly Loss</p>
                    <p className="text-2xl font-bold">{result.monthlyLoss} {weightUnit}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Date */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Target Date
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {result.goalDate}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Based on consistent {weeklyGoal.toFixed(1)} {weightUnit} loss per week
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Recommendations
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Daily Calories</span>
                  <span className="font-bold text-black dark:text-white">
                    {result.recommendedCalories} kcal
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Exercise Minutes</span>
                  <span className="font-bold text-black dark:text-white">
                    {result.exerciseMinutes} min/day
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Weight to Lose</span>
                  <span className="font-bold text-black dark:text-white">
                    {Math.abs(currentWeight - goalWeight)} {weightUnit}
                  </span>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Milestones
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {result.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${getProgressColor(milestone.week, result.totalWeeks)}`}></div>
                    <span className="text-zinc-600 dark:text-zinc-400 min-w-[80px]">
                      Week {milestone.week}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400 flex-1">
                      {milestone.date}
                    </span>
                    <span className="font-medium text-black dark:text-white">
                      {milestone.weight} {weightUnit}
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      -{milestone.loss} {weightUnit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  inputs: {
                    currentWeight,
                    goalWeight,
                    weightUnit,
                    weeklyGoal,
                    activityLevel,
                    gender,
                    age,
                    height,
                  },
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `weight-loss-timeline-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-600 transition-colors font-medium"
            >
              📥 Export Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}