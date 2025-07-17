"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
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
];

function FilterBox({
  selectedCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 200;
  const [canScroll, setCanScroll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const hasOverflow =
        scrollRef.current.scrollWidth > scrollRef.current.offsetWidth;
      setCanScroll(hasOverflow);
    }
  };
  console.log(canScroll)

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full overflow-hidden">
      {/* Left Scroll Button */}
      <Button
          onClick={scrollLeft}
          variant="outline"
          size="icon"
          className="rounded-full bg-white z-10 flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

      {/* Scrollable category list */}
      <div
        ref={scrollRef}
        className="flex flex-1 gap-2 overflow-x-auto scroll-smooth px-1 min-w-0"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant="outline"
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium flex-shrink-0",
              selectedCategory === category
                ? "bg-[#EF4444] text-white hover:bg-[#EF4444] hover:text-white"
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
          className="rounded-full bg-white z-10 flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
    </div>
  );
}

export default FilterBox;
