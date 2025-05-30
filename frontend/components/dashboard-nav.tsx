"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Car, Home, LogOut, MapPin, MessageSquare, User } from "lucide-react"

interface DashboardNavProps {
  userRole?: "driver" | "rider"
}

export function DashboardNav({ userRole = "rider" }: DashboardNavProps) {
  const pathname = usePathname()

  // Define navigation items based on user role
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    ...(userRole === "rider"
      ? [
          {
            title: "Find Ride",
            href: "/find-ride",
            icon: MapPin,
          },
        ]
      : []),
    {
      title: "My Rides",
      href: "/my-rides",
      icon: Car,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="hidden border-r bg-gray-50/40 md:block md:w-64">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-10 flex items-center px-2">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">LinkRide</span>
          </Link>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-teal-600",
                pathname === item.href ? "bg-teal-50 text-teal-600" : "text-gray-500 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}
