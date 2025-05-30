"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DashboardNav } from "@/components/dashboard-nav"
import { Calendar, Car, MapPin, DollarSign, Info, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollableTimePicker } from "@/components/scrollable-time-picker"

export default function PostRidePage() {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    seats: "1",
    isRecurring: false,
  })

  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [driverEarnings, setDriverEarnings] = useState<number | null>(null)
  const [appCommission, setAppCommission] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTimeChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isRecurring: checked }))
  }

  // Calculate fare when pickup and dropoff locations change
  useEffect(() => {
    if (formData.pickup && formData.dropoff) {
      // In a real app, this would call a mapping API to get the distance
      // For demo purposes, we'll simulate a distance calculation
      const simulatedDistance = Math.random() * 20 + 5 // Random distance between 5-25 km
      setDistance(Number.parseFloat(simulatedDistance.toFixed(1)))

      // Calculate fare based on distance
      // Base fare: 50 PKR + 15 PKR per km
      const calculatedFare = 50 + simulatedDistance * 15
      setEstimatedFare(Math.round(calculatedFare))

      // Driver gets 80% of the fare
      const earnings = calculatedFare * 0.8
      setDriverEarnings(Math.round(earnings))

      // App commission is 20%
      const commission = calculatedFare * 0.2
      setAppCommission(Math.round(commission))
    } else {
      setEstimatedFare(null)
      setDriverEarnings(null)
      setAppCommission(null)
      setDistance(null)
    }
  }, [formData.pickup, formData.dropoff])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Posting ride with:", formData)
  }

  // Format time for display
  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return ""

    try {
      const [hours, minutes] = timeString.split(":")
      if (!hours || !minutes) return timeString

      const hour = Number.parseInt(hours, 10)
      const minute = Number.parseInt(minutes, 10)

      if (isNaN(hour) || isNaN(minute)) return timeString

      const period = hour >= 12 ? "PM" : "AM"
      const displayHour = hour % 12 || 12

      return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`
    } catch (error) {
      return timeString
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-6 pt-6">
        <div className="container max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">Post a Ride</h1>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <Input
                      id="pickup"
                      name="pickup"
                      placeholder="e.g., University Main Gate"
                      value={formData.pickup}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dropoff">Drop-off Location</Label>
                    <Input
                      id="dropoff"
                      name="dropoff"
                      placeholder="e.g., Downtown Station"
                      value={formData.dropoff}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <Label>Time Available</Label>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="timeFrom" className="text-sm text-gray-500">
                          From
                        </Label>
                        <div className="relative">
                          <ScrollableTimePicker
                            value={formData.timeFrom}
                            onChange={(value) => handleTimeChange("timeFrom", value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="timeTo" className="text-sm text-gray-500">
                          To
                        </Label>
                        <div className="relative">
                          <ScrollableTimePicker
                            value={formData.timeTo}
                            onChange={(value) => handleTimeChange("timeTo", value)}
                          />
                        </div>
                      </div>
                    </div>
                    {formData.timeFrom && formData.timeTo && (
                      <p className="text-xs text-gray-500">
                        You'll be available from {formatTimeForDisplay(formData.timeFrom)} to{" "}
                        {formatTimeForDisplay(formData.timeTo)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="seats">Available Seats</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.seats}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="recurring" checked={formData.isRecurring} onCheckedChange={handleSwitchChange} />
                      <Label htmlFor="recurring">Recurring Ride</Label>
                    </div>
                  </div>
                </div>

                {formData.isRecurring && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-medium">Recurring Options</p>
                    <p className="text-sm text-gray-500">This ride will repeat weekly on the same day and time.</p>
                  </div>
                )}

                {distance !== null && estimatedFare !== null && driverEarnings !== null && appCommission !== null && (
                  <div className="rounded-lg bg-teal-50 p-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">Estimated Distance</h3>
                          <p>{distance} km</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium">Passenger Fare</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button">
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs text-xs">This is what each passenger will pay for the ride.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p>PKR {estimatedFare}</p>
                          <p className="text-xs text-teal-700">*Actual fare will be calculated using map integration</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium">Your Earnings (per passenger)</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button">
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs text-xs">You receive 80% of the fare from each passenger.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p>PKR {driverEarnings}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium">App Commission (per passenger)</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button">
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs text-xs">LinkRide takes a 20% commission from each fare.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p>PKR {appCommission}</p>
                        </div>
                      </div>

                      <div className="rounded-lg bg-teal-100 p-3">
                        <p className="font-medium">
                          Total potential earnings: PKR {driverEarnings * Number.parseInt(formData.seats)}
                        </p>
                        <p className="text-sm text-gray-600">If all {formData.seats} seats are filled</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  <Car className="mr-2 h-4 w-4" />
                  Post Ride
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
