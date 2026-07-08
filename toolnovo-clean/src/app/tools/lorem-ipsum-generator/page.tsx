'use client';

import { useState } from 'react';
import Link from 'next/link';

const SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus, nec faucibus nisl sodales ut.',
  'Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat.',
  'Aliquam erat volutpat, nam dui mi, tincidunt quis accumsan porttitor facilisis luctus metus.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet ante.',
  'Donec eu libero sit amet quam egestas semper, aenean ultricies mi vitae est.',
  'Mauris placerat eleifend leo, quisque sit amet est et sapien ullamcorper pharetra.',
  'Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet wisi.',
  'Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.',
  'Sed sagittis blandit diam at convallis, cras sed odio felis.',
  'Fusce ac felis sit amet ligula pharetra condimentum, maecenas mattis mollis tristique.',
  'Sed sed lorem id erat iaculis vestibulum, sed vitae augue vitae diam pharetra vestibulum.',
  'Nulla facilisi, etiam dignissim diam quis enim lobortis scelerisque.',
  'In hac habitasse platea dictumst, vivamus vel nulla eget eros elementum pellentesque.',
  'Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.',
];

type GenerationType = 'paragraphs' | 'sentences' | 'words';

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateWords(count: number): string {
  const allText = SENTENCES.join(' ').replace(/[.,;:!?]/g, '');
  const wordPool = allText.split(/\s+/).filter(Boolean);
  const selected = getRandomItems(wordPool, count);
  return selected.join(' ');
}

function generateSentences(count: number): string {
  const selected = getRandomItems(SENTENCES, count);
  return selected.join(' ');
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const selected = getRandomItems(SENTENCES, sentenceCount);
    paragraphs.push(selected.join(' '));
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState<GenerationType>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let result = '';
    switch (type) {
      case 'paragraphs':
        result = generateParagraphs(count);
        break;
      case 'sentences':
        result = generateSentences(count);
        break;
      case 'words':
        result = generateWords(count);
        break;
    }
    setOutput(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOutput('');
    setCopied(false);
  };

  const typeOptions: { label: string; value: GenerationType }[] = [
    { label: 'Paragraphs', value: 'paragraphs' },
    { label: 'Sentences', value: 'sentences' },
    { label: 'Words', value: 'words' },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
        &larr; Back to Tools
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Lorem Ipsum Generator</h1>
      <p className="mb-8 text-gray-500">Generate placeholder lorem ipsum text for your designs and mockups.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex gap-2 mb-4">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setType(option.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                type === option.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
        <input
          type="number"
          min={1}
          max={500}
          value={count}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1 && val <= 500) {
              setCount(val);
            }
          }}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none mb-4"
        />

        <button
          onClick={handleGenerate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-gray-50"
            rows={12}
            readOnly
            value={output}
          />
        </div>
      )}

      {output && (
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}