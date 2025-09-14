'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const ITEMS = [
    {
      label: 'Blog',
      href: '/blog',
    },
  ];

  const bgColor = 'bg-obsidian';

  return (
    <header className={cn('relative z-50 h-20 px-2.5 lg:px-0', bgColor)}>
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#cbff00]/20 to-transparent"></div>
      <div className="container flex h-20 items-center">
        <div className="flex w-full items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/layout/logo.png"
              alt="logo"
              width={150}
              height={37}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center">
            <NavigationMenu className="mr-4 hidden items-center gap-8 lg:flex">
              <NavigationMenuList>
                {ITEMS.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-foreground hover:text-muted-foreground p-2 text-sm',
                        pathname === link.href && 'text-muted-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2.5">
              <Link
                href="https://form.typeform.com/to/HkuIZife"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity duration-300 ${isMenuOpen ? 'max-lg:pointer-events-none max-lg:opacity-0' : 'opacity-100'}`}
              >
                <Button size="sm">Get Early Access</Button>
              </Link>
              <Link
                href="https://twitter.com/superstables"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity duration-300 ${isMenuOpen ? 'max-lg:pointer-events-none max-lg:opacity-0' : 'opacity-100'}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Hamburger Menu Button (Mobile Only) */}
              <button
                className="text-muted-foreground relative flex size-8 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'absolute inset-x-0 top-full container flex h-[calc(100vh-80px)] flex-col border-t border-t-transparent px-2.5 lg:px-0',
          'transition duration-300 ease-in-out lg:hidden',
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0',
          bgColor,
        )}
      >
        <div className="h-[calc(100vh-80px)] border-x border-transparent px-5">
          <nav className="mt-6 flex flex-1 flex-col gap-6">
            {ITEMS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-foreground text-lg tracking-[-0.36px]',
                  pathname === link.href && 'text-muted-foreground',
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
