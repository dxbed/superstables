import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  {
    title: 'Product',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
    ],
  },
];

const socialLinks = [
  {
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://twitter.com/superstables',
  },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/superstables' },
];

const legal = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Settings', href: '/cookie-policy' },
  { name: 'Terms of Service', href: '/terms' },
];

export const Footer = () => {
  return (
    <footer className="bg-obsidian text-foreground px-2.5 lg:px-0">
      <div className="container p-0">
        <div className="bg-jet grid border-r border-l border-transparent p-0 lg:grid-cols-3">
          {navigation.map((section) => (
            <div
              key={section.title}
              className="border-r-0 border-b border-b-transparent px-6 py-10 lg:border-r lg:border-r-transparent lg:px-8 lg:py-12"
            >
              <h3 className="mb-4 text-2xl font-bold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-muted-foreground transition-colors lg:text-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-b border-b-transparent px-6 py-10 lg:px-8 lg:py-12">
            <div className="flex items-center gap-6 lg:justify-end">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.href}
                  className="hover:text-muted-foreground transition-colors"
                >
                  <link.icon size={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-jet grid border-r border-b border-l border-transparent lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-b-transparent px-6 py-10 lg:max-w-md lg:border-b-0 lg:px-8 lg:py-12">
            <div className="max-w-md">
              <p className="text-foreground text-sm">Regulatory disclaimer</p>
              <p className="font-inter-tight text-mid-gray text-xs">
                Aspect is a financial technology company, not a bank. Banking
                services are provided by partner institutions and are
                FDIC-insured up to applicable limits.
              </p>
            </div>
          </div>
          <div className="flex justify-end px-6 py-10 lg:px-8 lg:py-12">
            <Image
              src="/images/layout/logo.png"
              alt="logo"
              width={329}
              height={52}
            />
          </div>
        </div>
        <div className="bg-jet grid gap-2 border-r border-l border-transparent px-6 py-4 sm:grid-cols-2 lg:px-8">
          <div>
            <p className="text-foreground text-xs">@ 2025 Shadcnblocks.com</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-muted-foreground text-xs underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
