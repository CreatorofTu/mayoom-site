import type { Metadata } from 'next';
import { Domine, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const domine = Domine({
  variable: '--font-domine',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mayoom — Never get your account stolen again',
  description: "There's no account to steal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${domine.variable}`}>{children}</body>
    </html>
  );
}
