
'use client';

import * as React from 'react';
import { SUPPORTED_LANGUAGES, messages } from '../../lib/localization';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function NavigationMenu() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored) setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }, [locale]);

  return (
    <nav className="flex items-center gap-6">
      <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
        {messages[locale]?.welcome ?? 'Welcome'}
      </Link>
      <Link href="/instruments" className="text-base hover:text-primary transition-colors">
        Instruments
      </Link>
      <div className="ml-4">
        <label htmlFor="lang-select" className="sr-only">
          {messages[locale]?.select_language ?? 'Select Language'}
        </label>
        <select
          id="lang-select"
          className="rounded px-2 py-1 border bg-background text-sm"
          value={locale}
          onChange={e => setLocale(e.target.value)}
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
