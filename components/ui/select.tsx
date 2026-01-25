"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "appearance-none w-full h-10 rounded-md border border-gray-300 bg-cream px-3 py-2 pr-8 text-sm text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#3e523f] focus:ring-offset-2 transition-colors cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
