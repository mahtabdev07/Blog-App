"use client";

import { BookMarked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/", image: "/home-icon.svg" },
  { label: "Blogs", href: "/blogs", image: "/blog-icon.svg" },
  { label: "Saved", href: "/saved", icon: BookMarked },
  { label: "About", href: "/about", image: "/about-icon.svg" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 left-0 z-50 p-4 hidden md:flex">
      <div className="w-full max-w-[90rem] mx-auto">
        <div
          className={`flex items-center ml-0 lg:ml-5 text-black bg-white/70 backdrop-blur-2xl p-0.5 rounded-xl border-2 border-background transition-all duration-500 ease-in-out w-fit`}
          style={{
            boxShadow:
              "0 2px 10px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Left Logo Animation */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isScrolled
                ? "w-20 opacity-100 translate-x-0 scale-100"
                : "w-0 opacity-0 -translate-x-4 scale-95"
            }`}
          >
            <Link
              href="/"
              className="flex items-center gap-2 py-2 px-4 rounded-lg whitespace-nowrap"
            >
              <div className="flex-shrink-0">
                <Image
                  src="/blog-app-logo.svg"
                  alt="Logo"
                  width={60}
                  height={60}
                />
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 hover:bg-black/10 py-2 px-4 rounded-lg whitespace-nowrap transition-all duration-200 ease-in-out"
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`${item.label} icon`}
                    width={24}
                    height={24}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Search Animation */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isScrolled
                ? "w-30 opacity-100 translate-x-0 scale-100"
                : "w-0 opacity-0 translate-x-4 scale-95"
            }`}
          >
            <Link
              href="/search"
              className="flex items-center gap-2 hover:bg-black/10 py-2 px-4 rounded-lg whitespace-nowrap"
            >
              <Image
                src="/search-icon.svg"
                alt="Search icon"
                width={24}
                height={24}
              />
              <span>Search</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
