"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

import Button from "@/components/ui/Button";

export default function NavbarMenu({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Escape key handler
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: { key: string }) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <Button
        onClick={toggleMenu}
        aria-label="Open menu"
        layout="icon-only"
        className="lg:hidden -mr-2 border-none bg-transparent">
        <FaBars aria-hidden="true" />
      </Button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 lg:hidden flex flex-col overflow-hidden bg-(--bg)"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu">
          <div className="flex items-center justify-between gap-16 p-4 md:px-8 border-b border-(--border)">
            <div className="flex items-center space-x-3">
              <Link
                href="https://www.equitex.dev"
                target="_blank"
                className="relative flex w-8 h-8">
                <Image
                  src="/logo-equitex.svg"
                  alt="Equitex Logo"
                  fill
                  className="dark:invert"
                />
              </Link>
              <div
                aria-hidden="true"
                className="w-px h-8 bg-(--border)"></div>
              <Link
                href="/"
                onClick={toggleMenu}
                className="font-heading font-medium text-2xl leading-none">
                LogErr
              </Link>
            </div>
            <Button
              onClick={toggleMenu}
              aria-label="Close menu"
              layout="icon-only"
              className="-mr-2 border-none bg-transparent">
              <FaXmark aria-hidden="true" />
            </Button>
          </div>
          <div className="grow overflow-y-auto">
            <ul className="flex flex-col gap-2 p-2 md:p-4">
              <li>
                <Link
                  href="/docs"
                  onClick={toggleMenu}
                  className="block px-4 py-2 rounded-lg hover:bg-btn-hover transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  onClick={toggleMenu}
                  className="block px-4 py-2 rounded-lg hover:bg-btn-hover transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          {isAuthenticated && (
            <div className="p-4 border-t border-(--border)">
              <Link
                href="/dashboard"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded-lg text-btn text-center bg-fg hover:bg-(--neutral-800) dark:hover:bg-(--neutral-200) transition duration-300">
                Dashboard
              </Link>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex gap-2 p-4 border-t border-(--border)">
              <Link
                href="/auth/sign-in"
                onClick={toggleMenu}
                className="block w-full px-4 py-2 rounded-lg text-btn text-center bg-fg hover:bg-(--neutral-800) dark:hover:bg-(--neutral-200) transition duration-300">
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                onClick={toggleMenu}
                className="block w-full px-4 py-2 rounded-lg text-btn text-center bg-fg hover:bg-(--neutral-800) dark:hover:bg-(--neutral-200) transition duration-300">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
