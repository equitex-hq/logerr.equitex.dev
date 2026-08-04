import Image from "next/image";
import Link from "next/link";

import NavbarMenu from "@/components/common/NavbarMenu";

export default function Navbar() {
  return (
    <header className="sticky z-(--z-sticky) top-0">
      <nav className="border-b border-(--border) bg-(--bg)">
        <div className="flex items-center justify-between gap-16 w-full max-w-7xl mx-auto p-4 md:px-8">
          <div className="flex items-center gap-12">
            <div className="flex items-center space-x-3">
              <Link
                href="https://www.equitex.dev"
                target="_blank"
                className="relative flex w-8 h-8">
                <Image
                  src="/logo-equitex.svg"
                  alt="Equitex Logo"
                  fill
                  priority
                  className="dark:invert"
                />
              </Link>
              <div
                aria-hidden="true"
                className="w-px h-8 bg-(--border)"></div>
              <Link
                href="/"
                className="font-heading font-medium text-2xl leading-none">
                LogErr
              </Link>
            </div>
            <ul className="hidden lg:flex gap-6">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-2 py-1 border border-(--border) rounded-md text-xs bg-(--bg-light) transition-shadow duration-300 hover:shadow">
              Dashboard
            </Link>
            <div className="w-8 h-8 border border-(--border) rounded-full bg-(--bg-light)"></div>
          </div>
          <NavbarMenu />
        </div>
      </nav>
    </header>
  );
}
