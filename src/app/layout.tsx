import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from 'next/font/google';
import './globals.css';

const ibmPlexSansJp = IBM_Plex_Sans_JP({
  variable: '--font-ibm-plex-sans-jp',
  subsets: ['latin-ext'],
  weight: ['700'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ミゲル blog',
  description: 'sharing engineering thoughts in a safe place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.svg" rel="icon" />
      </head>
      <body
        className={`${ibmPlexSansJp.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
