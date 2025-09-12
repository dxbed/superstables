import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOGS_PATH = path.join(process.cwd(), 'src/blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  tagline: string;
  content: string;
};

export function getBlogSlugs(): string[] {
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((fileName) => fileName.endsWith('.mdx'));
}

export function getBlogBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(BLOGS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    description: data.description || data.intro || '',
    date: data.date || data.published || '',
    author: data.author || '',
    tags: data.tags || [],
    coverImage: data.coverImage || data.image || '',
    featured: data.featured || false,
    tagline: data.tagline || '',
    content: content,
  };
}

export function getAllBlogs(limit?: number): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogBySlug(slug))
    .sort((post1, post2) => {
      const dateA = new Date(post1.date);
      const dateB = new Date(post2.date);
      return dateB.getTime() - dateA.getTime();
    });
  return limit ? posts.slice(0, limit) : posts;
}
