'use client';

import { useState } from 'react';
import Link from 'next/link';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';

const conversions: { label: string; type: CaseType }[] = [
  { label: 'UPPERCASE', type: 'upper' },
  { label: 'lowercase', type: 'lower' },
  { label: 'Title Case', type: 'title' },
  { label: 'Sentence case', type: 'sentence' },
  { label: 'camelCase', type: 'camel' },
  { label: 'PascalCase', type: 'pascal' },
  { label: 'snake_case', type: 'snake' },
  { label: 'kebab-case', type: 'kebab' },
];

function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'camel': {
      const base = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase());
      return base;
    }
    case 'pascal': {
      const base = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase());
      return base.charAt(0).toUpperCase() + base.slice(1);
    }
    case 'snake':
      return text
        .replace(/\s+/g, '_')
        .replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())
        .replace(/_+/g, '_')
        .replace(/^_/, '')
        .toLowerCase();
    case 'kebab':
      return text
        .replace(/\s+/g, '-')
        .replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
        .replace(/-+/g, '-')
        .replace(/^-/, '')
        .toLowerCase();
    default:
      return text;
  }
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeType, setActiveType] = useState<CaseType | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = (type: CaseType) => {
    if (!input.trim()) return;
    const result = convertCase(input, type);
    setOutput(result);
    setActiveType(type);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setActiveType(null);
    setCopied(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
        &larr; Back to Tools
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Case Converter</h1>
      <p className="mb-8 text-gray-500">Convert text between different cases instantly.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          rows={5}
          placeholder="Enter text to convert..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {conversions.map((conv) => (
          <button
            key={conv.type}
            onClick={() => handleConvert(conv.type)}
            disabled={!input.trim()}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              activeType === conv.type
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {conv.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-gray-50"
          rows={5}
          readOnly
          value={output}
          placeholder="Converted text will appear here..."
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          disabled={!output}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleClear}
          disabled={!input && !output}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}