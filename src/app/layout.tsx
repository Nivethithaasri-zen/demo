
import './globals.css';
import { Inter } from 'next/font/google';
import { LocalizationProvider } from '../lib/localization';
import { NavigationMenu } from '../components/ui/navigation-menu';
import ThemeSwitcher from '../components/theme-switcher';
import HeaderAuth from '../components/header-auth';
import EnvVarWarning from '../components/env-var-warning';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Localized MVP App',
  description: 'A multi-language MVP with localization, search, and translator.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <LocalizationProvider>
          <header className="flex items-center justify-between px-6 py-4 border-b bg-white/80 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-8">
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <HeaderAuth />
            </div>
          </header>
          <EnvVarWarning />
          <main className="flex flex-col flex-1 px-4 md:px-8 py-8 bg-slate-50 min-h-[calc(100vh-72px)]">
            {children}
          </main>
        </LocalizationProvider>
      </body>
    </html>
  );
}
