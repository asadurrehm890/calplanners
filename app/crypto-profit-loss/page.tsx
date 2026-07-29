import type { Metadata } from "next";
import CryptoProfitLossClient from "./CryptoProfitLossClient";

export const metadata: Metadata = {
  title: 'Crypto Profit/Loss Calculator | Track Your Crypto Portfolio Performance',
  description: 'Calculate your cryptocurrency profits and losses. Track your portfolio performance, ROI, and investment returns with our free crypto calculator.',
  keywords: 'crypto profit calculator, crypto loss calculator, portfolio tracker, ROI calculator, cryptocurrency investment tool',
  openGraph: {
    title: 'Crypto Profit/Loss Calculator | Track Your Crypto Portfolio Performance',
    description: 'Calculate your cryptocurrency profits and losses. Track your portfolio performance, ROI, and investment returns.',
    url: 'https://calplanners.online/crypto-profit-loss',
  },
  alternates: {
    canonical: 'https://calplanners.online/crypto-profit-loss',
  },
};

export default function Page() {
  return <CryptoProfitLossClient />;
}