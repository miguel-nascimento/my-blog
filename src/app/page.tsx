import Link from "next/link";
import { getPostSlugs, getPostBySlug, type PostData } from "@/lib/posts";

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
    <div className="font-sans grid grid-rows-[24px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-4xl font-bold font-sans-jp tracking-wider">
          ミゲル.
        </h1>
        <ol className="w-full list-decimal list-inside space-y-2 text-left">
          {posts.map((post) => (
            <li key={post.slug} className="tracking-[-.01em]">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-mono hover:underline hover:underline-offset-4"
                >
                  {post.frontmatter.title ?? post.slug}
                </Link>
                {post.frontmatter.date ? (
                  <span className="font-mono text-xs text-zinc-500">
                    {post.frontmatter.date}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
