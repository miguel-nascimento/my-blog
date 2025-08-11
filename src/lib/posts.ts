import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import toml from "toml";
import * as v from "valibot";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const frontmatterSchema = v.object({
  title: v.string(),
  date: v.pipe(v.string(), v.regex(/\d{4}-\d{2}-\d{2}/, "Expected YYYY-MM-DD")),
});

export interface PostData {
  slug: string;
  frontmatter: v.InferOutput<typeof frontmatterSchema>;
  content: string;
}

export async function getPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  return entries
    .filter(
      (e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("_")
    )
    .map((e) => e.name.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const matter_result = matter(raw, {
      delimiters: "+++",
      language: "toml",
      engines: { toml: (s: string) => toml.parse(s) },
    });

    const frontmatter = v.parse(frontmatterSchema, matter_result.data ?? {});

    return {
      slug,
      frontmatter,
      content: matter_result.content ?? "",
    };
  } catch {
    return null;
  }
}
