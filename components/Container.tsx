import Head from "next/head";
import { useRouter } from "next/router";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";

export default function Container(props: any) {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: "Hehehai @一块木头 - 全栈开发，专注于前端应用程序和用户界面设计.",
    description: `我是一位全栈开发，专注于前端应用程序和用户界面设计。我的首选技术栈是 TypeScript、React、Vue 和 NodeJS。`,
    image: "/favicon.svg",
    og: '/og.png',
    type: "website",
    ...customMeta,
  };

  const headers = () => {
    return (
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta name="robots" content="follow, index" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta
          property="og:url"
          content={`https://hehehai.cn${router.asPath}`}
        />
        <link rel="canonical" href={`https://hehehai.cn${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hehehai @一块木头" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.og} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hehehai.cn" />
        <meta name="twitter:site" content="@riverhohai" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.og} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8">
      {headers()}
      <Header />
      <Navigator />
      <div className="my-3">{children}</div>
      <Footer />
    </div>
  );
}
