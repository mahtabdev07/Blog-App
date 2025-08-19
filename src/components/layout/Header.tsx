"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-[#2D1616] p-4">
      <div className="flex items-center justify-between gap-4 w-full max-w-[88rem] mx-auto">
        <section className="flex items-center gap-4 flex-1 min-w-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/blog-app-logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="invert"
            />
          </Link>
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 min-w-0 relative max-w-2xl"
          >
            <Input
              type="search"
              placeholder="Search Blogs here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 h-12 pr-14"
            />
            <Button 
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 !h-10 !px-7"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </section>

        <section className="flex items-center gap-3 flex-shrink-0">
          <Link href="/login">
            <Button
              variant="secondary"
              size="lg"
              className="flex items-center gap-2 pl-3 pr-4 py-2"
            >
              <Image
                src="/login-icon.svg"
                alt="login-icon"
                height={24}
                width={24}
                className="invert"
              />
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" className="px-4 py-2">
              Sign Up
            </Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
