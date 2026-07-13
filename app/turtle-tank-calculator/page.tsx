import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: 'Turtle Tank Size Calculator | Find the Perfect Tank Size',
  description: 'Calculate the ideal tank size for your turtle based on species, size, and number of turtles. Free tool for turtle owners and enthusiasts.',
  keywords: 'turtle tank calculator, turtle tank size, aquarium size, pet turtle care, turtle habitat',
  openGraph: {
    title: 'Turtle Tank Size Calculator | Find the Perfect Tank Size',
    description: 'Calculate the ideal tank size for your turtle based on species, size, and number of turtles.',
    url: 'https://calplanners.online/turtle-tank-calculator',
  },
  alternates: {
    canonical: 'https://calplanners.online/turtle-tank-calculator',
  },
};

export default function Page() {
  return <CalculatorClient />;
}