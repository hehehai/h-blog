import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
      </Head>
      <body className="bg-white dark:bg-slate text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
