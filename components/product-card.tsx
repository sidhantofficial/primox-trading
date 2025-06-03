import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  title: string
  description: string
  image: string
  features: string[]
}

export default function ProductCard({ title, description, image, features }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform hover:scale-[1.02]">
      <div className="relative h-64 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
          Learn More
        </Button>
      </div>
    </div>
  )
}
