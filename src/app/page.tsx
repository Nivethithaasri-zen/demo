
'use client';

import { useEffect, useState } from 'react';
import { messages } from '../lib/localization';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Translator } from '../components/ui/translator';

function useLocale(): string {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('locale') || 'en';
}

export default function HomePage() {
  const [locale, setLocale] = useState('en');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [featuredAttractions, setFeaturedAttractions] = useState<any[]>([]);
  const [featuredHotels, setFeaturedHotels] = useState<any[]>([]);

  useEffect(() => {
    setLocale(useLocale());
  }, []);

  useEffect(() => {
    // Simulate API fetch for featured items
    setTimeout(() => {
      setFeaturedAttractions([
        {
          id: 1,
          name: { en: 'Taj Mahal', hi: 'ताज महल', es: 'Taj Mahal', fr: 'Taj Mahal', de: 'Taj Mahal' },
          image: 'https://images.pexels.com/photos/1583244/pexels-photo-1583244.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: {
            en: 'A stunning symbol of love in Agra.',
            hi: 'आगरा में प्रेम का अद्भुत प्रतीक।',
            es: 'Un impresionante símbolo de amor en Agra.',
            fr: 'Un symbole d\'amour impressionnant à Agra.',
            de: 'Ein beeindruckendes Symbol der Liebe in Agra.'
          }
        },
        {
          id: 2,
          name: { en: 'Eiffel Tower', hi: 'एफिल टॉवर', es: 'Torre Eiffel', fr: 'Tour Eiffel', de: 'Eiffelturm' },
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: {
            en: 'The iconic Parisian landmark.',
            hi: 'पेरिस का प्रतिष्ठित स्मारक।',
            es: 'El emblemático monumento de París.',
            fr: 'Le monument emblématique de Paris.',
            de: 'Das ikonische Wahrzeichen von Paris.'
          }
        }
      ]);
      setFeaturedHotels([
        {
          id: 1,
          name: { en: 'Leela Palace', hi: 'लीला पैलेस', es: 'Leela Palace', fr: 'Leela Palace', de: 'Leela Palace' },
          image: 'https://images.pexels.com/photos/2611028/pexels-photo-2611028.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: {
            en: 'Luxury redefined in New Delhi.',
            hi: 'नई दिल्ली में लक्जरी की नई परिभाषा।',
            es: 'Lujo redefinido en Nueva Delhi.',
            fr: 'Le luxe redéfini à New Delhi.',
            de: 'Luxus neu definiert in Neu-Delhi.'
          }
        }
      ]);
    }, 400);
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearchResults([]);
    // Simulate API search
    setTimeout(() => {
      setSearchResults([
        {
          id: 101,
          name: { en: 'Red Fort', hi: 'लाल किला', es: 'Fuerte Rojo', fr: 'Fort Rouge', de: 'Rotes Fort' },
          type: 'Attraction',
          image: 'https://images.pexels.com/photos/1666028/pexels-photo-1666028.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: {
            en: 'Historic fort in Delhi.',
            hi: 'दिल्ली का ऐतिहासिक किला।',
            es: 'Fuerte histórico en Delhi.',
            fr: 'Fort historique à Delhi.',
            de: 'Historische Festung in Delhi.'
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {messages[locale]?.welcome ?? 'Welcome'}
      </h1>
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-8">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={messages[locale]?.search_placeholder ?? 'Search...'}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !query}>
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            'Search'
          )}
        </Button>
      </form>
      {searchResults.length > 0 && (
        <section className="mb-10">
          <h2 className="font-semibold text-lg mb-3">Results</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {searchResults.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name[locale]}
                  className="w-full h-40 object-cover"
                  width={320}
                  height={160}
                  loading="lazy"
                />
                <div className="p-3">
                  <div className="font-bold">{item.name[locale]}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.type}</div>
                  <div className="text-sm">{item.description[locale]}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
      <section className="mb-12">
        <h2 className="font-semibold text-lg mb-3">
          {messages[locale]?.featured_attractions ?? 'Featured Attractions'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredAttractions.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name[locale]}
                className="w-full h-40 object-cover"
                width={320}
                height={160}
                loading="lazy"
              />
              <div className="p-3">
                <div className="font-bold">{item.name[locale]}</div>
                <div className="text-sm">{item.description[locale]}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-16">
        <h2 className="font-semibold text-lg mb-3">
          {messages[locale]?.featured_hotels ?? 'Featured Hotels'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredHotels.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name[locale]}
                className="w-full h-40 object-cover"
                width={320}
                height={160}
                loading="lazy"
              />
              <div className="p-3">
                <div className="font-bold">{item.name[locale]}</div>
                <div className="text-sm">{item.description[locale]}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Translator initialText={query} />
    </div>
  );
}
