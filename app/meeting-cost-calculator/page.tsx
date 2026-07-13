"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Meeting Cost Calculator | Calculate the True Cost of Meetings',
  description: 'Calculate the true cost of your meetings including salaries, benefits, and overhead. Save money and improve productivity.',
  keywords: 'meeting cost calculator, cost of meetings, business productivity, meeting efficiency, employee costs',
  openGraph: {
    title: 'Meeting Cost Calculator | Calculate the True Cost of Meetings',
    description: 'Calculate the true cost of your meetings including salaries, benefits, and overhead.',
    url: 'https://calplanners.online/meeting-cost-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/meeting-cost-calculator',
  },
};

// Types
interface Participant {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  isAttending: boolean;
}

interface MeetingResult {
  totalCost: number;
  costPerMinute: number;
  totalHours: number;
  participantCosts: {
    name: string;
    cost: number;
  }[];
  averageHourlyRate: number;
  totalParticipants: number;
}

export default function MeetingCostCalculator() {
  // Participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "CEO", role: "Executive", hourlyRate: 150, isAttending: true },
    { id: "2", name: "Project Manager", role: "Management", hourlyRate: 85, isAttending: true },
    { id: "3", name: "Lead Developer", role: "Technical", hourlyRate: 75, isAttending: true },
    { id: "4", name: "Designer", role: "Creative", hourlyRate: 65, isAttending: true },
    { id: "5", name: "Marketing Specialist", role: "Marketing", hourlyRate: 60, isAttending: true },
  ]);

  // Meeting details
  const [meetingDuration, setMeetingDuration] = useState<number>(60); // minutes
  const [prepTime, setPrepTime] = useState<number>(15); // minutes per participant
  const [followUpTime, setFollowUpTime] = useState<number>(10); // minutes per participant
  const [includeBenefits, setIncludeBenefits] = useState<boolean>(true);
  const [benefitMultiplier, setBenefitMultiplier] = useState<number>(1.3);
  const [includeOverhead, setIncludeOverhead] = useState<boolean>(true);
  const [overheadPercentage, setOverheadPercentage] = useState<number>(20);

  // Results
  const [result, setResult] = useState<MeetingResult>({
    totalCost: 0,
    costPerMinute: 0,
    totalHours: 0,
    participantCosts: [],
    averageHourlyRate: 0,
    totalParticipants: 0,
  });

  // Add participant
  const addParticipant = () => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: "New Participant",
      role: "Other",
      hourlyRate: 50,
      isAttending: true,
    };
    setParticipants([...participants, newParticipant]);
  };

  // Remove participant
  const removeParticipant = (id: string) => {
    if (participants.length <= 1) return;
    setParticipants(participants.filter(p => p.id !== id));
  };

  // Update participant
  const updateParticipant = (id: string, field: keyof Participant, value: string | number | boolean) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // Calculate meeting cost
  const calculateCost = () => {
    const attendingParticipants = participants.filter(p => p.isAttending);
    const totalParticipants = attendingParticipants.length;

    if (totalParticipants === 0) {
      setResult({
        totalCost: 0,
        costPerMinute: 0,
        totalHours: 0,
        participantCosts: [],
        averageHourlyRate: 0,
        totalParticipants: 0,
      });
      return;
    }

    // Calculate total hours including prep and follow-up
    const totalMinutes = meetingDuration + (prepTime * totalParticipants) + (followUpTime * totalParticipants);
    const totalHours = totalMinutes / 60;

    // Calculate average hourly rate
    const totalHourlyRates = attendingParticipants.reduce((sum, p) => sum + p.hourlyRate, 0);
    const averageHourlyRate = totalHourlyRates / totalParticipants;

    // Apply benefit multiplier if enabled
    const effectiveRate = includeBenefits ? averageHourlyRate * benefitMultiplier : averageHourlyRate;

    // Apply overhead if enabled
    const overheadMultiplier = includeOverhead ? 1 + (overheadPercentage / 100) : 1;
    const finalRate = effectiveRate * overheadMultiplier;

    // Calculate total cost
    const totalCost = finalRate * totalHours;

    // Calculate cost per participant
    const participantCosts = attendingParticipants.map(p => {
      const participantRate = includeBenefits ? p.hourlyRate * benefitMultiplier : p.hourlyRate;
      const finalParticipantRate = includeOverhead ? participantRate * overheadMultiplier : participantRate;
      const cost = finalParticipantRate * (totalMinutes / 60);
      return {
        name: p.name,
        cost: Number(cost.toFixed(2)),
      };
    });

    // Cost per minute
    const costPerMinute = totalCost / meetingDuration;

    setResult({
      totalCost: Number(totalCost.toFixed(2)),
      costPerMinute: Number(costPerMinute.toFixed(2)),
      totalHours: Number(totalHours.toFixed(2)),
      participantCosts: participantCosts,
      averageHourlyRate: Number(averageHourlyRate.toFixed(2)),
      totalParticipants: totalParticipants,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateCost();
  }, [participants, meetingDuration, prepTime, followUpTime, includeBenefits, benefitMultiplier, includeOverhead, overheadPercentage]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            💰 Meeting Cost Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate the true cost of your meetings including salaries, benefits, and overhead
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Meeting Settings */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Meeting Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Meeting Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={meetingDuration}
                    onChange={(e) => setMeetingDuration(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Prep Time (minutes/person)
                  </label>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Math.max(0, Number(e.target.value)))}
                    min="0"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Follow-up Time (minutes/person)
                  </label>
                  <input
                    type="number"
                    value={followUpTime}
                    onChange={(e) => setFollowUpTime(Math.max(0, Number(e.target.value)))}
                    min="0"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Benefit Multiplier
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      value={benefitMultiplier}
                      onChange={(e) => setBenefitMultiplier(Number(e.target.value))}
                      min="1"
                      max="2"
                      step="0.05"
                      disabled={!includeBenefits}
                      className={`flex-1 accent-blue-600 ${!includeBenefits && "opacity-50 cursor-not-allowed"}`}
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[50px]">
                      {benefitMultiplier.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeBenefits}
                    onChange={(e) => setIncludeBenefits(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Include benefits (health insurance, 401k, etc.)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeOverhead}
                    onChange={(e) => setIncludeOverhead(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Include overhead costs (office space, utilities, etc.)
                  </span>
                </label>
                {includeOverhead && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Overhead Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={overheadPercentage}
                      onChange={(e) => setOverheadPercentage(Math.max(0, Number(e.target.value)))}
                      min="0"
                      max="100"
                      className="w-full max-w-[200px] px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Participants
                </h2>
                <button
                  onClick={addParticipant}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  + Add Participant
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Role</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Hourly Rate ($)</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Attending</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant) => (
                      <tr key={participant.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={participant.name}
                            onChange={(e) => updateParticipant(participant.id, "name", e.target.value)}
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                            placeholder="Name"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={participant.role}
                            onChange={(e) => updateParticipant(participant.id, "role", e.target.value)}
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                            placeholder="Role"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={participant.hourlyRate}
                            onChange={(e) => updateParticipant(participant.id, "hourlyRate", Number(e.target.value))}
                            min="0"
                            step="1"
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <input
                            type="checkbox"
                            checked={participant.isAttending}
                            onChange={(e) => updateParticipant(participant.id, "isAttending", e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            onClick={() => removeParticipant(participant.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove participant"
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
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Meeting Cost</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Total Cost</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.totalCost)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">Cost per Minute</p>
                    <p className="text-2xl font-bold">{formatCurrency(result.costPerMinute)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Total Hours</p>
                    <p className="text-2xl font-bold">{result.totalHours}h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Participant Breakdown */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Participant Breakdown
              </h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {result.participantCosts.map((pc, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 py-2">
                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">{pc.name}</span>
                    <span className="font-medium text-black dark:text-white">{formatCurrency(pc.cost)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-bold">
                <span className="text-black dark:text-white">Total</span>
                <span className="text-black dark:text-white">{formatCurrency(result.totalCost)}</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Participants</span>
                  <span className="font-bold text-black dark:text-white">{result.totalParticipants}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Average Hourly Rate</span>
                  <span className="font-bold text-black dark:text-white">{formatCurrency(result.averageHourlyRate)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Includes Benefits</span>
                  <span className="font-bold text-black dark:text-white">{includeBenefits ? "✅ Yes" : "❌ No"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Includes Overhead</span>
                  <span className="font-bold text-black dark:text-white">{includeOverhead ? "✅ Yes" : "❌ No"}</span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  settings: {
                    meetingDuration,
                    prepTime,
                    followUpTime,
                    includeBenefits,
                    benefitMultiplier,
                    includeOverhead,
                    overheadPercentage,
                  },
                  participants: participants.filter(p => p.isAttending),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `meeting-cost-${new Date().toISOString().slice(0,10)}.json`;
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