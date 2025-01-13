import OpenPanelGA from "@/components/shared/openpanel-ga";
import Providers from "@/components/shared/providers";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: `%s | ${siteConfig.title}`,
		default: siteConfig.title + siteConfig.shortTitle,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	icons: {
		icon: "/favicon.svg",
	},
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.host,
		siteName: siteConfig.title,
		images: [`${siteConfig.host}/favicon.svg`],
	},
	twitter: {
		card: "summary_large_image",
		creator: siteConfig.twitterName,
		creatorId: siteConfig.twitter,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html
				lang="zh-CN"
				suppressHydrationWarning
				className={cn(
					"bg-background font-sans antialiased",
					geistMono.variable,
				)}
			>
				<head>
					<link
						rel="stylesheet"
						crossOrigin="anonymous"
						href="https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Regular.min.css"
					/>
				</head>
				<body className="h-full min-h-screen bg-stone-50 text-foreground dark:bg-gradient-to-br dark:from-slate-900 dark:to-background">
					<Providers>{children}</Providers>
				</body>
				<OpenPanelGA />
			</html>
		</ViewTransitions>
	);
}
