"use client"
import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardNav } from "@/components/dashboard-nav"
import { RideCard } from "@/components/ride-card"
import { Calendar, Search, MapPin, DollarSign, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollableTimePicker } from "@/components/scrollable-time-picker"

export default function FindRidePage() {
  const [searchParams, setSearchParams] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    organization: "",
  })

  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [availableRides, setAvailableRides] = useState<any[]>([])

  const handleChange = (name: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (searchParams.pickup && searchParams.dropoff) {
      const simulatedDistance = Math.random() * 20 + 5 
      setDistance(Number.parseFloat(simulatedDistance.toFixed(1)))

      const calculatedFare = 50 + simulatedDistance * 15
      setEstimatedFare(Math.round(calculatedFare))
    } else {
      setEstimatedFare(null)
      setDistance(null)
    }
  }, [searchParams.pickup, searchParams.dropoff])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const query = new URLSearchParams({
    pickup: searchParams.pickup,
    dropoff: searchParams.dropoff,
    date: searchParams.date,
    time: searchParams.time,
    organization: searchParams.organization,
  })

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/rides/?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch rides")
    }

    const data = await response.json()
    console.log("Fetched rides:", data)
    setAvailableRides(data)
  } catch (error) {
    console.error("Search error:", error)
  }
}
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-6 pt-6">
        <div className="container">
          <h1 className="mb-6 text-3xl font-bold">Find a Ride</h1>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <Input
                      id="pickup"
                      placeholder="e.g., University Main Gate"
                      value={searchParams.pickup}
                      onChange={(e) => handleChange("pickup", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dropoff">Drop-off Location</Label>
                    <Input
                      id="dropoff"
                      placeholder="e.g., Downtown Station"
                      value={searchParams.dropoff}
                      onChange={(e) => handleChange("dropoff", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <ScrollableTimePicker
                        value={searchParams.time}
                        onChange={(value) => handleChange("time", value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input
                      id="organization"
                      placeholder="Enter organization name"
                      value={searchParams.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                      <Search className="mr-2 h-4 w-4" />
                      Search Rides
                    </Button>
                  </div>
                </div>

                {distance !== null && estimatedFare !== null && (
                  <div className="mt-4 rounded-lg bg-teal-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Estimated Distance</h3>
                        <p>{distance} km</p>
                      </div>

                      <div className="ml-6 rounded-full bg-teal-100 p-2 text-teal-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium">Estimated Fare</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button">
                                  <Info className="h-4 w-4 text-gray-400" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">
                                  This is your share of the ride cost. LinkRide is a carpooling platform where costs are
                                  shared between passengers. The driver receives 80% of this fare.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p>PKR {estimatedFare}</p>
                        <p className="text-xs text-teal-700">*Actual fare will be calculated using map integration</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Available Rides</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
