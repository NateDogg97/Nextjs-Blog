import React from 'react';
import { sanityFetch } from "@/sanity/client";
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const BLOGPOST_QUERY = `*[_type == "blogpost" && slug.current == $slug][0] {
  title,
  slug,
  author->{
    name,
    image
  },
  publishedAt,
  image,
  body,
  tags,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
}`;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

interface BlogPost {
  title: string;
  author: {
    name: string;
    image: any;
  };
  publishedAt: string;
  image: any;
  body: any;
  tags: string[];
  estimatedReadingTime: number;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogPost: BlogPost | null = await sanityFetch({
    query: BLOGPOST_QUERY,
    params: { slug: params.slug },
  });

  if (!blogPost) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      
      <div className="mb-6 text-gray-600">
        <p>By {blogPost.author.name} | {new Date(blogPost.publishedAt).toLocaleDateString()}</p>
        <p>Estimated reading time: {blogPost.estimatedReadingTime} min</p>
      </div>
      
      {blogPost.image && (
        <div className="mb-8 relative w-full h-64">
          <Image
            src={urlFor(blogPost.image).url()}
            alt={blogPost.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="prose prose-lg">
        <PortableText value={blogPost.body} />
      </div>
      
      {blogPost.tags && blogPost.tags.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}