"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/information", label: "Information" },
    { href: "/contact", label: "Contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and School Name */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.jpeg"
              alt="Omobola School Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <Link
              href="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Omobola School
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Login Portal Dropdown - Custom Implementation */}
          <div className="hidden md:flex items-center space-x-3">
            {/* <Button asChild variant="outline" className="bg-transparent">
              <Link href="/auth/signup">Create Account</Link>
            </Button> */}

            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Login Portal</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Sign In
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="px-3 py-1 text-xs text-gray-500">
                    Quick Access (Legacy)
                  </div>
                  <Link
                    href="/login/staff"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Staff Portal
                  </Link>
                  <Link
                    href="/login/student"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Student Portal
                  </Link>
                  <Link
                    href="/login/parent"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Parent Portal
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Link
                  href="/auth/signup"
                  className="block px-3 py-2 text-sm font-medium text-primaryBlue hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <div className="text-sm font-medium text-muted-foreground">
                  Quick Access
                </div>
                <Link
                  href="/login/staff"
                  className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Staff Portal
                </Link>
                <Link
                  href="/login/student"
                  className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Student Portal
                </Link>
                <Link
                  href="/login/parent"
                  className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Parent Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
