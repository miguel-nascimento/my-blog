import Link from "next/link";
import { getPostBySlug, getPostSlugs, type PostData } from "@/lib/posts";

const sortByDate = (a: PostData, b: PostData) => {
  const da = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
  const db = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
  return db - da;
};

export default async function Home() {
  const slugs = await getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    .filter((p) => p !== null)
    .sort(sortByDate);

  return (
    <div className="grid min-h-screen grid-rows-[24px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex w-full max-w-2xl flex-col items-center gap-[32px] sm:items-start">
        <section className="grid w-full grid-cols-2 grid-rows-[2fr,1fr] justify-between">
          <h1 className="font-bold font-sans-jp text-4xl tracking-wider">
            ミゲル.
          </h1>
          <span className="place-self-end text-foreground/60 text-sm" />
          <span className="text-foreground/60 text-sm">Miguel Nascimento</span>
          <div className="flex gap-2 place-self-end">
            <a
              className="text-foreground/60 text-sm underline underline-offset-4 transition-colors hover:text-foreground"
              href="https://x.com/miguelgomes4"
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>
            <a
              className="text-foreground/60 text-sm underline underline-offset-4 transition-colors hover:text-foreground"
              href="https://github.com/miguel-nascimento"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
          </div>
        </section>
        <ol className="w-full list-outside list-decimal space-y-2">
          {posts.map((post) => (
            <li
              className="list-item w-full gap-4 tracking-[-.01em]"
              key={post.slug}
            >
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  className="font-mono hover:underline hover:underline-offset-4"
                  href={`/blog/${post.slug}`}
                >
                  {post.frontmatter.title ?? post.slug}
                </Link>
                {post.frontmatter.date ? (
                  <time
                    className="relative font-mono text-foreground/60 text-xs"
                    dateTime={post.frontmatter.date}
                  >
                    {post.frontmatter.date}
                  </time>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]" />
    </div>
  );
}

const _XIcon = () => (
  <svg aria-hidden="true" fill="white" viewBox="0 0 24 24">
    <path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm9.5 10.2l4.2-6.2H16l-3.2 4.8L10 7h-1.7l4.3 6.5-4.3 6.5H9l3.3-4.9 3.4 4.9h1.6l-4.3-6.3z" />
  </svg>
);
