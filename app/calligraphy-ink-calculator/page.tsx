"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calligraphy Ink Cost Estimator | Track Your Ink Expenses',
  description: 'Estimate ink costs, track project expenses, and optimize your calligraphy supplies. Free tool for calligraphers and artists.',
  keywords: 'calligraphy ink cost, ink calculator, art supply costs, calligraphy tools, ink tracking',
  openGraph: {
    title: 'Calligraphy Ink Cost Estimator | Track Your Ink Expenses',
    description: 'Estimate ink costs, track project expenses, and optimize your calligraphy supplies.',
    url: 'https://calplanners.online/calligraphy-ink-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/calligraphy-ink-calculator',
  },
};

// Types
interface InkItem {
  id: string;
  name: string;
  cost: number;
  volume: number; // in ml
  color: string;
  type: "ink" | "gouache" | "watercolor" | "sumi" | "other";
  usagePerProject: number; // in ml
}

interface Project {
  id: string;
  name: string;
  inkId: string;
  inkName: string;
  projectCost: number;
}

interface CalculationResult {
  totalCost: number;
  costPerMl: number;
  projects: Project[];
  totalProjects: number;
  totalInkUsed: number;
  mostUsedInk: string;
}

export default function CalligraphyInkCalculator() {
  // Ink items
  const [inks, setInks] = useState<InkItem[]>([
    { id: "1", name: "Sumi Ink", cost: 12.99, volume: 60, color: "Black", type: "sumi", usagePerProject: 2 },
    { id: "2", name: "Winsor & Newton Ink", cost: 15.99, volume: 30, color: "Black", type: "ink", usagePerProject: 1.5 },
    { id: "3", name: "Pilot Iroshizuku", cost: 22.50, volume: 50, color: "Blue", type: "ink", usagePerProject: 2 },
    { id: "4", name: "Dr. Ph. Martin's", cost: 14.99, volume: 30, color: "White", type: "ink", usagePerProject: 1 },
    { id: "5", name: "Gouache Set", cost: 35.00, volume: 120, color: "Assorted", type: "gouache", usagePerProject: 3 },
  ]);

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);

  // State for new project
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectInkId, setNewProjectInkId] = useState<string>(inks[0]?.id || "");
  const [newProjectUsage, setNewProjectUsage] = useState<number>(2);

  // Results
  const [result, setResult] = useState<CalculationResult>({
    totalCost: 0,
    costPerMl: 0,
    projects: [],
    totalProjects: 0,
    totalInkUsed: 0,
    mostUsedInk: "",
  });

  // Add project
  const addProject = () => {
    if (!newProjectName.trim()) return;
    const ink = inks.find(i => i.id === newProjectInkId);
    if (!ink) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      inkId: ink.id,
      inkName: ink.name,
      projectCost: (ink.cost / ink.volume) * newProjectUsage,
    };

    setProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectUsage(2);
  };

  // Remove project
  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Add ink
  const addInk = () => {
    const newInk: InkItem = {
      id: Date.now().toString(),
      name: "New Ink",
      cost: 15.00,
      volume: 50,
      color: "Black",
      type: "ink",
      usagePerProject: 2,
    };
    setInks([...inks, newInk]);
  };

  // Update ink
  const updateInk = (id: string, field: keyof InkItem, value: string | number) => {
    setInks(inks.map(ink => 
      ink.id === id ? { ...ink, [field]: value } : ink
    ));
  };

  // Remove ink
  const removeInk = (id: string) => {
    if (inks.length <= 1) return;
    setInks(inks.filter(ink => ink.id !== id));
  };

  // Calculate results
  const calculateResults = () => {
    if (projects.length === 0) {
      setResult({
        totalCost: 0,
        costPerMl: 0,
        projects: [],
        totalProjects: 0,
        totalInkUsed: 0,
        mostUsedInk: "",
      });
      return;
    }

    // Calculate total cost
    const totalCost = projects.reduce((sum, p) => sum + p.projectCost, 0);
    
    // Calculate total ink used
    const totalInkUsed = projects.reduce((sum, p) => {
      const ink = inks.find(i => i.id === p.inkId);
      return sum + (ink ? p.projectCost / (ink.cost / ink.volume) : 0);
    }, 0);

    // Find most used ink
    const inkUsage: { [key: string]: number } = {};
    projects.forEach(p => {
      inkUsage[p.inkId] = (inkUsage[p.inkId] || 0) + 1;
    });
    const mostUsedId = Object.keys(inkUsage).reduce((a, b) => 
      inkUsage[a] > inkUsage[b] ? a : b
    );
    const mostUsedInk = inks.find(i => i.id === mostUsedId)?.name || "Unknown";

    // Calculate average cost per ml
    const avgCostPerMl = totalCost / totalInkUsed;

    setResult({
      totalCost: Number(totalCost.toFixed(2)),
      costPerMl: Number(avgCostPerMl.toFixed(3)),
      projects: projects,
      totalProjects: projects.length,
      totalInkUsed: Number(totalInkUsed.toFixed(2)),
      mostUsedInk: mostUsedInk,
    });
  };

  // Auto-calculate on changes
  useEffect(() => {
    calculateResults();
  }, [inks, projects]);

  const inkTypes = [
    { value: "ink", label: "Ink" },
    { value: "gouache", label: "Gouache" },
    { value: "watercolor", label: "Watercolor" },
    { value: "sumi", label: "Sumi" },
    { value: "other", label: "Other" },
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case "ink": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "gouache": return "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300";
      case "watercolor": return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300";
      case "sumi": return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            ✒️ Calligraphy Ink Cost Estimator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Track your ink costs, calculate project expenses, and optimize your calligraphy supplies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Inks Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Your Inks
                </h2>
                <button
                  onClick={addInk}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  + Add Ink
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ink Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Type</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Cost ($)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Volume (ml)</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">$/ml</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inks.map((ink) => (
                      <tr key={ink.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={ink.name}
                            onChange={(e) => updateInk(ink.id, "name", e.target.value)}
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                            placeholder="Ink name"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={ink.type}
                            onChange={(e) => updateInk(ink.id, "type", e.target.value)}
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-1 focus:ring-blue-500"
                          >
                            {inkTypes.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={ink.cost}
                            onChange={(e) => updateInk(ink.id, "cost", Number(e.target.value))}
                            min="0"
                            step="0.01"
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={ink.volume}
                            onChange={(e) => updateInk(ink.id, "volume", Number(e.target.value))}
                            min="1"
                            step="1"
                            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-right focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-2 text-right text-sm font-medium text-black dark:text-white">
                          ${(ink.cost / ink.volume).toFixed(3)}
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            onClick={() => removeInk(ink.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove ink"
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

            {/* Projects Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Add Project
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Project name"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={newProjectInkId}
                    onChange={(e) => setNewProjectInkId(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {inks.map((ink) => (
                      <option key={ink.id} value={ink.id}>
                        {ink.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="number"
                    value={newProjectUsage}
                    onChange={(e) => setNewProjectUsage(Number(e.target.value))}
                    min="0.1"
                    step="0.1"
                    placeholder="Usage (ml)"
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={addProject}
                className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Project
              </button>

              {/* Projects List */}
              {projects.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                    Your Projects ({projects.length})
                  </h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {projects.map((project) => {
                      const ink = inks.find(i => i.id === project.inkId);
                      return (
                        <div key={project.id} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
                          <div>
                            <span className="font-medium text-black dark:text-white">{project.name}</span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                              ({project.inkName})
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-black dark:text-white">
                              ${project.projectCost.toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeProject(project.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-80">Total Project Cost</p>
                  <p className="text-3xl font-bold">${result.totalCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Average Cost per ml</p>
                  <p className="text-2xl font-bold">${result.costPerMl.toFixed(3)}/ml</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Total Ink Used</p>
                  <p className="text-2xl font-bold">{result.totalInkUsed} ml</p>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Projects</span>
                  <span className="font-bold text-black dark:text-white">{result.totalProjects}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Most Used Ink</span>
                  <span className="font-bold text-black dark:text-white">{result.mostUsedInk}</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                  <span className="text-zinc-600 dark:text-zinc-400">Inks Available</span>
                  <span className="font-bold text-black dark:text-white">{inks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Average Cost per Project</span>
                  <span className="font-bold text-black dark:text-white">
                    ${result.totalProjects > 0 ? (result.totalCost / result.totalProjects).toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                💡 Ink Savings Tips
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">•</span>
                  Buy larger volumes for frequent use inks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">•</span>
                  Track your usage to identify waste
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">•</span>
                  Use ink sparingly to extend supply
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">•</span>
                  Consider mixing colors to reduce variety
                </li>
              </ul>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  inks,
                  projects,
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `calligraphy-ink-estimator-${new Date().toISOString().slice(0,10)}.json`;
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