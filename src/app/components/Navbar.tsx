// components/NavbarLayout.tsx
"use client";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavbarLayoutProps {
  children: React.ReactNode;
}

const NavbarLayout = ({ children }: NavbarLayoutProps) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">QualiLead</div>

          <nav className="space-x-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/"
              className={clsx("hover:text-primary", {
                "text-primary font-semibold": pathname === "/",
              })}
            >
              Dashboard
            </Link>
            <Link
              href="/leads"
              className={clsx("hover:text-primary", {
                "text-primary font-semibold": pathname.startsWith("/leads"),
              })}
            >
              Leads
            </Link>
            <Link
              href="/analytics"
              className={clsx("hover:text-primary", {
                "text-primary font-semibold": pathname.startsWith("/analytics"),
              })}
            >
              Analytics
            </Link>
            <a href="#" className="hover:text-primary">
              Settings
            </a>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Main page content */}
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};

export default NavbarLayout;
