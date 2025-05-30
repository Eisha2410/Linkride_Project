"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { RideCard } from "@/components/ride-card"
import { Car, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const postedRides = [
  {
    id: 1,
    driver: "You",
    pickup: "University Main Gate",
    dropoff: "Downtown Station",
    date: "2025-05-15",
    timeFrom: "08:30",
    timeTo: "09:30",
    seats: 3,
    status: "active",
  },
  {
    id: 2,
    driver: "You",
    pickup: "Tech Park",
    dropoff: "Central Library",
    date: "2025-05-16",
    timeFrom: "09:00",
    timeTo: "10:00",
    seats: 2,
    status: "active",
  },
]

const requestedRides = [
  {
    id: 3,
    driver: "Michael Brown",
    pickup: "North Campus",
    dropoff: "South Mall",
    date: "2025-05-17",
    time: "05:30 PM",
    seats: 4,
    status: "pending",
  },
]

const pastRides = [
  {
    id: 4,
    driver: "Jane Smith",
    pickup: "University Main Gate",
    dropoff: "Downtown Station",
    date: "2025-05-01",
    time: "08:30 AM",
    seats: 0,
    status: "completed",
  },
]

export default function MyRidesPage() {
  const [userRole] = useState("driver") // or "rider"

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-6 pt-6">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Rides</h1>
            {userRole === "driver" && (
              <Link href="/post-ride">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a Ride
                </Button>
              </Link>
            )}
          </div>

          <Tabs defaultValue={userRole === "driver" ? "posted" : "requested"} className="space-y-6">
            <TabsList>
              {userRole === "driver" && <TabsTrigger value="posted">Posted Rides</TabsTrigger>}
              {userRole === "rider" && <TabsTrigger value="requested">Requested Rides</TabsTrigger>}
              <TabsTrigger value="past">Past Rides</TabsTrigger>
            </TabsList>

            {userRole === "driver" && (
              <TabsContent value="posted" className="space-y-6">
                {postedRides.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {postedRides.map((ride) => (
                      <RideCard key={ride.id} ride={ride} isOwner={true} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Car className="mb-4 h-12 w-12 text-gray-300" />
                      <p className="mb-2 text-lg font-medium">No rides posted</p>
                      <p className="mb-6 text-center text-gray-500">You haven't posted any rides yet.</p>
                      <Link href="/post-ride">
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Post a Ride
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}

            {userRole === "rider" && (
              <TabsContent value="requested" className="space-y-6">
                {requestedRides.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {requestedRides.map((ride) => (
                      <RideCard key={ride.id} ride={ride} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Car className="mb-4 h-12 w-12 text-gray-300" />
                      <p className="mb-2 text-lg font-medium">No requested rides</p>
                      <p className="mb-6 text-center text-gray-500">You haven't requested any rides yet.</p>
                      <Link href="/find-ride">
                        <Button className="bg-teal-600 hover:bg-teal-700">Find a Ride</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}

            <TabsContent value="past" className="space-y-6">
              {pastRides.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pastRides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Car className="mb-4 h-12 w-12 text-gray-300" />
                    <p className="mb-2 text-lg font-medium">No past rides</p>
                    <p className="text-center text-gray-500">Your completed rides will appear here.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
