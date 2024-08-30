import React from 'react';
import Link from 'next/link';

interface JumpToLink {
  href: string;
  text: string;
}

interface BlogSidebarProps {
  category: string;
  categoryHref: string;
  jumpToLinks: JumpToLink[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ category, categoryHref, jumpToLinks }) => {
  return (
    <aside className="sticky top-12 order-last hidden xl:block">
      <dl>
        <dt className="sr-only">Category</dt>
        <dd className="flex">
          <Link href={categoryHref} className="rounded-full bg-gray-950 px-2 py-[0.0625rem] text-sm font-medium text-white">
            {category}
          </Link>
        </dd>
      </dl>
      <h2 className="mt-10 text-sm font-medium text-gray-950">Jump to</h2>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-px bg-gray-950/10"></div>
        <div className="absolute inset-y-0 left-0 w-px origin-top bg-gray-950" style={{ transform: 'scaleY(0)' }}></div>
        <ol role="list" className="pl-4 text-sm font-medium text-gray-950">
          {jumpToLinks.map((link, index) => (
            <li key={index} className="mt-2">
              <Link href={link.href} className="transition-colors hover:text-gray-700">
                {link.text}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default BlogSidebar;