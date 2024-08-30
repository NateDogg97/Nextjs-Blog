import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Image from 'next/image';
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogFooter from "@/components/blog/BlogFooter";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOGPOST_QUERY = `*[
  _type == "blogpost" && 
  slug.current == $slug
  ][0]{
  ...,
  author->{
    name,
    image
  },
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
    image,
    excerpt,
    body,
    tags,
    estimatedReadingTime,
  } = blogPost;
  const blogPostImage = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;
  
  // TEMPORARY
  const jumpToLinks = [
    { href: '#what-is-the-backend-api', text: 'What is the Backend API?' },
    { href: '#what-are-clerk-webhooks', text: 'What are Clerk Webhooks?' },
    { href: '#comparing-webhooks-vs-backend-api', text: 'Comparing Webhooks vs Backend API' },
    { href: '#guidance', text: 'Guidance' },
  ];
  // =========

  if (!blogPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mt-12 mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
      <article>
        <header className="mx-auto flex max-w-[50rem] flex-col xl:mx-0">
          <h1 className="mt-6 text-pretty text-4.5xl font-bold text-gray-950">{title}</h1>
          
          <div className="mb-6 text-gray-600">
            <p>By {author.name} | {new Date(publishedAt).toLocaleDateString()}</p>
            <p>Estimated reading time: {estimatedReadingTime} min</p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700">{excerpt}</p>
          </div>
        </header>
        
        <div className="mx-auto mt-12 max-w-[50rem] xl:grid xl:max-w-none xl:grid-cols-[50rem_1fr] xl:items-start xl:gap-x-20">
          <BlogSidebar 
            category="Guides"
            categoryHref="/blog/guides"
            jumpToLinks={jumpToLinks}
          />
          <div>
            {image && (
              <div className="mb-8 relative w-full">
                <Image
                  src={blogPostImage || "https://via.placeholder.com/550x310"}
                  alt={title}
                  width={3200}
                  height={1680}
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg">
              <PortableText value={body} />
            </div>
            
            <BlogFooter 
              authorName={author.name}
              authorImageSrc={author.image}
            />
          </div>
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
    </div>
  );
}