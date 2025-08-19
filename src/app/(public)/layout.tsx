import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Navbar />
      <main className="w-full max-w-[92rem] mx-auto mt-5 lg:mt-8 px-4 lg:px-8 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
