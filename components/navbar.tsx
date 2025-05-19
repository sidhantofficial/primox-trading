"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="PRIMOX TRADING CO" width={40} height={40} />
          <span className="text-xl font-bold text-black">PRIMOX TRADING CO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
            About Us
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium">
            Products
          </Link>
          <Link href="/infrastructure" className="text-gray-700 hover:text-red-600 font-medium">
            Infrastructure
          </Link>
          <Link href="/global-reach" className="text-gray-700 hover:text-red-600 font-medium">
            Global Reach
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-red-600 font-medium">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-red-600 hover:bg-red-700">Get a Quote</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/infrastructure"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Infrastructure
            </Link>
            <Link
              href="/global-reach"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Global Reach
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full bg-red-600 hover:bg-red-700">Get a Quote</Button>
          </div>
        </div>
      )}
    </header>
  )
}
