import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import NavItem from "./NavItem";

export default function Container(props: any) {
  const { resolvedTheme, setTheme } = useTheme();

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Lee Robinson – Developer, writer, creator.",
    description: `Front-end developer, JavaScript enthusiast, and course creator.`,
    image: "https://leerob.io/static/images/lee-banner.png",
    type: "website",
    ...customMeta,
  };

  const headers = () => {
    return (
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://leerob.io${router.asPath}`} />
        <link rel="canonical" href={`https://leerob.io${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lee Robinson" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {headers()}
      <div>
        <div><NavItem href="/" text="Hehehai.cn" /></div>
        <div>
          <div>Github</div>
          <div>Twitter</div>
          <div>Dark/Light</div>
        </div>
      </div>
      <div>
        <div>
          <NavItem href="/about" text="About" />
          <NavItem href="/posts" text="Posts" />
          <NavItem href="/projects" text="Projects" />
          <NavItem href="/photos" text="Photos" />
        </div>
      </div>
      <div>
        {children}
      </div>
      <div>
        <div>© 2022, Hehehai</div>
      </div>
    </div>
  );
}
