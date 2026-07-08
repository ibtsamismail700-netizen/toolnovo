'use client';

import { useState } from 'react';
import Link from 'next/link';

function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== 'object') return 0;
  let count = 0;
  for (const key in obj as Record<string, unknown>) {
    count++;
    const val = (obj as Record<string, unknown>)[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      count += countKeys(val);
    } else if (Array.isArray(val)) {
      for (const item of val) {
        if (item !== null && typeof item === 'object') {
          count += countKeys(item);
        }
      }
    }
  }
  return count;
}

function getDepth(obj: unknown, current: number = 0): number {
  if (obj === null || typeof obj !== 'object') return current;
  let max = current;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      max = Math.max(max, getDepth(item, current + 1));
    }
  } else {
    for (const val of Object.values(obj as Record<string, unknown>)) {
      if (val !== null && typeof val === 'object') {
        max = Math.max(max, getDepth(val, current + 1));
      }
    }
  }
  return max;
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState<{ keys: number; depth: number; size: number } | null>(null);

  const parse = () => {
    setError('');
    setSuccess('');
    if (!input.trim()) {
      setError('Please enter some JSON.');
      setOutput('');
      setStats(null);
      return null;
    }
    try {
      const parsed = JSON.parse(input);
      setSuccess('✓ Valid JSON');
      return parsed;
    } catch (e) {
      setError('✗ Invalid JSON: ' + (e instanceof Error ? e.message : 'Parse error'));
      setOutput('');
      setStats(null);
      return null;
    }
  };

  const format = () => {
    const parsed = parse();
    if (parsed !== null) {
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      updateStats(formatted, parsed);
    }
  };

  const minify = () => {
    const parsed = parse();
    if (parsed !== null) {
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      updateStats(minified, parsed);
    }
  };

  const validate = () => {
    parse();
    setOutput('');
    setStats(null);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
    setSuccess('');
    setStats(null);
  };

  const updateStats = (str: string, parsed: unknown) => {
    const bytes = new Blob([str]).size;
    setStats({
      keys: countKeys(parsed),
      depth: getDepth(parsed),
      size: bytes,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:underline">
          &larr; Back to Tools
        </Link>
        <h1 className="mb-2 text-3xl font-bold">JSON Formatter</h1>
        <p className="mb-8 text-gray-500">Format, minify, validate, and inspect JSON data with ease.</p>

        <div className="space-y-4">
          {/* Input */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              placeholder='{"key": "value"}'
              className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {/* Buttons & Indent */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex flex-wrap gap-2">
              <button onClick={format} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                Format
              </button>
              <button onClick={minify} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                Minify
              </button>
              <button onClick={validate} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Validate
              </button>
              <button onClick={clear} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Clear
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Indent:</span>
              <button
                onClick={() => setIndent(2)}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${indent === 2 ? 'bg-emerald-600 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                2 spaces
              </button>
              <button
                onClick={() => setIndent(4)}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${indent === 4 ? 'bg-emerald-600 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                4 spaces
              </button>
            </div>
          </div>

          {/* Messages */}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          {success && <p className="text-sm text-emerald-600 font-medium">{success}</p>}

          {/* Output */}
          {output && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Output</label>
              <textarea
                value={output}
                readOnly
                rows={10}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono bg-gray-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Keys Count</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.keys}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Nesting Depth</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.depth}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Size</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.size} B</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}