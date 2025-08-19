import LoadingSpinner from "@/components/common/LoadingSpinner";
import Searchbar from "@/components/common/Searchbar";
import SearchResults from "@/components/search/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <section className="my-3 lg:my-6 flex flex-col gap-3 lg:gap-6">
      <h1 className="font-extrabold text-3xl lg:text-5xl text-foreground">
        Search
      </h1>

      <Searchbar
        inputClassName="bg-foreground/5 border-foreground/10 placeholder:text-foreground/40 search-input"
        variant="secondary"
        invert={false}
        buttonClassName="bg-foreground/5 border-foreground/10 hover:bg-foreground/10"
      />

      <Suspense fallback={<LoadingSpinner />}>
        <SearchResults searchQuery={q} />
      </Suspense>
    </section>
  );
}
