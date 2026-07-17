"use client";

import { useState, useEffect } from "react";

// Types
interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

interface CalculationResult {
  semesterGPA: number;
  cumulativeGPA: number;
  totalCredits: number;
  totalGradePoints: number;
  targetGPA: number;
  creditsNeeded: number;
  gradeNeeded: string;
}

const gradeScale: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

export default function GPACalculatorClient() {
  // State
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      courses: [
        { id: '1-1', name: 'Course 1', credits: 3, grade: 'A' },
        { id: '1-2', name: 'Course 2', credits: 3, grade: 'B+' },
        { id: '1-3', name: 'Course 3', credits: 4, grade: 'A-' },
      ],
    },
  ]);

  const [targetGPA, setTargetGPA] = useState<number>(3.5);
  const [showTarget, setShowTarget] = useState<boolean>(false);

  // Results
  const [result, setResult] = useState<CalculationResult>({
    semesterGPA: 0,
    cumulativeGPA: 0,
    totalCredits: 0,
    totalGradePoints: 0,
    targetGPA: 3.5,
    creditsNeeded: 0,
    gradeNeeded: '',
  });

  // Calculate GPA for a semester
  const calculateSemesterGPA = (courses: Course[]): { gpa: number; credits: number; gradePoints: number } => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    courses.forEach(course => {
      const gradeValue = gradeScale[course.grade] || 0;
      totalCredits += course.credits;
      totalGradePoints += gradeValue * course.credits;
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    return {
      gpa: Number(gpa.toFixed(2)),
      credits: totalCredits,
      gradePoints: Number(totalGradePoints.toFixed(2)),
    };
  };

  // Calculate all
  const calculateAll = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let semesterGPA = 0;

    // Calculate current semester (last semester)
    const currentSemester = semesters[semesters.length - 1];
    if (currentSemester) {
      const result = calculateSemesterGPA(currentSemester.courses);
      semesterGPA = result.gpa;
      totalCredits = result.credits;
      totalGradePoints = result.gradePoints;
    }

    // Calculate cumulative (all semesters)
    let cumTotalCredits = 0;
    let cumTotalGradePoints = 0;
    semesters.forEach(sem => {
      sem.courses.forEach(course => {
        const gradeValue = gradeScale[course.grade] || 0;
        cumTotalCredits += course.credits;
        cumTotalGradePoints += gradeValue * course.credits;
      });
    });
    const cumulativeGPA = cumTotalCredits > 0 ? cumTotalGradePoints / cumTotalCredits : 0;

    // Calculate credits needed for target GPA
    let creditsNeeded = 0;
    let gradeNeeded = '';
    if (showTarget && targetGPA > cumulativeGPA) {
      // Calculate how many credits at A (4.0) needed to reach target
      const currentTotal = cumTotalGradePoints;
      const currentCredits = cumTotalCredits;
      const targetGradePoints = targetGPA * (currentCredits + 1);
      const gradePointsNeeded = targetGradePoints - currentTotal;
      
      if (gradePointsNeeded > 0) {
        creditsNeeded = Math.ceil(gradePointsNeeded / 4.0);
        gradeNeeded = 'A (4.0)';
      }
    }

    setResult({
      semesterGPA: semesterGPA,
      cumulativeGPA: Number(cumulativeGPA.toFixed(2)),
      totalCredits: cumTotalCredits,
      totalGradePoints: Number(cumTotalGradePoints.toFixed(2)),
      targetGPA: targetGPA,
      creditsNeeded: creditsNeeded,
      gradeNeeded: gradeNeeded,
    });
  };

  useEffect(() => {
    calculateAll();
  }, [semesters, targetGPA, showTarget]);

  // Add semester
  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [
        { id: `${Date.now()}-1`, name: 'Course 1', credits: 3, grade: 'A' },
      ],
    };
    setSemesters([...semesters, newSemester]);
  };

  // Remove semester
  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter(s => s.id !== id));
  };

  // Add course
  const addCourse = (semesterId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        const newCourse: Course = {
          id: `${Date.now()}`,
          name: `Course ${sem.courses.length + 1}`,
          credits: 3,
          grade: 'A',
        };
        return { ...sem, courses: [...sem.courses, newCourse] };
      }
      return sem;
    }));
  };

  // Remove course
  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        if (sem.courses.length <= 1) return sem;
        return { ...sem, courses: sem.courses.filter(c => c.id !== courseId) };
      }
      return sem;
    }));
  };

  // Update course
  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string | number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          courses: sem.courses.map(c => c.id === courseId ? { ...c, [field]: value } : c),
        };
      }
      return sem;
    }));
  };

  // Update semester name
  const updateSemesterName = (id: string, name: string) => {
    setSemesters(semesters.map(sem => sem.id === id ? { ...sem, name } : sem));
  };

  return (
    <>
    <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-6 mb-8 border border-cyan-200 dark:border-cyan-800">
  <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
    📚 What is the GPA Calculator?
  </h2>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    This tool helps students calculate their semester and cumulative GPA, track academic progress, and plan for their goals. Understanding your GPA is essential for academic success.
  </p>
  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
    Add your courses with credits and grades across multiple semesters. The calculator shows semester GPA, cumulative GPA, and what you need to reach your target GPA.
  </p>
  <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mt-2">
    <p className="text-sm font-medium text-black dark:text-white">📋 Example:</p>
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      A student with 14 credits and grades averaging A- achieves a 3.5 GPA. The calculator shows they need 3 more credits at A (4.0) to reach a 3.7 target.
    </p>
  </div>
</div>
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            📚 GPA Calculator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate your semester and cumulative GPA, track your progress, and plan your academic goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Semesters */}
            {semesters.map((semester, index) => (
              <div key={semester.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={semester.name}
                    onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                    className="text-xl font-semibold bg-transparent border-b border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-black dark:text-white"
                  />
                  <button
                    onClick={() => removeSemester(semester.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove semester"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  {semester.courses.map((course) => {
                    const gradeValue = gradeScale[course.grade] || 0;
                    const points = gradeValue * course.credits;
                    return (
                      <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={course.name}
                            onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Course name"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            value={course.credits}
                            onChange={(e) => updateCourse(semester.id, course.id, 'credits', Number(e.target.value))}
                            min="0.5"
                            step="0.5"
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="col-span-3">
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {gradeOptions.map((g) => (
                              <option key={g} value={g}>
                                {g} ({gradeScale[g].toFixed(1)})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-1 text-right text-sm text-zinc-500 dark:text-zinc-400">
                          {points.toFixed(1)}
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            onClick={() => removeCourse(semester.id, course.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                            aria-label="Remove course"
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

                <button
                  onClick={() => addCourse(semester.id)}
                  className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  + Add Course
                </button>

                {/* Semester Summary */}
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Semester GPA</span>
                  <span className="font-bold text-black dark:text-white">
                    {calculateSemesterGPA(semester.courses).gpa.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={addSemester}
              className="w-full py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
            >
              + Add Semester
            </button>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Results */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Your GPA</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80">Cumulative GPA</p>
                  <p className="text-5xl font-bold">{result.cumulativeGPA.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-80">Semester GPA</p>
                    <p className="text-2xl font-bold">{result.semesterGPA.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Total Credits</p>
                    <p className="text-2xl font-bold">{result.totalCredits}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grade Scale Reference */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Grade Scale
              </h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(gradeScale).map(([grade, value]) => (
                  <div key={grade} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                    <span className="font-medium text-black dark:text-white">{grade}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target GPA */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Target GPA
                </h3>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showTarget}
                    onChange={(e) => setShowTarget(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                  />
                  <span className="text-zinc-600 dark:text-zinc-400">Show</span>
                </label>
              </div>
              {showTarget && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Desired GPA
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        value={targetGPA}
                        onChange={(e) => setTargetGPA(Number(e.target.value))}
                        min="1.0"
                        max="4.0"
                        step="0.1"
                        className="flex-1 accent-blue-600"
                      />
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400 min-w-[50px]">
                        {targetGPA.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {result.creditsNeeded > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        Need <strong>{result.creditsNeeded}</strong> credit(s) at <strong>{result.gradeNeeded}</strong> to reach target GPA.
                      </p>
                    </div>
                  )}
                  {result.cumulativeGPA >= targetGPA && targetGPA > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        ✅ You've reached your target GPA!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  result,
                  semesters,
                  targetGPA,
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `gpa-calculator-${new Date().toISOString().slice(0,10)}.json`;
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
    </>
  );
}