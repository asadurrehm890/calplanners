import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Weight Loss Timeline Calculator | Realistic Goal Setting',
  description: 'Discover how long it will take to reach your weight loss goals. Plan your journey with realistic timelines and milestones.',
  keywords: 'weight loss timeline, weight loss calculator, fitness goals, weight loss journey, healthy weight loss',
  openGraph: {
    title: 'Weight Loss Timeline Calculator | Realistic Goal Setting',
    description: 'Discover how long it will take to reach your weight loss goals. Plan your journey with realistic timelines.',
    url: 'https://calplanners.online/weight-loss-timeline',
  },
  alternates: {
    canonical: 'https://calplanners.online/weight-loss-timeline',
  },
};

export default function Page() {
  return <CalculatorClient />;
}