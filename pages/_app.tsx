import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>{`
        :root {
          --win95-blue: #000080;
          --win95-blue-light: #1084d0;
          --win95-gray: #c0c0c0;
          --win95-teal: #008080;
          --win95-text: #000000;
          --win95-border-light: #ffffff;
          --win95-border-dark: #808080;
        }
        
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        
        html, body {
          max-width: 100vw;
          overflow-x: hidden;
          font-family: 'MS Sans Serif', 'Segoe UI', 'Tahoma', sans-serif;
          color: var(--win95-text);
          background-color: var(--win95-teal);
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        button {
          cursor: pointer;
          background-color: var(--win95-gray);
          border: 2px outset var(--win95-border-light);
          padding: 0.25rem 0.5rem;
          color: var(--win95-text);
          font-family: inherit;
          font-size: 12px;
        }
        
        button:active {
          border: 2px inset var(--win95-border-light);
        }
        
        input, select, textarea {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 2px inset var(--win95-border-light);
          background-color: white;
          font-family: inherit;
        }
        
        /* Windows 95 Scrollbar */
        ::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        
        ::-webkit-scrollbar-track {
          background-color: var(--win95-gray);
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: var(--win95-gray);
          border: 2px outset var(--win95-border-light);
        }
        
        ::-webkit-scrollbar-button {
          background-color: var(--win95-gray);
          border: 2px outset var(--win95-border-light);
          display: block;
          height: 16px;
          width: 16px;
        }
        
        /* Windows 95 Font */
        @font-face {
          font-family: 'MS Sans Serif';
          src: url('https://unpkg.com/98.css@0.1.17/dist/ms_sans_serif.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'MS Sans Serif';
          src: url('https://unpkg.com/98.css@0.1.17/dist/ms_sans_serif_bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
        }

        /* Digital Font for Clock */
        @font-face {
          font-family: 'Digital';
          src: url('https://fonts.cdnfonts.com/s/19260/DIGITALDREAM.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
      <Component {...pageProps} />
    </React.StrictMode>
  );
} 