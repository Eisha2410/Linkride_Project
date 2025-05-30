import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Users, Leaf, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About LinkRide</h1>
            <p className="max-w-[85%] text-gray-500 md:text-xl">
              We're on a mission to transform daily commutes for students and employees through smart carpooling.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                <p className="text-gray-500 md:text-lg">
                  LinkRide was founded in 2023 by a group of university students who were frustrated with the daily
                  commute challenges. They recognized that many students and employees from the same organizations were
                  making similar journeys alone, leading to traffic congestion, parking shortages, and unnecessary
                  environmental impact.
                </p>
                <p className="text-gray-500 md:text-lg">
                  What started as a simple ride-sharing board quickly evolved into a comprehensive platform designed
                  specifically for educational institutions and workplaces. Today, LinkRide connects thousands of
                  students and employees, making commuting more efficient, affordable, and environmentally friendly.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-[500px] rounded-lg bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  LinkRide Team Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission & Values</h2>
            <p className="text-gray-500 md:text-lg">
              We're committed to creating a more connected, efficient, and sustainable transportation ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-center text-gray-500">
                Building connections between people from the same organizations.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Leaf className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Sustainability</h3>
              <p className="text-center text-gray-500">Reducing carbon emissions through shared transportation.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Safety</h3>
              <p className="text-center text-gray-500">Prioritizing user safety through organization-based matching.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Reliability</h3>
              <p className="text-center text-gray-500">
                Creating dependable transportation options for daily commutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How LinkRide Works</h2>
            <p className="text-gray-500 md:text-lg">
              Our platform makes carpooling simple, safe, and convenient for everyone.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-center text-gray-500">
                Create an account with your organization email and complete your profile.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold">Find or Post Rides</h3>
              <p className="text-center text-gray-500">
                Search for available rides or offer your own if you're driving.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold">Connect & Commute</h3>
              <p className="text-center text-gray-500">
                Coordinate with your ride partners and enjoy a more efficient commute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-gray-500 md:text-lg">
              Find answers to common questions about LinkRide and our carpooling platform.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is LinkRide free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes, LinkRide is completely free to use for both riders and drivers. We don't charge any commission or
                  platform fees. Riders and drivers can arrange cost-sharing for fuel and other expenses directly
                  between themselves.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does LinkRide ensure safety?</AccordionTrigger>
                <AccordionContent>
                  LinkRide prioritizes safety by connecting people from the same organizations. Users must sign up with
                  their organization email, and we encourage users to verify their profiles. Additionally, we have a
                  rating system and reporting mechanisms to maintain community standards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I set up recurring rides?</AccordionTrigger>
                <AccordionContent>
                  Yes, LinkRide allows drivers to set up recurring rides for regular commutes. This is especially useful
                  for daily trips to campus or work. Riders can also search for and request recurring rides that match
                  their schedules.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What organizations does LinkRide support?</AccordionTrigger>
                <AccordionContent>
                  LinkRide currently supports various universities, colleges, and companies. If your organization isn't
                  listed, please contact us, and we'll work to add it to our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I cancel a ride?</AccordionTrigger>
                <AccordionContent>
                  Both riders and drivers can cancel rides through their dashboard. We encourage users to cancel with as
                  much advance notice as possible and to communicate with their ride partners through our messaging
                  system.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Join LinkRide?</h2>
            <p className="max-w-[600px] text-teal-50 md:text-xl">
              Sign up today and transform your daily commute with our smart carpooling platform.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button className="bg-white text-teal-600 hover:bg-teal-50">Sign Up Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-teal-700">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
