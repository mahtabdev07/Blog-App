import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex items-center justify-between w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/auth-bg.jpeg"
          alt="auth-bg"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <section className="hidden lg:flex relative z-10 items-center justify-center w-1/2">
        <div className="text-center space-y-4">
          <Image
            src="/blog-app-logo.svg"
            alt="Blog App Logo"
            width={130}
            height={130}
            className="invert mx-auto"
          />
          <div className="text-white/90 max-w-md">
            <h2 className="text-2xl font-bold mb-2">Join Our Community!</h2>
            <p className="text-lg">Start your blogging journey today</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 flex flex-col items-center justify-center w-full lg:w-1/2 px-6">
        <div className="w-full max-w-lg space-y-4">
          <Link href="/">
            <Button
              variant="outline"
              className="mb-4 bg-transparent text-white border-none hover:bg-white/10 hover:text-white backdrop:blur-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
