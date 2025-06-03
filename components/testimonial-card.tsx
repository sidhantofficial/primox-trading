import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  company: string
}

export default function TestimonialCard({ quote, author, company }: TestimonialCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg relative">
      <Quote className="h-8 w-8 text-red-500 mb-4 opacity-50" />
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="mt-auto">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-gray-400 text-sm">{company}</p>
      </div>
    </div>
  )
}
