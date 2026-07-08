'use client';

import { useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter text or a URL.');
      setQrDataUrl('');
      return;
    }

    try {
      setError('');
      const dataUrl = await QRCode.toDataURL(text, { width: size, margin: 2 });
      setQrDataUrl(dataUrl);
    } catch {
      setError('Failed to generate QR code. Please try a shorter input.');
      setQrDataUrl('');
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
        &larr; Back to Tools
      </Link>
      <h1 className="mb-2 text-3xl font-bold">QR Code Generator</h1>
      <p className="mb-8 text-gray-500">Generate QR codes from text or URLs instantly.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none mb-4"
          rows={3}
          placeholder="Enter text or URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <div className="flex gap-2 mb-6">
          {[
            { label: 'Small', value: 200 },
            { label: 'Medium', value: 300 },
            { label: 'Large', value: 400 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSize(option.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                size === option.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label} ({option.value}px)
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Generate QR Code
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">{error}</p>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {qrDataUrl ? (
          <div className="flex flex-col items-center">
            <img src={qrDataUrl} alt="Generated QR Code" className="mb-4" />
            <button
              onClick={handleDownload}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Download QR Code
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-lg bg-gray-50 border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">Your QR code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}