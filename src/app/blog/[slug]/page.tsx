import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { renderMarkdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.frontmatter.title ?? slug;
  const description = `Post: ${title}`;
  const date = post.frontmatter.date;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const html = await renderMarkdownToHtml(post.content);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="font-sans text-3xl font-bold tracking-wide">
            {post.frontmatter.title ?? slug}
          </h1>
          {post.frontmatter.date ? (
            <p className="text-sm text-zinc-500">{post.frontmatter.date}</p>
          ) : null}
        </header>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
