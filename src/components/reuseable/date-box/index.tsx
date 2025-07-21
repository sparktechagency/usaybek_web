"use client"
import * as React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Download, ChevronDown } from "lucide-react"

export default function MonthlyBox() {
  const [selectedRange, setSelectedRange] = React.useState<"monthly" | "yearly" | "custom">("monthly")
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth()) // 0-indexed
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear()) // For the year grid selection

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const yearsInGrid = 12 // Number of years to display in the grid

  const handleYearNavigation = (direction: "prev" | "next", tab: "month" | "year") => {
    if (tab === "month") {
      setCurrentYear((prevYear) => (direction === "prev" ? prevYear - 1 : prevYear + 1))
    } else if (tab === "year") {
      setCurrentYear((prevYear) => (direction === "prev" ? prevYear - yearsInGrid : prevYear + yearsInGrid))
    }
  }

  // Generate years for the grid, starting from currentYear backwards
  const getYearsForGrid = () => {
    const years = []
    for (let i = 0; i < yearsInGrid; i++) {
      years.push(currentYear - i)
    }
    return years
  }

  return (
    <div className="flex flex-col items-start relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent border hidden md:block text-blacks rounded-full py-1 h-8 w-[100px] lg:flex space-x-2">
            {selectedRange.charAt(0).toUpperCase() + selectedRange.slice(1)} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[150px] mr-10">
          <DropdownMenuItem onClick={() => setSelectedRange("monthly")}>Monthly</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRange("yearly")}>Yearly</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedRange("custom")}>Custom</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedRange === "custom" && (
        <Card className="mt-4 p-4 w-full max-w-md rounded-xl">
          <Tabs defaultValue="month" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted rounded-md overflow-hidden p-1">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="year"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md px-4 py-2"
              >
                Year
              </TabsTrigger>
            </TabsList>
            <TabsContent value="month" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleYearNavigation("prev", "month")}
                  aria-label="Previous year"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{currentYear}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleYearNavigation("next", "month")}
                  aria-label="Next year"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((month, index) => (
                  <Button
                    key={month}
                    variant={selectedMonth === index ? "default" : "outline"}
                    className={selectedMonth === index ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                    onClick={() => setSelectedMonth(index)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleYearNavigation("prev", "year")}
                  aria-label="Previous block of years"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{currentYear}</span> {/* Displaying the latest year in the block */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleYearNavigation("next", "year")}
                  aria-label="Next block of years"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {getYearsForGrid().map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    className={
                      selectedYear === year ? "bg-red-500 hover:bg-red-600 text-white rounded-full" : "rounded-full"
                    }
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  )
}
