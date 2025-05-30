"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Car } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LoginPage() {
  const [cnic, setCnic] = useState("")
  const [password, setPassword] = useState("")
  const [termsAgreed, setTermsAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { cnic, password })
  }

  return (
    <div className="container flex h-screen max-w-screen-xl flex-col items-center justify-center px-4 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex items-center justify-center gap-2">
            <Car className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-semibold tracking-tight">LinkRide</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-sm text-gray-500">Enter your CNIC and password to sign in to your account</p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cnic">CNIC (Username)</Label>
                <Input
                  id="cnic"
                  type="text"
                  placeholder="00000-0000000-0"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAgreed}
                  onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                  required
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-teal-600 hover:underline" type="button">
                          Terms and Conditions
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[80vh] max-w-[90vw] md:max-w-[60vw]">
                        <DialogHeader>
                          <DialogTitle>Terms and Conditions</DialogTitle>
                          <DialogDescription>
                            Please read these terms carefully before using LinkRide.
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                          <div className="space-y-4 p-1 text-sm">
                            <h3 className="text-lg font-semibold">1. Introduction</h3>
                            <p>
                              Welcome to LinkRide, a carpooling platform designed for students and employees. By using
                              our services, you agree to these Terms and Conditions, our Privacy Policy, and any other
                              terms referenced herein.
                            </p>

                            <h3 className="text-lg font-semibold">2. Eligibility</h3>
                            <p>
                              To use LinkRide, you must be at least 18 years old and possess a valid CNIC. Drivers must
                              have a valid driving license, vehicle registration, and insurance as required by Pakistani
                              law.
                            </p>

                            <h3 className="text-lg font-semibold">3. Account Registration</h3>
                            <p>
                              You must provide accurate, current, and complete information during registration. Your
                              CNIC will be used as your unique username. You are responsible for maintaining the
                              confidentiality of your account credentials.
                            </p>

                            <h3 className="text-lg font-semibold">4. User Conduct</h3>
                            <p>
                              Users must behave respectfully and professionally. Harassment, discrimination, or any form
                              of inappropriate behavior will not be tolerated and may result in account termination.
                            </p>

                            <h3 className="text-lg font-semibold">5. Ride Sharing Rules</h3>
                            <p>
                              5.1. Drivers must maintain their vehicles in good condition and follow all traffic laws.
                              <br />
                              5.2. Passengers must be punctual and respectful of the driver's vehicle.
                              <br />
                              5.3. Both parties must honor their commitments; cancellations should be made with
                              reasonable notice.
                            </p>

                            <h3 className="text-lg font-semibold">6. Payments and Fees</h3>
                            <p>
                              6.1. LinkRide facilitates cost-sharing between riders and drivers.
                              <br />
                              6.2. The platform charges a service fee on each transaction.
                              <br />
                              6.3. All payments are processed through our secure payment system.
                            </p>

                            <h3 className="text-lg font-semibold">7. Liability Limitations</h3>
                            <p>
                              7.1. LinkRide is a platform connecting riders and drivers and is not responsible for the
                              actions of its users.
                              <br />
                              7.2. We do not guarantee the quality, safety, or legality of rides offered.
                              <br />
                              7.3. Users participate in ride-sharing at their own risk.
                            </p>

                            <h3 className="text-lg font-semibold">8. Insurance and Accidents</h3>
                            <p>
                              8.1. Drivers must have valid insurance as required by law.
                              <br />
                              8.2. LinkRide does not provide insurance coverage for rides.
                              <br />
                              8.3. In case of accidents, users should follow legal procedures and inform LinkRide.
                            </p>

                            <h3 className="text-lg font-semibold">9. Privacy</h3>
                            <p>
                              We collect and process personal data as described in our Privacy Policy. By using
                              LinkRide, you consent to our data practices.
                            </p>

                            <h3 className="text-lg font-semibold">10. Termination</h3>
                            <p>
                              LinkRide reserves the right to suspend or terminate accounts that violate these terms or
                              for any other reason at our discretion.
                            </p>

                            <h3 className="text-lg font-semibold">11. Changes to Terms</h3>
                            <p>
                              We may modify these terms at any time. Continued use of LinkRide after changes constitutes
                              acceptance of the updated terms.
                            </p>

                            <h3 className="text-lg font-semibold">12. Governing Law</h3>
                            <p>
                              These terms are governed by the laws of Pakistan. Any disputes shall be resolved in the
                              courts of Pakistan.
                            </p>

                            <p className="mt-6 font-medium">
                              By using LinkRide, you acknowledge that you have read, understood, and agree to be bound
                              by these Terms and Conditions.
                            </p>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </label>
                  <p className="text-xs text-gray-500">You must agree to our terms and conditions to sign in.</p>
                </div>
              </div>

              <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={!termsAgreed}>
                Sign In
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-teal-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
