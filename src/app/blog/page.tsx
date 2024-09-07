import React from 'react';
import { sanityFetch } from "@/sanity/client";
import BlogPostItem, { BlogPost } from '@/components/blog/BlogPostItem';

const BLOGPOSTS_QUERY = `*[
  _type == "blogpost"
  && defined(slug.current)
] | order(publishedAt desc)[0...3] {
  _id,
  image,
  title,
  excerpt,
  slug,
  publishedAt
}`;

export default async function HomePage({
  params,
}: {
  params: { slug: string };
}) {
  const blogPosts = await sanityFetch<BlogPost[]>({
    query: BLOGPOSTS_QUERY,
    params,
  });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">

      {/* Recent blog posts section */}
      <section className="recent-posts">
        <h2 className="text-3xl font-semibold mb-6">Recent Blog Posts</h2>
        <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {blogPosts.map((blogPost) => (
            <BlogPostItem key={blogPost._id} blogPost={blogPost} />
          ))}
        </ul>
      </section>
    </main>
  );
}