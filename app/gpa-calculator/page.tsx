import type { Metadata } from "next";
import GPACalculatorClient from "./GPACalculatorClient";

export const metadata: Metadata = {
  title: 'GPA Calculator | Calculate Your Grade Point Average',
  description: 'Calculate your cumulative GPA, semester GPA, and track your academic progress. Free tool for students to plan their grades and achieve their goals.',
  keywords: 'GPA calculator, grade point average, semester GPA, cumulative GPA, academic calculator, student tools',
  openGraph: {
    title: 'GPA Calculator | Calculate Your Grade Point Average',
    description: 'Calculate your cumulative GPA, semester GPA, and track your academic progress. Free tool for students.',
    url: 'https://calplanners.online/gpa-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/gpa-calculator',
  },
};

export default function Page() {
  return <GPACalculatorClient />;
}