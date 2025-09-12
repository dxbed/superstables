import AspectBlogHero from '@/components/sections/aspect-blog-header';
import AspectFeaturedPost from '@/components/sections/aspect-featured-post';
import AspectPostGrid from '@/components/sections/aspect-post-grid';
import AspectSeparator from '@/components/sections/aspect-separator';
import { getAllBlogs } from '@/lib/blog';

export default function BlogPage() {
  const allPosts = getAllBlogs();

  const featuredPost = allPosts.find((post) => post.featured);

  const gridPosts = featuredPost
    ? allPosts.filter((post) => post.slug !== featuredPost.slug)
    : allPosts;

  return (
    <>
      <AspectBlogHero />

      {featuredPost && (
        <AspectFeaturedPost
          tagline={featuredPost.tagline}
          header={featuredPost.title}
          description={featuredPost.description}
          link={`/blog/${featuredPost.slug}`}
          side="L"
          image={featuredPost.coverImage}
        />
      )}

      <AspectSeparator />

      <AspectPostGrid posts={gridPosts} />
    </>
  );
}
