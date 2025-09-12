import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';

import type { PostFrontmatter } from '@/types/post';

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-2 text-3xl tracking-tight text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground" {...props} />
  ),
};

const POSTS_DIR = path.join(process.cwd(), 'src', 'blog');

export async function getPost(slug: string): Promise<{
  frontmatter: PostFrontmatter;
  mdxContent: React.ReactElement;
}> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(raw);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return { frontmatter: data as PostFrontmatter, mdxContent };
}

export async function getAllSlugs() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw e;
  }
}
