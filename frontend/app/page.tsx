import Link from "next/link"
import { ArrowRight, Calendar, Building, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50 to-white py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Commute Smart, Match Rides, Save Time
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Connect with fellow students and employees for convenient carpooling. Reduce your carbon footprint and
                  make commuting easier.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-[500px] rounded-lg bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Car Pooling Image</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About LinkRide</h2>
            <p className="max-w-[85%] text-gray-500 md:text-xl">
              LinkRide is a smart carpooling platform designed specifically for students and employees. We make it easy
              to find rides with people from your organization, helping you save time, reduce costs, and contribute to a
              greener environment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose LinkRide?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Building className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Match by Organization</h3>
              <p className="text-center text-gray-500">
                Connect with people from your university or workplace for safer, more convenient rides.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Flexible Scheduling</h3>
              <p className="text-center text-gray-500">
                Find one-time rides or set up recurring carpools that match your schedule.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Leaf className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Eco-Friendly Travel</h3>
              <p className="text-center text-gray-500">
                Reduce carbon emissions by sharing rides and contribute to a greener planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-gray-50 p-6 shadow-sm">
              <p className="mb-4 italic text-gray-600">
                "LinkRide has made my daily commute to university so much easier. I've saved money and made new
                friends!"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Sarah J.</p>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-6 shadow-sm">
              <p className="mb-4 italic text-gray-600">
                "As a driver, I've been able to offset my fuel costs while helping colleagues get to work. It's a
                win-win!"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-gray-500">Employee</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-6 shadow-sm">
              <p className="mb-4 italic text-gray-600">
                "The platform is so easy to use. I can quickly find rides that match my schedule and preferences."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">Alex K.</p>
                  <p className="text-sm text-gray-500">Graduate Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Carpooling?</h2>
            <p className="max-w-[600px] text-teal-50 md:text-xl">
              Join LinkRide today and transform your daily commute.
            </p>
            <Link href="/signup">
              <Button className="bg-white text-teal-600 hover:bg-teal-50">Sign Up Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
