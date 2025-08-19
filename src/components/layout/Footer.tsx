import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-muted text-muted-foreground pt-12 pb-8 px-4 rounded-3xl md:rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center mr-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-muted-foreground">
                ModernBlog
              </span>
            </div>
            <p className="text-xs text-muted-foreground/70 mb-3">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex space-x-3 mt-2 justify-center md:justify-start">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 p-2 transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 p-2 transition-colors"
              >
                <FaFacebookF className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 p-2 transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 p-2 transition-colors"
              >
                <FaTwitter className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </div>

          {/* Middle: Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-5 text-muted-foreground/80">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Home
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Explore Blogs
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Categories
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Write a Blog
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  About
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-5 text-muted-foreground/80">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  Contact
                </span>
              </li>
              <li>
                <span className="hover:text-white/80 transition-colors text-sm cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
