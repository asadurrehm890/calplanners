import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Fursuit Fur Yardage Calculator | Estimate Your Fur Needs',
  description: 'Calculate exactly how much fur you need for your fursuit project. Free tool for fursuit makers to estimate yardage and costs.',
  keywords: 'fursuit fur calculator, fursuit materials, fur yardage, costume making, fursuit building',
  openGraph: {
    title: 'Fursuit Fur Yardage Calculator | Estimate Your Fur Needs',
    description: 'Calculate exactly how much fur you need for your fursuit project. Free tool for fursuit makers.',
    url: 'https://calplanners.online/fursuit-fur-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/fursuit-fur-calculator',
  },
};

export default function Page() {
  return <CalculatorClient />;
}