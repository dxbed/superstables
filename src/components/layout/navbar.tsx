'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
    <header
      className={cn(
        'relative z-50 h-20 px-2.5 lg:px-0',
        bgColor,
      )}
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cbff00]/20 to-transparent"></div>
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
                {ITEMS.map((link) =>
                  link.dropdownItems ? (
                    <NavigationMenuItem key={link.label} className="text-sm">
                      <NavigationMenuTrigger
                        className={cn(
                          'text-foreground bg-transparent text-sm font-normal',
                          'hover:bg-transparent focus:bg-transparent active:bg-transparent',
                          'hover:text-muted-foreground focus:text-muted-foreground',
                          'data-[state=open]:text-muted-foreground data-[state=open]:bg-transparent',
                          'transition-none',
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn('bg-obsidian rounded-md')}
                      >
                        <ul className="bg-obsidian w-[400px] p-3">
                          {link.dropdownItems.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-dark-gray flex items-center rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                                >
                                  <div className="flex gap-2">
                                    <item.icon className="text-mid-gray size-4 shrink-0" />

                                    <div className="space-y-1.5">
                                      <div className="text-foreground text-sm leading-none font-medium">
                                        {item.title}
                                      </div>
                                      <p className="text-mid-gray line-clamp-2 text-sm leading-tight">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
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
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className={`transition-opacity duration-300 ${isMenuOpen ? 'max-lg:pointer-events-none max-lg:opacity-0' : 'opacity-100'}`}
              >
                <Button size="sm">Login</Button>
              </Link>
              <Link
                href="https://twitter.com/superstables"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-opacity duration-300 ${isMenuOpen ? 'max-lg:pointer-events-none max-lg:opacity-0' : 'opacity-100'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground hover:text-foreground transition-colors">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
          'border-t-transparent absolute inset-x-0 top-full container flex h-[calc(100vh-80px)] flex-col border-t px-2.5 lg:px-0',
          'transition duration-300 ease-in-out lg:hidden',
          isMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0',
          bgColor,
        )}
      >
        <div className="border-transparent h-[calc(100vh-80px)] border-x px-5">
          <nav className="mt-6 flex flex-1 flex-col gap-6">
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <div key={link.label} className="">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label,
                      )
                    }
                    className="text-foreground flex w-full items-center justify-between text-lg tracking-[-0.36px]"
                    aria-label={`${link.label} menu`}
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform',
                        openDropdown === link.label ? 'rotate-90' : '',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={cn(
                      'border-b-transparent ml-1 space-y-3 overflow-hidden border-b transition-all',
                      openDropdown === link.label
                        ? 'mt-3 max-h-[1000px] pb-6 opacity-100'
                        : 'max-h-0 opacity-0',
                    )}
                  >
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="hover:bg-accent flex items-start gap-3 rounded-md p-2"
                      >
                        <item.icon className="text-mid-gray size-6 shrink-0" />
                        <div>
                          <div className="text-foreground font-medium">
                            {item.title}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
