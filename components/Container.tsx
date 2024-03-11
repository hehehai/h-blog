import Head from "next/head";
import { useRouter } from "next/router";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";
import { baseHost } from "lib/utils";

export interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  og?: string;
  type?: string;
  date?: string;
  tag?: string;
}

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: "Hehehai @一块木头 - 全栈开发，专注于前端应用程序和用户界面设计.",
    description: `我是一位全栈开发，专注于前端应用程序和用户界面设计。我的首选技术栈是 TypeScript、React、Vue 和 NodeJS。`,
    image: "/favicon.svg",
    og: "/og.jpg",
    type: "website",
    tag: "",
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

        <meta property="og:url" content={`${baseHost}${router.asPath}`} />
        <link rel="canonical" href={`${baseHost}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Hehehai @一块木头" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="article:author" content={baseHost} />
        <meta property="og:image" content={baseHost + meta.og} />
        <meta property="og:image：alt" content={meta.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@riverhohai" />
        <meta name="twitter:creator" content="@riverhohai" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        {meta.tag && <meta property="article:tag" content={meta.tag} />}
      </Head>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8">
      {headers()}
      <Header />
      <Navigator />
      <div className="my-4">{children}</div>
      <Footer />
    </div>
  );
}
