import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

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

export default function Page() {
  return <CalculatorClient />;
}