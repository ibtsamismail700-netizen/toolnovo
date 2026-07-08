'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [special, setSpecial] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (uppercase) charset += CHAR_SETS.uppercase;
    if (lowercase) charset += CHAR_SETS.lowercase;
    if (numbers) charset += CHAR_SETS.numbers;
    if (special) charset += CHAR_SETS.special;

    if (!charset) {
      setPassword('');
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, special]);

  const strength = (() => {
    if (!password) return { percent: 0, label: '', color: 'bg-gray-200' };

    let score = 0;
    const len = password.length;
    if (len >= 8) score += 10;
    if (len >= 12) score += 10;
    if (len >= 16) score += 10;
    if (len >= 24) score += 10;
    if (len >= 32) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    const percent = Math.min(100, score);

    if (percent < 40) return { percent, label: 'Weak', color: 'bg-red-500' };
    if (percent < 60) return { percent, label: 'Medium', color: 'bg-yellow-500' };
    if (percent < 80) return { percent, label: 'Strong', color: 'bg-emerald-500' };
    return { percent, label: 'Very Strong', color: 'bg-emerald-500' };
  })();

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
        &larr; Back to Tools
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Password Generator</h1>
      <p className="mb-8 text-gray-500">Generate secure, random passwords with customizable options.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Generated Password</label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Click Generate to create a password"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {password && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Strength</span>
              <span>{strength.label}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Length: <span className="text-emerald-600 font-bold">{length}</span>
        </label>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-emerald-600 mb-6"
        />

        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-emerald-600 w-4 h-4"
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="accent-emerald-600 w-4 h-4"
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className="accent-emerald-600 w-4 h-4"
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={special}
              onChange={(e) => setSpecial(e.target.checked)}
              className="accent-emerald-600 w-4 h-4"
            />
            Special (!@#$...)
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}