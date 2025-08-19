"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs here..."
        className="search-input focus:border-primary transition duration-150 placeholder:text-foreground/40 bg-foreground/5 rounded-2xl border-foreground/10 h-12 lg:h-14 px-6 pr-22"
      />
      <Button
        type="submit"
        variant="secondary"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 py-3 px-7 h-10 lg:h-12 rounded-2xl bg-foreground/5 border-foreground/10 shadow-none hover:bg-foreground/10"
      >
        <Image
          src="/search-icon.svg"
          alt="Search icon"
          width={24}
          height={24}
        />
      </Button>
    </form>
  );
};

export default Searchbar;
