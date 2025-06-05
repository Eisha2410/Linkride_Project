"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RideCard } from "@/components/ride-card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Bell, Calendar, Car, MessageSquare } from "lucide-react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) router.push("/login");
}, []);

// Mock data for demonstration
const recommendedRides = [
  {
    id: 1,
    driver: "John Doe",
    pickup: "University Main Gate",
    dropoff: "Downtown Station",
    date: "2025-05-15",
    time: "08:30 AM",
    seats: 3,
    distance: 12.5,
    fare: 250,
  },
  {
    id: 2,
    driver: "Jane Smith",
    pickup: "Tech Park",
    dropoff: "Central Library",
    date: "2025-05-16",
    time: "09:00 AM",
    seats: 2,
    distance: 8.3,
    fare: 180,
  },
]

const myRides = [
  {
    id: 3,
    driver: "You",
    pickup: "North Campus",
    dropoff: "South Mall",
    date: "2025-05-17",
    time: "05:30 PM",
    seats: 4,
    status: "active",
    distance: 15.7,
    fare: 320,
  },
]

export default function DashboardPage() {
  const [user] = useState({
    name: "Alex Johnson",
    role: "rider", // or "driver"
    cellNumber: "+92 300 1234567",
    whatsappNumber: "+92 300 1234567",
    shareContact: true,
  })

  return (
    <div className="flex min-h-screen">
      <DashboardNav userRole={user.role as "driver" | "rider"} />
      <main className="flex-1 p-6 pt-6">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rides">My Rides</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                    <Car className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-2">
                      {user.role === "rider" ? (
                        <Link href="/find-ride">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700">Find a Ride</Button>
                        </Link>
                      ) : (
                        <Link href="/post-ride">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700">Post a Ride</Button>
                        </Link>
                      )}
                      <Link href="/my-rides">
                        <Button variant="outline" className="w-full">
                          View My Rides
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Rides</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    {myRides.length > 0 ? (
                      <div className="text-sm">
                        <p className="font-medium">
                          {myRides[0].date} at {myRides[0].time}
                        </p>
                        <p className="text-gray-500">
                          {myRides[0].pickup} to {myRides[0].dropoff}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No upcoming rides</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href="/my-rides" className="text-xs text-teal-600 hover:underline">
                      View all rides
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">No unread messages</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/messages" className="text-xs text-teal-600 hover:underline">
                      View all messages
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              {user.role === "rider" && (
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Recommended Rides</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedRides.map((ride) => (
                      <RideCard key={ride.id} ride={ride} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="rides">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">My Rides</h2>
                  {user.role === "driver" && (
                    <Link href="/post-ride">
                      <Button className="bg-teal-600 hover:bg-teal-700">Post a Ride</Button>
                    </Link>
                  )}
                </div>
                {myRides.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {myRides.map((ride) => (
                      <RideCard key={ride.id} ride={ride} isOwner={ride.driver === "You"} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Car className="mb-4 h-12 w-12 text-gray-300" />
                      <p className="mb-2 text-lg font-medium">No rides yet</p>
                      <p className="mb-6 text-center text-gray-500">
                        {user.role === "rider"
                          ? "You haven't requested any rides yet."
                          : "You haven't posted any rides yet."}
                      </p>
                      {user.role === "rider" ? (
                        <Link href="/find-ride">
                          <Button className="bg-teal-600 hover:bg-teal-700">Find a Ride</Button>
                        </Link>
                      ) : (
                        <Link href="/post-ride">
                          <Button className="bg-teal-600 hover:bg-teal-700">Post a Ride</Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <MessageSquare className="mb-4 h-12 w-12 text-gray-300" />
                  <p className="mb-2 text-lg font-medium">No messages yet</p>
                  <p className="mb-6 text-center text-gray-500">Messages from your ride partners will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
