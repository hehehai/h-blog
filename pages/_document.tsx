import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
      </Head>
      <body className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-black dark:text-slate-50 min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
