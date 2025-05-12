
'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { SUPPORTED_LANGUAGES } from '../../lib/localization';
import { translateText } from '../../utils/translator/api';

interface TranslatorProps {
  initialText?: string;
}

export function Translator({ initialText = '' }: TranslatorProps) {
  const [text, setText] = useState(initialText);
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTranslate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTranslatedText('');
    try {
      const result = await translateText(text, targetLanguage);
      setTranslatedText(result.translated ?? result.result ?? '');
    } catch (error) {
      setTranslatedText('Translation error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-background p-4 shadow-md max-w-xl mx-auto my-6">
      <form onSubmit={handleTranslate} className="flex flex-col gap-4">
        <label className="font-semibold">
          Text to translate
          <Input
            className="mt-1"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type here..."
            disabled={loading}
          />
        </label>
        <label className="font-semibold">
          Target language
          <select
            className="block mt-1 rounded border px-2 py-1"
            value={targetLanguage}
            onChange={e => setTargetLanguage(e.target.value)}
            disabled={loading}
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" disabled={loading || !text}>
          {loading ? 'Translating...' : 'Translate'}
        </Button>
      </form>
      {translatedText && (
        <div className="mt-4 p-3 rounded bg-muted border text-lg font-medium transition-all">
          {translatedText}
        </div>
      )}
    </div>
  );
}
