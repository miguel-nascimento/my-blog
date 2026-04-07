import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { renderMarkdownToHtml } from '@/lib/markdown';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';

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
  if (!post) {
    return {};
  }
  const title = post.frontmatter.title ?? slug;
  const description = `Post: ${title}`;
  const date = post.frontmatter.date;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
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
  if (!post) {
    return notFound();
  }

  const html = await renderMarkdownToHtml(post.content);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <article className="prose dark:prose-invert max-w-none prose-a:underline-offset-2 prose-blockquote:border-foreground/25 prose-code:bg-foreground/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-[0.875em] prose-code:font-mono prose-code:[box-decoration-break:clone] prose-pre:border prose-pre:border-foreground/10 prose-pre:rounded-lg prose-pre:px-5 prose-pre:py-4 prose-pre:text-[0.875em] prose-pre:leading-[1.7]">
        <header className="mb-8">
          <h1 className="font-bold font-sans text-3xl tracking-wide">
            {post.frontmatter.title ?? slug}
          </h1>
          {post.frontmatter.date ? (
            <p className="text-foreground/50 text-sm">{post.frontmatter.date}</p>
          ) : null}
        </header>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: is there any other way to do a blog? 🤷 */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
