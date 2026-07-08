'use client';

import { useState } from 'react';
import Link from 'next/link';

const encode = (str: string) =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );

const decode = (str: string) => {
  try {
    return decodeURIComponent(
      Array.from(atob(str), (c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
  } catch {
    return 'Error: Invalid Base64 string';
  }
};

export default function Base64EncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setError('');
    if (!input) {
      setError('Please enter some text to encode.');
      setOutput('');
      return;
    }
    try {
      setOutput(encode(input));
    } catch {
      setError('Failed to encode the input.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    setError('');
    if (!input) {
      setError('Please enter a Base64 string to decode.');
      setOutput('');
      return;
    }
    const result = decode(input);
    if (result.startsWith('Error:')) {
      setError(result);
      setOutput('');
    } else {
      setOutput(result);
    }
  };

  const handleSwap = () => {
    setError('');
    if (!output) return;
    setInput(output);
    setOutput('');
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:underline">
          &larr; Back to Tools
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Base64 Encoder / Decoder</h1>
        <p className="mb-8 text-gray-500">Encode text to Base64 or decode Base64 back to text. Supports full Unicode.</p>

        <div className="space-y-4">
          {/* Textareas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Input</label>
              <textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                rows={10}
                placeholder="Enter text or Base64 string..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">Output</label>
              <textarea
                value={output}
                readOnly
                rows={10}
                placeholder="Result will appear here..."
                className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono bg-gray-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleEncode} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
              Encode to Base64
            </button>
            <button onClick={handleDecode} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
              Decode from Base64
            </button>
            <button
              onClick={handleSwap}
              title="Swap output to input"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              &harr; Swap
            </button>
            <button onClick={handleCopy} disabled={!output} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {copied ? '✓ Copied!' : 'Copy Output'}
            </button>
            <button onClick={handleClear} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}