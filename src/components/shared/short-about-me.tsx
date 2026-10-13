import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { authorProfile } from "@/lib/config/author";

export default function ShortAboutMe() {
  return (
    <section className="home-intro">
      <h1>
        把想法做出来，
        <span className="text-muted-foreground">把过程记下来。</span>
      </h1>
      <p>{authorProfile.intro}</p>
      <p className="text-muted-foreground">{authorProfile.description}</p>
      <Link className="text-link" to="/about">
        认识一下 <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </section>
  );
}
