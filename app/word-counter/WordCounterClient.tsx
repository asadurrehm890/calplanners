"use client";

import { useState, useEffect } from "react";

interface WordStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
  longestWord: string;
  averageWordLength: number;
  uniqueWords: number;
  wordFrequency: { word: string; count: number }[];
}

export default function WordCounterClient() {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState<WordStats>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "0 min",
    speakingTime: "0 min",
    longestWord: "",
    averageWordLength: 0,
    uniqueWords: 0,
    wordFrequency: [],
  });

  const [activeTab, setActiveTab] = useState<"stats" | "frequency" | "analysis">("stats");

  useEffect(() => {
    calculateStats();
  }, [text]);

  const calculateStats = () => {
    if (!text.trim()) {
      setStats({
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: "0 min",
        speakingTime: "0 min",
        longestWord: "",
        averageWordLength: 0,
        uniqueWords: 0,
        wordFrequency: [],
      });
      return;
    }

    // Words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Characters
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;

    // Sentences (split by . ! ?)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraphs (split by double newline)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length || (text.trim().length > 0 ? 1 : 0);

    // Reading time (250 words per minute)
    const readingMinutes = wordCount / 250;
    const readingTime = readingMinutes < 1 
      ? `${Math.round(readingMinutes * 60)} sec` 
      : `${Math.round(readingMinutes)} min`;

    // Speaking time (150 words per minute)
    const speakingMinutes = wordCount / 150;
    const speakingTime = speakingMinutes < 1 
      ? `${Math.round(speakingMinutes * 60)} sec` 
      : `${Math.round(speakingMinutes)} min`;

    // Longest word
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');

    // Average word length
    const averageWordLength = wordCount > 0 
      ? words.reduce((sum, word) => sum + word.length, 0) / wordCount 
      : 0;

    // Unique words
    const wordMap = new Map<string, number>();
    words.forEach(word => {
      const lower = word.toLowerCase().replace(/[^a-zA-Z']/g, '');
      if (lower) {
        wordMap.set(lower, (wordMap.get(lower) || 0) + 1);
      }
    });
    const uniqueWords = wordMap.size;

    // Word frequency (top 20)
    const wordFrequency = Array.from(wordMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setStats({
      words: wordCount,
      characters: charCount,
      charactersNoSpaces: charNoSpaces,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime,
      speakingTime,
      longestWord,
      averageWordLength: Number(averageWordLength.toFixed(1)),
      uniqueWords,
      wordFrequency,
    });
  };

  const clearText = () => {
    setText("");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      alert("Please paste your text using Ctrl+V (Cmd+V on Mac)");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
            📝 Word & Character Counter
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Count words, characters, sentences, paragraphs, and more. Free online writing tool.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Text Input */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Your Text
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={pasteText}
                    className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    📋 Paste
                  </button>
                  <button
                    onClick={copyText}
                    disabled={!text}
                    className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    📄 Copy
                  </button>
                  <button
                    onClick={clearText}
                    disabled={!text}
                    className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✕ Clear
                  </button>
                </div>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to count words, characters, and more..."
                className="w-full h-[400px] p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span>Characters: {stats.characters}</span>
                <span>•</span>
                <span>Words: {stats.words}</span>
                <span>•</span>
                <span>Sentences: {stats.sentences}</span>
                <span>•</span>
                <span>Paragraphs: {stats.paragraphs}</span>
              </div>
            </div>

            {/* Upload File Option */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700">
              <div className="text-center">
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  💡 Upload a file to count words:
                </p>
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
                    Upload File (.txt, .docx)
                    <input
                      type="file"
                      accept=".txt,.docx,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result as string;
                            setText(content);
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-sm flex">
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === "stats"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                📊 Stats
              </button>
              <button
                onClick={() => setActiveTab("frequency")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === "frequency"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                📈 Frequency
              </button>
              <button
                onClick={() => setActiveTab("analysis")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === "analysis"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                🔍 Analysis
              </button>
            </div>

            {/* Stats Tab */}
            {activeTab === "stats" && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Text Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Words</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.words}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Characters</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.characters}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Characters (no spaces)</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.charactersNoSpaces}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Sentences</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.sentences}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Paragraphs</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.paragraphs}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Unique Words</p>
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.uniqueWords}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Frequency Tab */}
            {activeTab === "frequency" && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Word Frequency
                </h3>
                {stats.wordFrequency.length > 0 ? (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {stats.wordFrequency.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 min-w-[30px]">
                          #{index + 1}
                        </span>
                        <span className="flex-1 text-black dark:text-white">{item.word}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{
                                width: `${(item.count / stats.wordFrequency[0].count) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 min-w-[30px]">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
                    Enter some text to see word frequency analysis
                  </p>
                )}
              </div>
            )}

            {/* Analysis Tab */}
            {activeTab === "analysis" && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Text Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Reading Time</span>
                    <span className="font-bold text-black dark:text-white">{stats.readingTime}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Speaking Time</span>
                    <span className="font-bold text-black dark:text-white">{stats.speakingTime}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Longest Word</span>
                    <span className="font-bold text-black dark:text-white">{stats.longestWord || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Average Word Length</span>
                    <span className="font-bold text-black dark:text-white">{stats.averageWordLength} characters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 dark:text-zinc-400">Unique Word Ratio</span>
                    <span className="font-bold text-black dark:text-white">
                      {stats.words > 0 ? `${Math.round((stats.uniqueWords / stats.words) * 100)}%` : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            <button
              onClick={() => {
                const data = {
                  text,
                  stats,
                  exportedAt: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `word-counter-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-600 transition-colors font-medium"
            >
              📥 Export Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}