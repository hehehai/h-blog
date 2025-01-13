import { siteConfig } from "@/lib/config/site";
import { Link } from "next-view-transitions";
import ButtonFadeStyle from "../button-fade-style";
import ButtonThemeToggle from "../button-theme-toggle";
import { IconGithub, IconTwitter } from "../icons";

export default function Header() {
	return (
		<div className="items-center justify-between py-12 md:flex">
			<div className="font-medium text-2xl">
				<Link href="/">Hehehai.cn</Link>
			</div>
			<div className="mt-5 flex items-center space-x-4 md:mt-0">
				<ButtonFadeStyle label="Github" link={siteConfig.github}>
					<IconGithub className="text-2xl" />
				</ButtonFadeStyle>
				<ButtonFadeStyle label="X.com" link={siteConfig.twitter}>
					<IconTwitter className="text-2xl" />
				</ButtonFadeStyle>
				<ButtonThemeToggle />
			</div>
		</div>
	);
}
