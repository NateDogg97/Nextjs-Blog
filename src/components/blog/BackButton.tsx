import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href, label = "Back to blog" }) => {
  return (
    <div className="relative z-40 mx-auto mt-4 px-6 lg:max-w-[60rem] lg:px-0 xl:max-w-[76rem]">
      <Link href={href} className="group isolate inline-flex items-center gap-2 overflow-hidden rounded-md px-2 py-[0.1875rem] hover:bg-gray-950/5 transition duration-300 ease-[cubic-bezier(.4,.36,0,1)]">
        <span className="relative">
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 flex-none group-hover:-translate-x-6 transition duration-300 ease-[cubic-bezier(.4,.36,0,1)]" aria-hidden="true">
            <path d="M2.75 5L6.25 2.75V7.25L2.75 5Z" fill="#131316" stroke="#131316" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 flex-none translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(.4,.36,0,1)]" aria-hidden="true">
              <path d="M2.75 5L6.25 2.75V7.25L2.75 5Z" fill="#131316" stroke="#131316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
        </span>
        <span className="text-sm font-medium text-gray-950">{label}</span>
      </Link>
    </div>
  );
};

export default BackButton;