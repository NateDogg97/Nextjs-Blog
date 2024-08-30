import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Image from 'next/image';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string },
}) {
  const blogPost = await sanityFetch<SanityDocument>({
    query: BLOGPOST_QUERY,
    params,
  });
  const {
    title,
    author,
    publishedAt,
    estimatedReadingTime,
    image,
    body,
    tags,
  } = blogPost;
  const blogPostImage = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;

  if (!blogPost) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      
      <div className="mb-6 text-gray-600">
        <p>By {author.name} | {new Date(publishedAt).toLocaleDateString()}</p>
        <p>Estimated reading time: {estimatedReadingTime} min</p>
      </div>
      
      {image && (
        <div className="mb-8 relative w-full h-64">
          <Image
            src={blogPostImage || "https://via.placeholder.com/550x310"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="prose prose-lg">
        <PortableText value={body} />
      </div>
      
      {tags && tags.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
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