'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!text.trim()) {
      return { words: 0, characters: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: '0 min', speakingTime: '0 min' };
    }

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    return { words, characters, charsNoSpaces, sentences, paragraphs, readingTime: `${readingTime} min`, speakingTime: `${speakingTime} min` };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setCopied(false);
  };

  const statCards = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading Time', value: stats.readingTime },
    { label: 'Speaking Time', value: stats.speakingTime },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
        &larr; Back to Tools
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Word Counter</h1>
      <p className="mb-8 text-gray-500">Analyze your text with real-time word, character, and reading time statistics.</p>

      <textarea
        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none mb-6"
        rows={8}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          disabled={!text}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
        <button
          onClick={handleClear}
          disabled={!text}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}