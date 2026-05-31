import '../styles/globals.css';
import Head from 'next/head';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://josh-portfolio.vercel.app';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Josh Edward Lui — Full-stack Developer</title>
        <meta
          name="description"
          content="BSIT student and full-stack developer building reliable web apps with C#/.NET, React, Vue, and Azure."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Josh Edward Lui — Full-stack Developer" />
        <meta
          property="og:description"
          content="BSIT student and full-stack developer. Network Management System lead, AI-powered Job Recruitment Platform, Cebu City."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
      <Toaster theme="dark" position="bottom-right" />
      <Analytics />
    </>
  );
}

export default MyApp;
