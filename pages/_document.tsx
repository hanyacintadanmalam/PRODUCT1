import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 