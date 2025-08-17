import Link from "next/link";
import type { PostData } from "@/lib/posts";

interface PostListProps {
  posts: PostData[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <ol className="w-full space-y-2">
      {posts.map((post) => (
        <li className="w-full tracking-[-.01em]" key={post.slug}>
          <div className="inline sm:flex sm:w-full sm:items-baseline sm:justify-between">
            <Link
              className="text-pretty font-mono hover:underline hover:underline-offset-4"
              href={`/blog/${post.slug}`}
            >
              {post.frontmatter.title ?? post.slug}
            </Link>
            {post.frontmatter.date ? (
              <>
                <span className="mx-2 text-foreground/60 sm:hidden">·</span>
                <time
                  className="relative whitespace-nowrap font-mono text-foreground/60 text-xs sm:ml-4"
                  dateTime={post.frontmatter.date}
                >
                  {post.frontmatter.date}
                </time>
              </>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
