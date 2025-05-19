import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="PRIMOX TRADING CO" width={40} height={40} />
              <span className="text-xl font-bold text-white">PRIMOX TRADING CO</span>
            </div>
            <p className="text-sm">
              Premium exporter of maize and coconut products from India to global markets, committed to quality,
              sustainability, and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-red-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/infrastructure" className="hover:text-red-500 transition-colors">
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/global-reach" className="hover:text-red-500 transition-colors">
                  Global Reach
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/maize" className="hover:text-red-500 transition-colors">
                  Yellow Corn
                </Link>
              </li>
              <li>
                <Link href="/products/maize" className="hover:text-red-500 transition-colors">
                  White Maize
                </Link>
              </li>
              <li>
                <Link href="/products/coconut" className="hover:text-red-500 transition-colors">
                  Desiccated Coconut
                </Link>
              </li>
              <li>
                <Link href="/products/coconut" className="hover:text-red-500 transition-colors">
                  Coconut Oil
                </Link>
              </li>
              <li>
                <Link href="/products/coconut" className="hover:text-red-500 transition-colors">
                  Coco Peat
                </Link>
              </li>
              <li>
                <Link href="/products/coconut" className="hover:text-red-500 transition-colors">
                  Coconut Shells
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Jalandhar, Punjab, India</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>info@primoxtradingco.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} PRIMOX TRADING CO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm hover:text-red-500">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:text-red-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
