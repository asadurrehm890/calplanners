import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Candle Making Cost Calculator | Price Your Candles Profitably',
  description: 'Calculate your candle production costs, profit margins, and suggested selling prices. Free tool for candle makers to price their products accurately.',
  keywords: 'candle cost calculator, candle pricing, candle making costs, profit margin calculator, candle business tools',
  openGraph: {
    title: 'Candle Making Cost Calculator | Price Your Candles Profitably',
    description: 'Calculate your candle production costs, profit margins, and suggested selling prices. Free tool for candle makers.',
    url: 'https://calplanners.online/candle-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/candle-calculator',
  },
};

export default function Page() {
  return <CalculatorClient />;
}