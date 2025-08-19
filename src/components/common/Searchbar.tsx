"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchbarProps {
  inputClassName?: string;
  buttonClassName?: string;
  variant?: "default" | "secondary";
  invert?: boolean;
}

const Searchbar = ({
  inputClassName = "",
  buttonClassName = "",
  variant = "default",
  invert = false,
}: SearchbarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs here..."
        className={`rounded-xl h-12 px-6 pr-22 transition-all duration-200 ${inputClassName}`}
      />
      <Button
        type="submit"
        variant={variant}
        className={`absolute right-0.5 top-1/2 transform -translate-y-1/2 py-3 px-7 h-10.5 rounded-xl shadow-none ${buttonClassName}`}
      >
        <Image
          src="/search-icon.svg"
          alt="Search icon"
          width={24}
          height={24}
          className={invert ? "invert" : ""}
        />
      </Button>
    </form>
  );
};

export default Searchbar;
