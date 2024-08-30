'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BlogFooterProps {
  authorName: string;
  authorImageSrc: string;
}

const BlogFooter: React.FC<BlogFooterProps> = ({ authorName, authorImageSrc }) => {
  const [copied, setCopied] = useState(false);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <footer className="mx-auto mt-16 flex w-full items-start justify-between gap-x-4 border-t border-gray-950/10 pt-8">
      <div className="flex flex-auto flex-wrap gap-2">
        <div className="flex flex-none">
          <Image
            src={authorImageSrc}
            alt=""
            width={24}
            height={24}
            className="-ml-1 h-6 w-6 flex-none rounded-full ring-[1.5px] ring-gray-50 first:ml-0"
          />
        </div>
        <dl className="relative flex max-w-80 flex-auto flex-wrap items-center text-sm font-book text-gray-950">
          <dt className="sr-only">Author</dt>
          <dd className="whitespace-nowrap">{authorName}</dd>
        </dl>
      </div>
      <button
        className="group inline-flex flex-none items-center gap-2"
        aria-label="Copy link to blog post"
        onClick={copyLinkToClipboard}
      >
        <span className="rounded-full p-1 text-gray-400 transition group-hover:bg-gray-950/10 group-hover:text-gray-950">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M6.5 4.19842L7.10043 3.59799C8.56442 2.134 10.938 2.134 12.402 3.59799C13.866 5.06198 13.866 7.43558 12.402 8.89957L11.8016 9.5M9.5 11.8016L8.89957 12.402C7.43558 13.866 5.06198 13.866 3.59799 12.402C2.134 10.938 2.134 8.56442 3.59799 7.10043L4.19842 6.5M6.5 9.5L9.5 6.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <span className="relative text-sm font-medium text-gray-950">
          <span className={copied ? 'opacity-0' : ''} aria-hidden={copied}>
            Copy link
          </span>
          <span
            className={`absolute inset-0 select-none ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!copied}
          >
            Copied!
          </span>
        </span>
      </button>
    </footer>
  );
};

export default BlogFooter;