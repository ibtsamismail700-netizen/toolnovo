'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function dataUrlToBytes(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1];
  if (!base64) return 0;
  return Math.round((base64.length * 3) / 4);
}

const compress = (file: File, quality: number): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', quality / 100));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState(80);
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState<{
    originalSize: number;
    compressedSize: number;
    saved: number;
    width: number;
    height: number;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    setCompressedUrl('');
    setStats(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      dimensionsRef.current = { width: img.width, height: img.height };
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleCompress = async () => {
    if (!file) return;
    setCompressing(true);
    try {
      const result = await compress(file, quality);
      setCompressedUrl(result);
      const originalSize = file.size;
      const compressedSize = dataUrlToBytes(result);
      const saved = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;
      setStats({
        originalSize,
        compressedSize,
        saved,
        width: dimensionsRef.current.width,
        height: dimensionsRef.current.height,
      });
    } catch {
      // compression error
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'compressed') + '-compressed.jpg';
    a.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:underline">
          &larr; Back to Tools
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Image Compressor</h1>
        <p className="mb-8 text-gray-500">Compress images right in your browser. No uploads to any server.</p>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
              dragOver
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 bg-white hover:border-emerald-400'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500">
              {file ? (
                <span className="font-medium text-gray-700">{file.name}</span>
              ) : (
                <>
                  <span className="text-emerald-600 font-medium">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-gray-400">Supports JPG, PNG, WebP</p>
          </div>

          {/* Quality Slider */}
          {file && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Quality</label>
                <span className="text-sm font-mono font-semibold text-emerald-600">{quality}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1% (smallest)</span>
                <span>100% (best)</span>
              </div>
              <button
                onClick={handleCompress}
                disabled={compressing}
                className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {compressing ? 'Compressing...' : 'Compress Image'}
              </button>
            </div>
          )}

          {/* Previews */}
          {originalUrl && compressedUrl && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-xs text-gray-500 uppercase tracking-wide">Original</p>
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full rounded-lg border border-gray-200 object-contain max-h-64"
                />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-xs text-gray-500 uppercase tracking-wide">Compressed</p>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="w-full rounded-lg border border-gray-200 object-contain max-h-64"
                />
              </div>
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Original Size</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{formatFileSize(stats.originalSize)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Compressed Size</p>
                <p className="mt-1 text-lg font-bold text-emerald-600">{formatFileSize(stats.compressedSize)}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Saved</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{stats.saved}%</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Dimensions</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{stats.width} &times; {stats.height}</p>
              </div>
            </div>
          )}

          {/* Download */}
          {compressedUrl && (
            <button
              onClick={handleDownload}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Download Compressed Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}