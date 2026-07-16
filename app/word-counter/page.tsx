import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: 'Word Counter | Count Words, Characters, Sentences & More',
  description: 'Free online word counter tool. Count words, characters, sentences, paragraphs, and reading time. Perfect for writers, students, and content creators.',
  keywords: 'word counter, character counter, word count, character count, writing tool, content counter, essay word counter',
  openGraph: {
    title: 'Word Counter | Count Words, Characters, Sentences & More',
    description: 'Free online word counter tool. Count words, characters, sentences, paragraphs, and reading time.',
    url: 'https://calplanners.online/word-counter',
  },
  alternates: {
    canonical: 'https://calplanners.online/word-counter',
  },
};

export default function Page() {
  return <WordCounterClient />;
}