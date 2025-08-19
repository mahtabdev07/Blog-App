import HeroCarousel from "@/components/home/HeroCarousel";
import PopularBlogs from "@/components/home/PopularBlogs";

export default function HomePage() {
  return (
    <div>
      <section className="absolute inset-0 z-0 ">
        <HeroCarousel />
      </section>
      <section className="mt-52 lg:mt-72">
        <PopularBlogs />
      </section>
    </div>
  );
}
