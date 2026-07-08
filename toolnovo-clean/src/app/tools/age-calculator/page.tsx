'use client';

import { useState } from 'react';
import Link from 'next/link';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{
    years: number; months: number; days: number;
    totalDays: number; totalHours: number; totalMinutes: number;
    dayOfBirth: string; nextBirthdayDays: number | null;
  } | null>(null);

  const calculateAge = () => {
    if (!dob) return;

    const birth = new Date(dob);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const dayOfBirth = DAYS[birth.getDay()];

    let nextBirthdayDays: number | null = null;
    const thisYearBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (thisYearBirthday.getTime() <= now.getTime()) {
      const nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
      nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      nextBirthdayDays = Math.ceil((thisYearBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    setResult({ years, months, days, totalDays, totalHours, totalMinutes, dayOfBirth, nextBirthdayDays });
  };

  const stats = result
    ? [
        { label: 'Years', value: result.years.toLocaleString() },
        { label: 'Months', value: result.months.toLocaleString() },
        { label: 'Days', value: result.days.toLocaleString() },
        { label: 'Total Days', value: result.totalDays.toLocaleString() },
        { label: 'Total Hours', value: result.totalHours.toLocaleString() },
        { label: 'Total Minutes', value: result.totalMinutes.toLocaleString() },
      ]
    : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/tools" className="mb-6 inline-block text-sm text-emerald-600 hover:underline">
          &larr; Back to Tools
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Age Calculator</h1>
        <p className="mb-8 text-gray-500">Enter your date of birth to find out your exact age in multiple units.</p>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
          <button
            onClick={calculateAge}
            disabled={!dob}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate Age
          </button>
        </div>

        {result && (
          <>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 space-y-3">
              <p className="text-sm text-gray-700">
                🎂 You were born on a <span className="font-semibold text-emerald-600">{result.dayOfBirth}</span>.
              </p>
              <p className="text-sm text-gray-700">
                🎉 Your next birthday is <span className="font-semibold text-emerald-600">{result.nextBirthdayDays} day{result.nextBirthdayDays !== 1 ? 's' : ''}</span> away.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}