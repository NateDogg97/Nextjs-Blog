import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsNewTwitter as Twitter } from './icons/HugeiconsNewTwitter';
import { HugeiconsLinkedin02 as LinkedIn } from './icons/HugeiconsLinkedIn';
import { HugeiconsDiscord as Discord } from './icons/HugeiconsDiscord';
import { HugeiconsGithub as Github } from './icons/HugeiconsGithub';
import { HugeiconsYoutube as Youtube } from './icons/HugeiconsYoutube';

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Components", href: "/components" },
      { name: "Pricing", href: "/pricing" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Feature requests", href: "/feature-requests" },
    ]
  },
  {
    title: "Developers",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Discord server", href: "/discord" },
      { name: "Support", href: "/support" },
      { name: "Glossary", href: "/glossary" },
      { name: "Changelog", href: "/changelog" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Data Processing Agreement", href: "/dpa" },
      { name: "Cookie manager", href: "#", isButton: true },
    ]
  }
];

const socialLinks = [
  { name: "X", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: LinkedIn},
  { name: "Discord", href: "#", icon: Discord },
  { name: "GitHub", href: "#", icon: Github },
  { name: "YouTube", href: "#", icon: Youtube },
];

const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-24 sm:mt-32" id="site-footer">
      <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-4 xl:grid-cols-3">
          <div className="flex items-start pt-4">
            <div className="relative p-0.5">
              {/* Logo placeholder */}
              <Image src="/logo.svg" alt="Logo" width={62} height={18} />
            </div>
          </div>
          <ul role="list" className="relative z-10 grid grid-cols-2 gap-x-2 gap-y-8 text-sm sm:grid-cols-4 lg:col-span-3 xl:col-span-2">
            {footerLinks.map((section, index) => (
              <li key={index}>
                <div className="font-book text-gray-400">{section.title}</div>
                <ul role="list" className="mt-3 space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.isButton ? (
                        <button className="font-medium transition-colors text-gray-950 hover:text-gray-700">
                          {link.name}
                        </button>
                      ) : (
                        <Link href={link.href} className="font-medium transition-colors text-gray-950 hover:text-gray-700">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative isolate mt-12 flex items-center border-t border-gray-600/10 pb-20 pt-6 text-sm">
          <p className="mr-auto text-gray-600">© 2024 Company, Inc.</p>
          <ul role="list" className="flex gap-5 text-gray-600">
            {socialLinks.map((link, index) => (
                <li key={index}>
                <Link href={link.href} aria-label={link.name} className="block">
                    <link.icon className="h-4 w-4" />
                </Link>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;