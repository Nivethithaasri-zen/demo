
'use client';

import { IntlProvider } from 'next-intl';
import React, { ReactNode, useState, useEffect } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
];

export const messages: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    search_placeholder: 'Search for attractions, hotels, etc.',
    featured_attractions: 'Featured Attractions',
    featured_hotels: 'Featured Hotels',
    translate: 'Translate',
    select_language: 'Select Language'
  },
  hi: {
    welcome: 'स्वागत है',
    search_placeholder: 'आकर्षण, होटल आदि खोजें',
    featured_attractions: 'विशेष आकर्षण',
    featured_hotels: 'विशेष होटल',
    translate: 'अनुवाद करें',
    select_language: 'भाषा चुनें'
  },
  es: {
    welcome: 'Bienvenido',
    search_placeholder: 'Busca atracciones, hoteles, etc.',
    featured_attractions: 'Atracciones Destacadas',
    featured_hotels: 'Hoteles Destacados',
    translate: 'Traducir',
    select_language: 'Seleccionar idioma'
  },
  fr: {
    welcome: 'Bienvenue',
    search_placeholder: 'Recherchez des attractions, hôtels, etc.',
    featured_attractions: 'Attractions en vedette',
    featured_hotels: 'Hôtels en vedette',
    translate: 'Traduire',
    select_language: 'Choisir la langue'
  },
  de: {
    welcome: 'Willkommen',
    search_placeholder: 'Suche nach Attraktionen, Hotels usw.',
    featured_attractions: 'Empfohlene Sehenswürdigkeiten',
    featured_hotels: 'Empfohlene Hotels',
    translate: 'Übersetzen',
    select_language: 'Sprache auswählen'
  }
};

export function getInitialLocale(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale');
    if (stored) return stored;
    const browserLang = navigator.language.slice(0, 2);
    if (SUPPORTED_LANGUAGES.find(l => l.code === browserLang)) return browserLang;
  }
  return 'en';
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(getInitialLocale());

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {/* Provide locale & setter via context if needed */}
      {children}
    </IntlProvider>
  );
}
