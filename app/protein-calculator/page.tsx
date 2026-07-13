import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Protein Intake Calculator | Daily Protein Needs',
  description: 'Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Free nutrition tool.',
  keywords: 'protein calculator, daily protein intake, nutrition calculator, fitness goals, protein needs',
  openGraph: {
    title: 'Protein Intake Calculator | Daily Protein Needs',
    description: 'Calculate your optimal daily protein intake based on weight, activity level, and fitness goals.',
    url: 'https://calplanners.online/protein-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/protein-calculator',
  },
};

export default function Page() {
  return <CalculatorClient />;
}