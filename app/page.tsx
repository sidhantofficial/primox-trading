"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Eye, X, ArrowRight, Mail, ArrowLeft } from "lucide-react"

// Add this after the imports
interface ProductVariety {
  id: string
  name: string
  image: string
  description: string
  detailedDescription: string
}

interface Product {
  id: number
  name: string
  image: string
  description: string
  detailedDescription: string
  hasVarieties?: boolean
  showVarietiesFirst?: boolean
  varietyImages?: string[]
  varieties?: ProductVariety[]
}

// Product data with descriptions
const products: Product[] = [
  {
    id: 1,
    name: "Fresh Coconut (Semi Husked)",
    image: "/images/coconut-halves.png",
    description:
      "Premium quality fresh coconuts with sweet water and thick white meat. Sourced from the finest coconut farms in India.",
    detailedDescription: `Our raw coconuts are sourced from the finest farms in Pollachi, Tamil Nadu, known for producing the best quality coconuts in India. Each coconut is carefully selected for its freshness, size, and quality.

Features:
• Semi-husked for longer shelf life
• Sweet water with high nutritional value
• Thick white meat perfect for culinary applications
• Naturally grown without harmful chemicals
• Available year-round with consistent quality

Applications:
• Direct consumption of coconut water and meat
• Extraction of virgin coconut oil
• Production of desiccated coconut
• Religious and ceremonial purposes
• Ingredient for various food preparations

We export to countries across Asia, Middle East, Europe, and North America, with proper packaging to ensure freshness during transit. Our coconuts comply with international food safety standards.`,
  },
  {
    id: 2,
    name: "Maize (Cattle Feed)",
    image: "/images/maize-kernels-new.png",
    description:
      "High-quality yellow maize with excellent nutritional value. Non-GMO certified and perfect for various food and feed applications.",
    detailedDescription: `Our premium yellow maize is specifically cultivated for cattle feed applications, offering high energy content and essential nutrients for livestock. Sourced from the fertile plains of Punjab and other northern states of India, our maize undergoes rigorous quality checks to ensure it meets international standards.

Features:
• High energy content with 8-9% protein
• Low moisture content for extended shelf life
• Free from mycotoxins and other contaminants
• Consistent quality across batches
• Non-GMO varieties available on request

Benefits for Cattle:
• Improves milk production in dairy cattle
• Enhances weight gain in beef cattle
• Provides essential carbohydrates and nutrients
• Easy digestibility for better feed conversion ratio
• Supports overall health and immunity

We supply to feed manufacturers, dairy farms, and livestock operations worldwide with flexible packaging options and reliable shipping schedules.`,
  },
  {
    id: 3,
    name: "Green Millet (Cattle Feed)",
    image: "/images/green-millet.png",
    description: "Nutritious green millet grown in ideal conditions. Rich in proteins, minerals, and dietary fiber.",
    detailedDescription: `Our green millet is a nutritional powerhouse cultivated in the pristine agricultural regions of India. This ancient grain is gaining popularity worldwide for its exceptional nutritional profile and versatility in both human consumption and animal feed applications.

Features:
• Naturally grown without pesticides
• High in protein and dietary fiber
• Rich source of essential minerals including iron, calcium, and magnesium
• Low glycemic index making it suitable for diabetic diets
• Gluten-free and easily digestible

Applications:
• Premium cattle and poultry feed ingredient
• Human consumption as an alternative to rice or wheat
• Ingredient in health foods and specialty products
• Brewing of traditional beverages
• Organic farming applications

Our green millet undergoes thorough cleaning, grading, and quality control processes before packaging. We maintain strict traceability throughout our supply chain.`,
  },
  {
    id: 4,
    name: "Onion",
    image: "/images/red-onions.jpg",
    description: "Premium quality Onion, Shallot and Spring Onion.",
    detailedDescription: "", // Removed general description
    hasVarieties: true,
    showVarietiesFirst: true, // New flag to show varieties at the top
    varietyImages: ["/images/red-onions.jpg", "/images/small-shallots.jpg", "/images/spring-onions.jpg"], // Images for slider
    varieties: [
      {
        id: "red-onion",
        name: "Red Onion (Nashik Onion)",
        image: "/images/red-onions.jpg",
        description: "Large-sized onions with deep red skin and strong flavor. Ideal for culinary and industrial use.",
        detailedDescription: `Our premium red onions from Nashik are renowned worldwide for their superior quality, deep red color, and strong pungent flavor. These large-sized onions are perfect for both domestic and industrial applications.

Key Features:
• Deep red skin with white flesh
• Strong, pungent flavor profile
• Large size (60-80mm diameter)
• Excellent storage life (6-8 months)
• High dry matter content
• Rich in antioxidants and sulfur compounds

Quality Specifications:
• Moisture content: 86-88%
• Dry matter: 12-14%
• Pyruvic acid: 12-15 μmol/g
• Storage temperature: 0-4°C
• Relative humidity: 65-70%

Applications:
• Commercial food processing and manufacturing
• Restaurant and hotel industry
• Dehydration and powder production
• Pickle and sauce manufacturing
• Export to international markets
• Retail grocery chains

Our Nashik red onions are carefully graded, sorted, and packed in ventilated bags or cartons to maintain freshness during transportation and storage.`,
      },
      {
        id: "onion-shallot",
        name: "Shallot",
        image: "/images/small-shallots.jpg",
        description: "Compact and flavorful mini onions, perfect for gourmet dishes, sauces, and pickles.",
        detailedDescription: `Our premium small onions (shallots) are compact, flavorful bulbs that pack intense taste in a small package. These gourmet onions are highly valued in international cuisines for their sweet yet pungent flavor.

Key Features:
• Small, uniform size (15-25mm diameter)
• Intense, concentrated flavor
• Purple-red skin with white flesh
• Excellent for whole cooking applications
• Long shelf life with proper storage
• High nutritional density

Quality Specifications:
• Size: 15-25mm diameter
• Moisture content: 85-87%
• Sugar content: Higher than regular onions
• Shelf life: 4-6 months
• Packaging: 5kg, 10kg, 25kg mesh bags

Culinary Applications:
• Gourmet cooking and fine dining
• Pickling and preserving
• Sauce and chutney preparation
• Garnishing and presentation
• Asian and European cuisines
• Caramelizing and roasting

Export Markets:
• Middle East countries
• European Union
• Southeast Asian markets
• North American specialty stores

Our small onions are hand-sorted to ensure uniform size and quality, making them perfect for premium culinary applications.`,
      },
      {
        id: "spring-onion",
        name: "Spring Onion",
        image: "/images/spring-onions.jpg",
        description: "Fresh green stalks with white bulbs, rich in nutrients and widely used in global cuisines.",
        detailedDescription: `Our fresh spring onions feature crisp green stalks and tender white bulbs, offering a mild onion flavor with a fresh, crisp texture. These versatile vegetables are essential ingredients in cuisines worldwide.

Key Features:
• Fresh, crisp green tops
• Tender white bulb base
• Mild, sweet onion flavor
• High water content for freshness
• Rich in vitamins A, C, and K
• Low calorie, high nutrition

Quality Specifications:
• Stalk length: 25-35cm
• Bulb diameter: 8-15mm
• Freshness: Harvested within 24 hours
• Storage: 2-4°C with high humidity
• Shelf life: 7-10 days fresh
• Packaging: Bunched or loose in cartons

Nutritional Benefits:
• High in vitamin C and antioxidants
• Good source of folate and vitamin K
• Contains beneficial sulfur compounds
• Low in calories, high in fiber
• Natural antibacterial properties

Culinary Uses:
• Salads and fresh preparations
• Stir-fries and Asian dishes
• Garnishing and presentation
• Soups and broths
• Grilling and roasting
• Sandwich and wrap fillings

Our spring onions are harvested at peak freshness and immediately cooled to maintain their crisp texture and vibrant color during transport.`,
      },
    ],
  },
]

// Certificate data
const certificates = [
  {
    id: 1,
    name: "APEDA Certificate",
    image: "/certificates/apeda-certificate.png",
    description: "Agricultural and Processed Food Products Export Development Authority",
  },
  {
    id: 2,
    name: "IEC Certificate",
    image: "/certificates/iec-certificate.png",
    description: "Importer-Exporter Code Certificate",
  },
  {
    id: 3,
    name: "Coconut Board Certificate",
    image: "/certificates/coconut-board-certificate.png",
    description: "Coconut Development Board Registration",
  },
]

// Section references for smooth scrolling
const sections = {
  home: "home",
  about: "about",
  products: "products",
  foodSafety: "food-safety",
  contact: "contact",
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCertificate, setShowCertificate] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState(sections.home)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [selectedVariety, setSelectedVariety] = useState<string | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>(null)
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    foodSafety: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  const [shallotImageIndex, setShallotImageIndex] = useState(0)

  // Auto rotate shallot images
  useEffect(() => {
    const shallotProduct = products.find((p) => p.id === 4)
    if (shallotProduct && shallotProduct.varietyImages) {
      const interval = setInterval(() => {
        setShallotImageIndex((prev) => (prev + 1) % shallotProduct.varietyImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [])

  // Handle slider navigation
  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % products.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + products.length) % products.length)
  }

  // Auto play slider
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentSlide])

  // Pause auto play on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  // Resume auto play on mouse leave
  const resumeAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (section) {
      // Add a small timeout to ensure the DOM is ready
      setTimeout(() => {
        const yOffset = -80 // Adjust this value based on your header height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({
          top: y,
          behavior: "smooth",
        })

        // Add a highlight animation for the Food Safety section
        if (sectionId === sections.foodSafety) {
          section.classList.add("highlight-section")
          setTimeout(() => {
            section.classList.remove("highlight-section")
          }, 1500)
        }

        setActiveSection(sectionId)
        setIsMobileMenuOpen(false) // Close mobile menu after navigation
      }, 100)
    }
  }

  // Update active section based on scroll position using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Create an observer for each section
    Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When section is in view with at least 30% visibility
              if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                setActiveSection(sectionId)
              }
            })
          },
          {
            root: null, // viewport
            rootMargin: "-100px 0px -100px 0px", // Adjust based on header height
            threshold: [0.3], // Trigger when 30% of the section is visible
          },
        )

        observer.observe(ref.current)
        observers.push(observer)
      }
    })

    // Cleanup function to disconnect all observers
    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Add CSS for highlight animation
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
    @keyframes highlightSection {
      0% { background-color: rgba(239, 68, 68, 0.1); }
      50% { background-color: rgba(239, 68, 68, 0.2); }
      100% { background-color: rgba(239, 68, 68, 0); }
    }
    .highlight-section {
      animation: highlightSection 1.5s ease-out;
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Open product details modal
  const openProductDetails = (productId: number) => {
    setSelectedProduct(productId)
    setSelectedVariety(null) // Reset variety selection
    setIsProductModalOpen(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Open variety details
  const openVarietyDetails = (varietyId: string) => {
    setSelectedVariety(varietyId)
  }

  // Go back to main product view
  const goBackToProduct = () => {
    setSelectedVariety(null)
  }

  // Close product details modal
  const closeProductDetails = () => {
    setSelectedProduct(null)
    setSelectedVariety(null)
    setIsProductModalOpen(false)
    // Restore body scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <div className="min-h-screen bg-gray-100 font-[Poppins,sans-serif]">
      {/* Header with contact info */}
      <div className="bg-white py-1 px-4 text-right text-sm">
        <span>mail us on </span>
        <a href="mailto:primoxtradingco@gmail.com" className="text-red-600 hover:underline">
          primoxtradingco@gmail.com
        </a>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white py-2 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => scrollToSection(sections.home)}>
            <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden border-2 border-red-500 flex items-center justify-center">
              <Image src="/images/logo.png" alt="PRIMOX TRADING CO" fill className="object-cover p-1" />
            </div>
            <div className="text-xl font-bold">
              <span className="text-black">PRIMOX</span> TRADING CO
            </div>
          </Link>
          <nav className="hidden md:flex">
            <button
              onClick={() => scrollToSection("home")}
              className={`${
                activeSection === "home" ? "bg-red-500 text-white" : "bg-white text-gray-800"
              } px-6 py-3 mx-1 hover:bg-red-600 hover:text-white transition-colors font-medium`}
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`${
                activeSection === "about" ? "bg-red-500 text-white" : "bg-white text-gray-800"
              } px-6 py-3 mx-1 hover:bg-red-600 hover:text-white transition-colors font-medium`}
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className={`${
                activeSection === "products" ? "bg-red-500 text-white" : "bg-white text-gray-800"
              } px-6 py-3 mx-1 hover:bg-red-600 hover:text-white transition-colors font-medium`}
            >
              PRODUCTS
            </button>
            <button
              onClick={() => scrollToSection("foodSafety")}
              className={`${
                activeSection === "foodSafety" ? "bg-red-500 text-white" : "bg-white text-gray-800"
              } px-6 py-3 mx-1 hover:bg-red-600 hover:text-white transition-colors font-medium`}
            >
              FOOD SAFETY & CERTIFICATIONS
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`${
                activeSection === "contact" ? "bg-red-500 text-white" : "bg-white text-gray-800"
              } px-6 py-3 mx-1 hover:bg-red-600 hover:text-white transition-colors font-medium`}
            >
              CONTACT US
            </button>
          </nav>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2 shadow-md">
            <div className="container mx-auto px-4 space-y-2">
              <button
                onClick={() => scrollToSection(sections.home)}
                className={`block w-full text-left py-2 px-4 ${
                  activeSection === sections.home ? "bg-red-500 text-white" : "text-gray-800"
                } rounded hover:bg-red-600 hover:text-white transition-colors font-medium`}
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection(sections.about)}
                className={`block w-full text-left py-2 px-4 ${
                  activeSection === sections.about ? "bg-red-500 text-white" : "text-gray-800"
                } rounded hover:bg-red-600 hover:text-white transition-colors font-medium`}
              >
                ABOUT US
              </button>
              <button
                onClick={() => scrollToSection(sections.products)}
                className={`block w-full text-left py-2 px-4 ${
                  activeSection === sections.products ? "bg-red-500 text-white" : "text-gray-800"
                } rounded hover:bg-red-600 hover:text-white transition-colors font-medium`}
              >
                PRODUCTS
              </button>
              <button
                onClick={() => scrollToSection(sections.foodSafety)}
                className={`block w-full text-left py-2 px-4 ${
                  activeSection === sections.foodSafety ? "bg-red-500 text-white" : "text-gray-800"
                } rounded hover:bg-red-600 hover:text-white transition-colors font-medium`}
              >
                FOOD SAFETY & CERTIFICATIONS
              </button>
              <button
                onClick={() => scrollToSection(sections.contact)}
                className={`block w-full text-left py-2 px-4 ${
                  activeSection === sections.contact ? "bg-red-500 text-white" : "text-gray-800"
                } rounded hover:bg-red-600 hover:text-white transition-colors font-medium`}
              >
                CONTACT US
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <div ref={sectionRefs.home} id="home" className="relative bg-white">
          <div className="container mx-auto px-4 py-4">
            <div
              className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden border-8 border-white shadow-lg"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              ref={sliderRef}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {products.map((product, index) => (
                  <div key={product.id} className="min-w-full h-full relative flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 p-4 md:p-6 max-w-md rounded-lg m-4">
                        <h3 className="text-lg md:text-xl font-bold text-red-600 mb-2">{product.name}</h3>
                        <p className="text-gray-800 text-sm md:text-base">{product.description}</p>
                        <button
                          onClick={() => openProductDetails(product.id)}
                          className="mt-3 flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <button
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-red-500 p-1 md:p-2 text-white hover:bg-red-600 z-10 rounded-full"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              </button>
              <button
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-red-500 p-1 md:p-2 text-white hover:bg-red-600 z-10 rounded-full"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              </button>

              {/* Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {products.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      currentSlide === index ? "bg-red-500" : "bg-white bg-opacity-50"
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Thumbnails */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-white text-sm mb-3">{product.description}</p>
                      <button
                        onClick={() => openProductDetails(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div ref={sectionRefs.about} id="about" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              WELCOME TO <span className="text-black">PRIMOX TRADING CO</span>
            </h2>
            <div className="flex justify-center mb-8">
              <div className="w-32 h-1 bg-red-500 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="PRIMOX TRADING CO"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <p className="text-center max-w-4xl mx-auto mb-6">
              Primox Trading Co is a leading agricultural export company in India, specializing in the export of
              premium-quality raw maize, coconut, green millet, and Onion to international markets.
            </p>
            <p className="text-center max-w-4xl mx-auto mb-6 text-gray-700 leading-relaxed">
              At Primox Trading Co, we are committed to delivering high-grade, pesticide-free, and globally certified
              agricultural products that meet international standards, including Global GAP and Good Agricultural
              Practices (GAP). As trusted raw maize exporters, coconut exporters, green millet suppliers, and shallot
              exporters from India, we have built long-term partnerships with certified farmers to ensure sustainable
              sourcing and consistent quality.
            </p>
            <p className="text-center max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Located at 49, Industrial Development Colony, Jalandhar Punjab -144004 (INDIA), our strategic location
              provides seamless access to major Indian ports like Mundra, Kandla, and Mumbai, allowing for timely and
              efficient global shipments. Our focus on quality assurance, organic sourcing, and timely delivery has
              positioned us as one of the best agri-export companies in India.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div ref={sectionRefs.products} id="products" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Our Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fresh Coconut Section */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <Image
                      src="/images/coconut-halves.png"
                      alt="Coconut"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Fresh Coconut (Semi Husked)</h3>
                </div>
                <div className="relative h-40 md:h-48 mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src="/images/coconut-halves.png"
                    alt="Fresh Coconuts"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4 text-sm md:text-base">
                      Premium quality fresh coconuts with sweet water and thick white meat
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify text-sm md:text-base">
                  We are a leading exporter of premium quality semi-husked coconuts from Pollachi, renowned for their
                  freshness, rich water content, and long shelf life.
                </p>
                <button
                  onClick={() => openProductDetails(1)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-sm md:text-base"
                >
                  View Details
                </button>
              </div>

              {/* Maize Section */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <Image
                      src="/images/maize-kernels-new.png"
                      alt="Maize"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Maize (Cattle Feed)</h3>
                </div>
                <div className="relative h-40 md:h-48 mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src="/images/maize-kernels-new.png"
                    alt="Premium Maize"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4 text-sm md:text-base">
                      High-quality yellow maize perfect for cattle feed and other agricultural applications
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify text-sm md:text-base">
                  We specialize in exporting high-quality yellow maize for cattle feed, sourced directly from the
                  fertile regions of India.
                </p>
                <button
                  onClick={() => openProductDetails(2)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-sm md:text-base"
                >
                  View Details
                </button>
              </div>

              {/* Green Millet Section */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <Image
                      src="/images/green-millet.png"
                      alt="Green Millet"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Green Millet (Cattle Feed)</h3>
                </div>
                <div className="relative h-40 md:h-48 mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src="/images/green-millet.png"
                    alt="Green Millet"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4 text-sm md:text-base">
                      Nutritious green millet rich in proteins, minerals, and dietary fiber
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify text-sm md:text-base">
                  We are trusted exporters of premium quality green millet, known for its high nutritional value and
                  digestibility.
                </p>
                <button
                  onClick={() => openProductDetails(3)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-sm md:text-base"
                >
                  View Details
                </button>
              </div>

              {/* Fresh Shallots Section */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                    <Image
                      src="/images/red-onions.jpg"
                      alt="Fresh Shallots"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">Onion</h3>
                </div>
                <div className="relative h-40 md:h-48 mb-4 overflow-hidden rounded-lg group">
                  {products[3].varietyImages &&
                    products[3].varietyImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === shallotImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Shallot Variety ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4 text-sm md:text-base">
                      Three premium varieties: Red Onion, Shallot, and Spring Onion
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed text-justify text-sm md:text-base">
                  Premium quality Onion with unique characteristics and culinary
                  applications, sourced from India's top growing regions.
                </p>
                <button
                  onClick={() => openProductDetails(4)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors text-sm md:text-base"
                >
                  View Varieties
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
              Why Choose <span className="text-black">PRIMOX TRADING CO</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We maintain strict quality control measures throughout our supply chain to ensure premium products.
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We export our products to multiple countries across the globe with efficient logistics.
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Customization</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We offer customized packaging and product specifications to meet client requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Food Safety Section */}
        <div ref={sectionRefs.foodSafety} id="food-safety" className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-8">Food Safety & Certifications</h2>
            <p className="max-w-4xl mx-auto mb-8 text-gray-700 text-sm md:text-base">
              At PRIMOX TRADING CO, we prioritize food safety and quality assurance. All our products meet international
              standards and are backed by recognized certifications that validate our commitment to excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="w-full sm:w-64 p-4 md:p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">{certificate.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">{certificate.description}</p>
                  <button
                    onClick={() => setShowCertificate(certificate.id)}
                    className="flex items-center text-red-600 hover:text-red-700 text-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" /> View Certificate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div ref={sectionRefs.contact} id="contact" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Contact Us</h2>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-4">Get In Touch With Us</h3>
                <p className="text-gray-600 mb-6">
                  We're here to answer any questions you may have about our products and services.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a
                    href="mailto:primoxtradingco@gmail.com"
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Email Us
                  </a>
                  <a
                    href="https://wa.me/919872856617"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Address</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      49, Industrial Development Colony, Jalandhar Punjab -144004 (INDIA)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Contact Information</h4>
                    <p className="text-gray-600 mb-1">Contact Person: Bhanu Dhand</p>
                    <p className="text-gray-600 mb-1">Phone: +91 98728 56617</p>
                    <p className="text-gray-600">Email: primoxtradingco@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative">
              <button
                onClick={() => setShowCertificate(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 z-10"
                aria-label="Close certificate view"
              >
                <X className="w-6 w-6" />
              </button>
              <div className="p-1">
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                  <Image
                    src={certificates.find((c) => c.id === showCertificate)?.image || ""}
                    alt="Certificate"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative my-8">
              <button
                onClick={closeProductDetails}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 z-10"
                aria-label="Close product details"
              >
                <X className="w-6 w-6" />
              </button>

              {/* Product content */}
              {(() => {
                const product = products.find((p) => p.id === selectedProduct)
                if (!product) return null

                // If a variety is selected, show variety details
                if (selectedVariety && product.varieties) {
                  const variety = product.varieties.find((v) => v.id === selectedVariety)
                  if (!variety) return null

                  return (
                    <div className="p-6">
                      {/* Back button */}
                      <button
                        onClick={goBackToProduct}
                        className="flex items-center text-red-600 hover:text-red-700 mb-4"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to {product.name}
                      </button>

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="relative h-64 w-full rounded-lg overflow-hidden">
                            <Image
                              src={variety.image || "/placeholder.svg"}
                              alt={variety.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">{variety.name}</h2>
                          <p className="text-gray-600 mb-4">{variety.description}</p>
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                            <p className="text-gray-700 whitespace-pre-line">{variety.detailedDescription}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 text-center">
                        <button
                          onClick={() => {
                            closeProductDetails()
                            scrollToSection(sections.contact)
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
                        >
                          Contact Us for Pricing <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )
                }

                // Show main product details
                return (
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="relative h-64 w-full rounded-lg overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>

                        {/* Show varieties first if flag is set */}
                        {product.showVarietiesFirst && product.hasVarieties && product.varieties ? (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Available Varieties</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {product.varieties.map((variety) => (
                                <div
                                  key={variety.id}
                                  className="border border-gray-200 rounded-lg p-4 hover:border-red-500 cursor-pointer transition-colors"
                                  onClick={() => openVarietyDetails(variety.id)}
                                >
                                  <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3">
                                    <Image
                                      src={variety.image || "/placeholder.svg"}
                                      alt={variety.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <h4 className="font-semibold text-sm mb-2">{variety.name}</h4>
                                  <p className="text-xs text-gray-600 mb-3">{variety.description}</p>
                                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                    View Details →
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Show product details if not showing varieties first
                          product.detailedDescription && (
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                              <p className="text-gray-700 whitespace-pre-line">{product.detailedDescription}</p>
                            </div>
                          )
                        )}

                        {/* Show varieties after details for products that don't have showVarietiesFirst */}
                        {!product.showVarietiesFirst && product.hasVarieties && product.varieties && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Available Varieties</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {product.varieties.map((variety) => (
                                <div
                                  key={variety.id}
                                  className="border border-gray-200 rounded-lg p-4 hover:border-red-500 cursor-pointer transition-colors"
                                  onClick={() => openVarietyDetails(variety.id)}
                                >
                                  <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3">
                                    <Image
                                      src={variety.image || "/placeholder.svg"}
                                      alt={variety.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <h4 className="font-semibold text-sm mb-2">{variety.name}</h4>
                                  <p className="text-xs text-gray-600 mb-3">{variety.description}</p>
                                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                                    View Details →
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        onClick={() => {
                          closeProductDetails()
                          scrollToSection(sections.contact)
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center"
                      >
                        Contact Us for Pricing <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                PRIMOX TRADING CO is a leading exporter of premium quality raw maize, coconut, green millet, and fresh
                shallots from India to global markets.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.086 15.409l-3.944-3.943 1.414-1.414 2.53 2.529 5.793-5.793 1.414 1.414-7.207 7.207z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection(sections.home)} className="text-gray-400 hover:text-white">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(sections.about)} className="text-gray-400 hover:text-white">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(sections.products)} className="text-gray-400 hover:text-white">
                    Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(sections.foodSafety)}
                    className="text-gray-400 hover:text-white"
                  >
                    Food Safety & Certifications
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(sections.contact)} className="text-gray-400 hover:text-white">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400 text-sm md:text-base">
                <p className="mb-2">49, Industrial Development Colony, Jalandhar Punjab -144004 (INDIA)</p>
                <p className="mb-2">Contact Person: Bhanu Dhand</p>
                <p className="mb-2">Phone: +91 98728 56617</p>
                <p className="mb-2">Email: primoxtradingco@gmail.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>
              Primox Trading Co – India's Trusted Exporter of Quality Agro Products, Industrial Supplies, Wholesale
              Goods, and Global Trade Solutions for Worldwide Markets.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
