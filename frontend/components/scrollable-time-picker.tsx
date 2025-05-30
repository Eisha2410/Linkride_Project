"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ScrollableTimePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ScrollableTimePicker({ value, onChange, className }: ScrollableTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Parse initial value or set defaults
  const [hour, setHour] = useState(() => {
    if (!value) return new Date().getHours() % 12 || 12
    try {
      const [hours] = value.split(":")
      const hourNum = Number.parseInt(hours, 10)
      return hourNum % 12 || 12
    } catch (e) {
      return new Date().getHours() % 12 || 12
    }
  })

  const [minute, setMinute] = useState(() => {
    if (!value) return new Date().getMinutes()
    try {
      const [, minutes] = value.split(":")
      return Number.parseInt(minutes, 10) || 0
    } catch (e) {
      return new Date().getMinutes()
    }
  })

  const [period, setPeriod] = useState(() => {
    if (!value) return new Date().getHours() >= 12 ? "PM" : "AM"
    try {
      const [hours] = value.split(":")
      const hourNum = Number.parseInt(hours, 10)
      return hourNum >= 12 ? "PM" : "AM"
    } catch (e) {
      return new Date().getHours() >= 12 ? "PM" : "AM"
    }
  })

  // Refs for scroll containers
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const periodRef = useRef<HTMLDivElement>(null)

  // Generate arrays for hours, minutes, and periods
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const periods = ["AM", "PM"]

  // Format time for display
  const formatTimeForDisplay = (h: number, m: number, p: string) => {
    return `${h}:${m.toString().padStart(2, "0")} ${p}`
  }

  // Update the parent component when time changes
  useEffect(() => {
    const formattedHour = period === "PM" && hour !== 12 ? hour + 12 : period === "AM" && hour === 12 ? 0 : hour
    const formattedMinute = minute.toString().padStart(2, "0")
    const timeString = `${formattedHour.toString().padStart(2, "0")}:${formattedMinute}`

    // Only call onChange if the formatted time is different from the current value
    // This prevents the infinite update loop
    if (timeString !== value) {
      onChange(timeString)
    }
  }, [hour, minute, period, onChange, value])

  // Scroll to the selected value when component opens
  useEffect(() => {
    if (isOpen) {
      if (hourRef.current) {
        const hourElement = hourRef.current.querySelector(`[data-value="${hour}"]`)
        if (hourElement) {
          hourRef.current.scrollTop = (hourElement as HTMLElement).offsetTop - 80
        }
      }

      if (minuteRef.current) {
        const minuteElement = minuteRef.current.querySelector(`[data-value="${minute}"]`)
        if (minuteElement) {
          minuteRef.current.scrollTop = (minuteElement as HTMLElement).offsetTop - 80
        }
      }

      if (periodRef.current) {
        const periodElement = periodRef.current.querySelector(`[data-value="${period}"]`)
        if (periodElement) {
          periodRef.current.scrollTop = (periodElement as HTMLElement).offsetTop - 80
        }
      }
    }
  }, [isOpen, hour, minute, period])

  // Handle scroll events to snap to values
  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    values: number[] | string[],
    setter: (value: any) => void,
  ) => {
    if (!ref.current) return

    const scrollTop = ref.current.scrollTop
    const itemHeight = 40 // Height of each item
    const index = Math.round((scrollTop + 80) / itemHeight)

    if (index >= 0 && index < values.length) {
      setter(values[index])
    }
  }

  // Close the picker when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const pickerElement = document.getElementById("time-picker")
      if (pickerElement && !pickerElement.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div id="time-picker" className={className}>
      {!isOpen ? (
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setIsOpen(true)}
        >
          <Clock className="mr-2 h-4 w-4 text-gray-500" />
          {value ? formatTimeForDisplay(hour, minute, period) : "Select time"}
        </Button>
      ) : (
        <div className="flex items-center justify-center rounded-md border bg-background">
          {/* Hour Selector */}
          <div className="relative flex flex-1 flex-col items-center">
            <button
              type="button"
              className="absolute top-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setHour((prev) => (prev === 12 ? 1 : prev + 1))
                if (hourRef.current) {
                  const hourElement = hourRef.current.querySelector(`[data-value="${hour === 12 ? 1 : hour + 1}"]`)
                  if (hourElement) {
                    hourRef.current.scrollTop = (hourElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronUp className="mx-auto h-5 w-5" />
            </button>
            <div
              ref={hourRef}
              className="h-[160px] w-full overflow-y-auto scrollbar-hide"
              onScroll={() => handleScroll(hourRef, hours, setHour)}
            >
              <div className="py-[60px]">
                {hours.map((h) => (
                  <div
                    key={`hour-${h}`}
                    data-value={h}
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-center text-lg transition-colors",
                      h === hour ? "font-bold text-primary" : "text-gray-500",
                    )}
                    onClick={() => {
                      setHour(h)
                      if (hourRef.current) {
                        hourRef.current.scrollTop =
                          (hourRef.current.querySelector(`[data-value="${h}"]`) as HTMLElement).offsetTop - 80
                      }
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setHour((prev) => (prev === 1 ? 12 : prev - 1))
                if (hourRef.current) {
                  const hourElement = hourRef.current.querySelector(`[data-value="${hour === 1 ? 12 : hour - 1}"]`)
                  if (hourElement) {
                    hourRef.current.scrollTop = (hourElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronDown className="mx-auto h-5 w-5" />
            </button>
          </div>

          <div className="text-xl font-bold">:</div>

          {/* Minute Selector */}
          <div className="relative flex flex-1 flex-col items-center">
            <button
              type="button"
              className="absolute top-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setMinute((prev) => (prev === 59 ? 0 : prev + 1))
                if (minuteRef.current) {
                  const minuteElement = minuteRef.current.querySelector(
                    `[data-value="${minute === 59 ? 0 : minute + 1}"]`,
                  )
                  if (minuteElement) {
                    minuteRef.current.scrollTop = (minuteElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronUp className="mx-auto h-5 w-5" />
            </button>
            <div
              ref={minuteRef}
              className="h-[160px] w-full overflow-y-auto scrollbar-hide"
              onScroll={() => handleScroll(minuteRef, minutes, setMinute)}
            >
              <div className="py-[60px]">
                {minutes.map((m) => (
                  <div
                    key={`minute-${m}`}
                    data-value={m}
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-center text-lg transition-colors",
                      m === minute ? "font-bold text-primary" : "text-gray-500",
                    )}
                    onClick={() => {
                      setMinute(m)
                      if (minuteRef.current) {
                        minuteRef.current.scrollTop =
                          (minuteRef.current.querySelector(`[data-value="${m}"]`) as HTMLElement).offsetTop - 80
                      }
                    }}
                  >
                    {m.toString().padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setMinute((prev) => (prev === 0 ? 59 : prev - 1))
                if (minuteRef.current) {
                  const minuteElement = minuteRef.current.querySelector(
                    `[data-value="${minute === 0 ? 59 : minute - 1}"]`,
                  )
                  if (minuteElement) {
                    minuteRef.current.scrollTop = (minuteElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronDown className="mx-auto h-5 w-5" />
            </button>
          </div>

          {/* AM/PM Selector */}
          <div className="relative flex flex-1 flex-col items-center">
            <button
              type="button"
              className="absolute top-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setPeriod((prev) => (prev === "AM" ? "PM" : "AM"))
                if (periodRef.current) {
                  const periodElement = periodRef.current.querySelector(
                    `[data-value="${period === "AM" ? "PM" : "AM"}"]`,
                  )
                  if (periodElement) {
                    periodRef.current.scrollTop = (periodElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronUp className="mx-auto h-5 w-5" />
            </button>
            <div
              ref={periodRef}
              className="h-[160px] w-full overflow-y-auto scrollbar-hide"
              onScroll={() => handleScroll(periodRef, periods, setPeriod)}
            >
              <div className="py-[60px]">
                {periods.map((p) => (
                  <div
                    key={`period-${p}`}
                    data-value={p}
                    className={cn(
                      "flex h-10 cursor-pointer items-center justify-center text-lg transition-colors",
                      p === period ? "font-bold text-primary" : "text-gray-500",
                    )}
                    onClick={() => {
                      setPeriod(p)
                      if (periodRef.current) {
                        periodRef.current.scrollTop =
                          (periodRef.current.querySelector(`[data-value="${p}"]`) as HTMLElement).offsetTop - 80
                      }
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-0 z-10 w-full text-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                setPeriod((prev) => (prev === "AM" ? "PM" : "AM"))
                if (periodRef.current) {
                  const periodElement = periodRef.current.querySelector(
                    `[data-value="${period === "AM" ? "PM" : "AM"}"]`,
                  )
                  if (periodElement) {
                    periodRef.current.scrollTop = (periodElement as HTMLElement).offsetTop - 80
                  }
                }
              }}
            >
              <ChevronDown className="mx-auto h-5 w-5" />
            </button>
          </div>

          {/* Done button */}
          <Button
            type="button"
            size="sm"
            className="absolute -bottom-10 right-0 bg-teal-600 hover:bg-teal-700"
            onClick={() => setIsOpen(false)}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  )
}
