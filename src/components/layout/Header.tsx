"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Searchbar from "../common/Searchbar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils";
import { Suspense } from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoggingOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`${
        pathname === "/" ? "bg-transparent" : "bg-[#2D1616]"
      } p-4 z-50`}
    >
      <div className="flex items-center justify-between gap-4 w-full max-w-[88rem] mx-auto">
        <section className="flex items-center gap-7 flex-1 min-w-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/blog-app-logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="invert"
            />
          </Link>
          {!pathname.startsWith("/search") && (
            <Suspense
              fallback={
                <div className="hidden md:flex w-full max-w-2xl h-12 bg-white/20 rounded-xl animate-pulse" />
              }
            >
              <Searchbar
                inputClassName="border-2 border-white/30 bg-white/40 backdrop-blur-md placeholder:text-white/60 placeholder:font-normal text-white/90 hover:bg-white/50 focus:bg-white/50 nav-input hidden md:flex"
                invert={true}
                buttonClassName="hidden md:flex"
              />
            </Suspense>
          )}
        </section>

        <section className="flex items-center gap-3 flex-shrink-0">
          {isAuthenticated && user ? (
            <>
              {pathname !== "/blogs/create" && pathname !== "/my-blogs" && (
                <Link href="/blogs/create">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 h-10  bg-white/40 hover:bg-white/50 text-white/90 hover:text-white/90 border-none shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    Create Blog
                  </Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 hover:bg-white/40"
                  >
                    <Avatar className="h-10 w-10 border-2 border-white/40">
                      <AvatarImage
                        src={user.profilePic || ""}
                        alt={user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-white/40 text-white font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-background/95 backdrop-blur-md border-white/20"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-foreground/50">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 cursor-pointer text-foreground hover:text-foreground"
                    >
                      <User className="h-4 w-4 text-foreground" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/20" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50/10"
                  >
                    <LogOut className="h-4 w-4 text-foreground" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 pl-3 pr-4 py-2 bg-white/40 hover:bg-white/50"
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
            </>
          )}
        </section>
      </div>
    </header>
  );
};

export default Header;
