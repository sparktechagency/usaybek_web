"use client"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFiltersProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = [
  "All",
  "Beauty esthetics",
  "Restaurant & Catering",
  "Hair stylists",
  "Supermarket malls",
  "Electronic stores",
  "Auto mechanics",
  "Antiques",
  "Medical doctor",
  "Pharmacies",
  "Bookstores",
  "Cafes",
]

function FilterBox({ selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" })
    }
  }

  return (
    <div ref={scrollRef}
  className="flex-1 flex gap-2 overflow-x-auto scroll-smooth px-1 scrollbar-hide">
      {/* Left Scroll Button */}
      <Button
        onClick={scrollLeft}
        variant="outline"
        size="icon"
        className="rounded-full bg-white z-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Scrollable category list */}
      <div
        ref={scrollRef}
        className="flex-1 flex gap-2 overflow-x-auto scroll-smooth px-1"
        style={{ scrollbarWidth: "none" }} // Firefox
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant="outline"
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
              selectedCategory === category
                ? "bg-[#EF4444] text-white"
                : "bg-white text-gray-800 border hover:bg-[#EF4444] hover:text-white"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Right Scroll Button */}
      <Button
        onClick={scrollRight}
        variant="outline"
        size="icon"
        className="rounded-full bg-white z-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default FilterBox
