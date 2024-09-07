import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface BlogPost extends SanityDocument {
  _id: string;
  image: SanityImageSource;
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
}

const BlogPostItem = React.memo(({ blogPost }: { blogPost: BlogPost }) => (
  <li className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
    <Link href={`/blog/${blogPost.slug.current}`} className="block">
      {blogPost.image && (
        <div className="relative w-full h-48">
          <Image
            src={urlFor(blogPost.image)?.url() || "https://via.placeholder.com/550x310"}
            alt={blogPost.title}
            className="w-full h-full object-cover"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{blogPost.title}</h2>
        <p className="text-gray-500 mt-2">
          {new Date(blogPost.publishedAt).toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-700">{blogPost.excerpt}</p>
      </div>
    </Link>
  </li>
));

export default BlogPostItem;
export type { BlogPost };