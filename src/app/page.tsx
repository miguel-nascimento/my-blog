import { PostList } from "@/components/PostList";
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
    <div className="grid min-h-screen grid-rows-[1fr_3fr_20px] items-center justify-items-center gap-16 p-8 pb-4 font-sans sm:p-20 sm:pb-10">
      <main className="row-start-1 flex w-full max-w-2xl flex-col items-center gap-8 sm:items-start sm:gap-[32px]">
        <section className="flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 sm:grid-rows-[2fr,1fr] sm:justify-between sm:gap-0">
          <h1 className="font-bold font-sans-jp text-4xl tracking-wider">
            ミゲル.
          </h1>
          <span className="hidden place-self-end text-foreground/60 text-sm sm:block" />
          <span className="text-foreground/60 text-sm">Miguel Nascimento</span>
          <div className="flex gap-2 sm:place-self-end">
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
      </main>
      <div className="w-full max-w-2xl self-start">
        <PostList posts={posts} />
      </div>

      {/* <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <span className="text-foreground/60 text-sm">
          {new Date().getFullYear()}
        </span>
      </footer> */}
    </div>
  );
}
