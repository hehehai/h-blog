import NextLink from "next/link";

export default function HomeAboutMe() {
  return (
    <div className="max-w-xl">
      <article className="prose">
        <h2 className="font-bold">
          要努力
        </h2>
        <p>
          全栈开发一位，主要是 Javascript 体系。寻找编程的快乐！
        </p>
      </article>
      <div className="mt-3">
        <NextLink href="/about">
          <a className="text-slate-700 underline underline-offset-8 decoration-2 decoration-slate-500 hover:decoration-dotted">
            我的故事 _
          </a>
        </NextLink>
      </div>
    </div>
  );
}
