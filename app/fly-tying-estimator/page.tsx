import type { Metadata } from "next";
import EstimatorClient from "./EstimatorClient";

export const metadata: Metadata = {
  title: 'Fly Tying Material Estimator | Calculate Your Fly Costs',
  description: 'Estimate material costs, track usage, and calculate cost per fly. Free tool for fly tiers to manage inventory and pricing.',
  keywords: 'fly tying cost calculator, fly tying materials, cost per fly, fly fishing tools, fly tying inventory',
  openGraph: {
    title: 'Fly Tying Material Estimator | Calculate Your Fly Costs',
    description: 'Estimate material costs, track usage, and calculate cost per fly. Free tool for fly tiers.',
    url: 'https://calplanners.online/fly-tying-estimator',
  },
  alternates: {
    canonical: 'https://calplanners.online/fly-tying-estimator',
  },
};

export default function Page() {
  return <EstimatorClient />;
}