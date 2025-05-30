"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Car, Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">LinkRide</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-teal-600">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-teal-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-teal-600">
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-6">
          <Link href="/login">
            <Button variant="outline" className="hidden md:inline-flex">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="hidden bg-teal-600 hover:bg-teal-700 md:inline-flex">Sign Up</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container border-t px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
