import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Clock, MapPin, User, DollarSign, Phone, MessageCircle } from "lucide-react"

interface RideProps {
  ride: {
    id: number
    driver: string
    pickup: string
    dropoff: string
    date: string
    time?: string
    timeFrom?: string
    timeTo?: string
    seats: number
    status?: string
    distance?: number
    fare?: number
    cellNumber?: string
    whatsappNumber?: string
    showContact?: boolean
  }
  isOwner?: boolean
}

export function RideCard({ ride, isOwner = false }: RideProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Display time as a range if timeFrom and timeTo are available, otherwise use time
  const displayTime = () => {
    if (ride.timeFrom && ride.timeTo) {
      return `${ride.timeFrom} - ${ride.timeTo}`
    }
    return ride.time
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
              <User className="h-4 w-4" />
            </div>
            <span className="font-medium">{ride.driver}</span>
          </div>
          {ride.status && (
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
              {ride.status === "active" ? "Active" : ride.status}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-medium">From</p>
              <p className="text-sm text-gray-500">{ride.pickup}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-medium">To</p>
              <p className="text-sm text-gray-500">{ride.dropoff}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{formatDate(ride.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{displayTime()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{ride.seats} seats available</span>
          </div>

          {ride.fare && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">PKR {ride.fare}</span>
            </div>
          )}

          {ride.distance && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{ride.distance} km</span>
            </div>
          )}

          {(ride.showContact || ride.driver === "You") && ride.cellNumber && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Cell: {ride.cellNumber}</span>
            </div>
          )}

          {(ride.showContact || ride.driver === "You") && ride.whatsappNumber && (
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">WhatsApp: {ride.whatsappNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isOwner ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600">
              Cancel
            </Button>
          </div>
        ) : (
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Request Ride</Button>
        )}
      </CardFooter>
    </Card>
  )
}
