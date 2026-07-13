import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Equipment ROI Calculator | Smart Business Investment Tool',
  description: 'Calculate the return on investment for your equipment purchases. Make informed decisions and maximize business profitability.',
  keywords: 'ROI calculator, equipment ROI, business investment, payback period, capital investment',
  openGraph: {
    title: 'Equipment ROI Calculator | Smart Business Investment Tool',
    description: 'Calculate the return on investment for your equipment purchases. Make informed business decisions.',
    url: 'https://calplanners.online/equipment-roi-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/equipment-roi-calculator',
  },
};

export default function Page() {
  return <CalculatorClient />;
}