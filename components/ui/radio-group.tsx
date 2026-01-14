"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        className={cn("space-y-3", className)}
        ref={ref}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              checked: child.props.value === value,
              onSelect: () => onValueChange?.(child.props.value),
            })
          }
          return child
        })}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioCardProps {
  value: string
  checked?: boolean
  onSelect?: () => void
  children: React.ReactNode
}

const RadioCard = React.forwardRef<HTMLButtonElement, RadioCardProps>(
  ({ className, value, checked, onSelect, children, ...props }, ref) => {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full p-4 border-2 rounded-lg text-left transition-all",
          checked
            ? "border-[#3e523f] bg-[#3e523f]/5"
            : "border-gray-300 hover:border-gray-400",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
RadioCard.displayName = "RadioCard"

export { RadioGroup, RadioCard }
