'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [0, 0, 0];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  let h = 0, s = 0, l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    switch (mx) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

const HISTORY_KEY = 'color-picker-history';
const MAX_HISTORY = 8;

export default function ColorPickerPage() {
  const [hex, setHex] = useState('#3b82f6');
  const [history, setHistory] = useState<string[]>([]);

  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  const [hexCopied, setHexCopied] = useState(false);
  const [rgbCopied, setRgbCopied] = useState(false);
  const [hslCopied, setHslCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const addToHistory = (color: string) => {
    const h2 = color.toLowerCase();
    setHistory((prev) => {
      const filtered = prev.filter((c) => c !== h2);
      const updated = [h2, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleColorChange = (newHex: string) => {
    setHex(newHex);
    addToHistory(newHex);
  };

  const handleSliderChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const [cr, cg, cb] = hexToRgb(hex);
    let nr = cr, ng = cg, nb = cb;
    if (channel === 'r') nr = value;
    if (channel === 'g') ng = value;
    if (channel === 'b') nb = value;
    handleColorChange(rgbToHex(nr, ng, nb));
  };

  const handleHexInput = (value: string) => {
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setHex(value);
      if (value.length === 7) addToHistory(value);
    }
  };

  const handleRandom = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    handleColorChange(rgbToHex(r, g, b));
  };

  const copyText = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch { /* ignore */ }
  };

  const rgbString = `rgb(${r}, ${g}, ${b})`;
  const hslString = `hsl(${h}, ${s}%, ${l}%)`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:underline">
          &larr; Back to Tools
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Color Picker</h1>
        <p className="mb-8 text-gray-500">Pick colors, convert between formats, and save your color history.</p>

        <div className="space-y-6">
          {/* Color Preview */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div
              className="h-[200px] rounded-xl border border-gray-200 transition-colors"
              style={{ backgroundColor: hex }}
            />
            <div className="mt-4 flex items-center gap-4">
              <input
                type="color"
                value={hex}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-12 w-12 cursor-pointer rounded-lg border border-gray-300"
              />
              <button onClick={handleRandom} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                Random Color
              </button>
            </div>
          </div>

          {/* HEX */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">HEX</p>
                <p className="mt-1 text-lg font-mono font-semibold text-gray-900">{hex.toUpperCase()}</p>
              </div>
              <button onClick={() => copyText(hex.toUpperCase(), setHexCopied)} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {hexCopied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexInput(e.target.value)}
              maxLength={7}
              className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {/* RGB */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">RGB</p>
                <p className="mt-1 text-lg font-mono font-semibold text-gray-900">{rgbString}</p>
              </div>
              <button onClick={() => copyText(rgbString, setRgbCopied)} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {rgbCopied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: 'R', value: r, color: 'bg-red-500' },
                { label: 'G', value: g, color: 'bg-green-500' },
                { label: 'B', value: b, color: 'bg-blue-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-semibold text-gray-500">{label}</span>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={value}
                    onChange={(e) => handleSliderChange(label.toLowerCase() as 'r' | 'g' | 'b', parseInt(e.target.value))}
                    className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-current ${color}`}
                    style={{ accentColor: hex }}
                  />
                  <span className="w-8 text-right text-sm font-mono text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HSL */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">HSL</p>
                <p className="mt-1 text-lg font-mono font-semibold text-gray-900">{hslString}</p>
              </div>
              <button onClick={() => copyText(hslString, setHslCopied)} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {hslCopied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Hue</p>
                <p className="text-sm font-mono font-medium">{h}°</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Saturation</p>
                <p className="text-sm font-mono font-medium">{s}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Lightness</p>
                <p className="text-sm font-mono font-medium">{l}%</p>
              </div>
            </div>
          </div>

          {/* Color History */}
          {history.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Color History</p>
              <div className="flex flex-wrap gap-2">
                {history.map((color) => (
                  <button
                    key={color}
                    onClick={() => setHex(color)}
                    title={color}
                    className="h-10 w-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}