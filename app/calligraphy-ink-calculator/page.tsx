import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

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

export default function Page() {
  return <CalculatorClient />;
}