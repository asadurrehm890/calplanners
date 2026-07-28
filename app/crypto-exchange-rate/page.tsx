import type { Metadata } from "next";
import CryptoExchangeRateClient from "./CryptoExchangeRateClient";

export const metadata: Metadata = {
  title: 'Crypto Exchange Rate Tool | Real-Time Cryptocurrency Prices',
  description: 'Check real-time cryptocurrency exchange rates for Bitcoin, Ethereum, Solana, and more. Free crypto price tracker with live updates.',
  keywords: 'crypto exchange rate, cryptocurrency prices, Bitcoin price, Ethereum price, crypto tracker, live crypto prices',
  openGraph: {
    title: 'Crypto Exchange Rate Tool | Real-Time Cryptocurrency Prices',
    description: 'Check real-time cryptocurrency exchange rates for Bitcoin, Ethereum, Solana, and more. Free crypto price tracker.',
    url: 'https://calplanners.online/crypto-exchange-rate',
  },
  alternates: {
    canonical: 'https://calplanners.online/crypto-exchange-rate',
  },
};


export default function Page() {
  return <CryptoExchangeRateClient />;
}