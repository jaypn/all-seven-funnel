import "./globals.css";
import type { ReactNode } from "react";
import Image from "next/image";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
            {/* Left: Logo + Name */}
            <a href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                {/* Put your logo here: /public/logo.png */}
                <Image
                  src="/logo.png"
                  alt="All Seven Concrete Ltd"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-bold">All Seven Concrete Ltd</div>
                <div className="text-xs text-gray-500">Edmonton &amp; Surrounding Areas</div>
              </div>
            </a>

            {/* Right: Contact + Nav */}
            <div className="flex items-center gap-5">
              {/* Phone + Email (same line) */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <a
                  href="tel:+17800000000"
                  className="font-semibold text-gray-900 hover:text-red-600 transition"
                >
                  (780) 932-9317
                </a>

                <span className="text-gray-300">|</span>

                <a
                  href="mailto:info@allsevenconcrete.com"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  info@allsevenconcrete.com
                </a>
              </div>

              {/* Nav links */}
              <nav className="flex items-center gap-3">
                <a
                  href="#services"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Services
                </a>

                <a
                  href="#projects"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Projects
                </a>

                <a
                  href="#quote"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Get Free Quote
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}