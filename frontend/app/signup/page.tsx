"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    email: "",
    password: "",
    role: "rider",
    organization: "",
    department: "",
    cellNumber: "",
    whatsappNumber: "",
    shareContact: false,
    vehicleModel: "",
    vehicleNumber: "",
    vehicleImage: null,
    termsAgreed: false,
  })

  const [showTerms, setShowTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, vehicleImage: e.target.files?.[0] }))
    }
  }

  const handleTermsChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAgreed: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup with:", formData)
  }

  return (
    <div className="container flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex items-center justify-center gap-2">
            <Car className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-semibold tracking-tight">LinkRide</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
          <p className="text-sm text-gray-500">Enter your details to create your LinkRide account</p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cnic">CNIC (Username)</Label>
                <Input
                  id="cnic"
                  name="cnic"
                  type="text"
                  placeholder="00000-0000000-0"
                  value={formData.cnic}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  Your CNIC will be used as your unique username for login purposes only.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>I want to be a</Label>
                <RadioGroup
                  defaultValue="rider"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rider" id="rider" />
                    <Label htmlFor="rider">Rider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <Label htmlFor="driver">Driver</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="organization">Organization/University</Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Enter your organization or university name"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department">Department (Optional)</Label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cellNumber">Cell Number</Label>
                <Input
                  id="cellNumber"
                  name="cellNumber"
                  type="tel"
                  placeholder="e.g., +92 300 1234567"
                  value={formData.cellNumber || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  placeholder="e.g., +92 300 1234567"
                  value={formData.whatsappNumber || ""}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500">This will be used for communication with your ride partners.</p>
              </div>

              {formData.role === "rider" && (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="shareContact"
                    checked={formData.shareContact || false}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, shareContact: checked as boolean }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="shareContact"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Find my rides
                    </label>
                    <p className="text-xs text-gray-500">
                      Allow drivers to see my contact information when I request a ride.
                    </p>
                  </div>
                </div>
              )}

              {formData.role === "driver" && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <h3 className="mb-3 font-medium">Vehicle Information</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="vehicleModel">Vehicle Model</Label>
                      <Input
                        id="vehicleModel"
                        name="vehicleModel"
                        type="text"
                        placeholder="e.g., Toyota Corolla 2018"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required={formData.role === "driver"}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                      <Input
                        id="vehicleNumber"
                        name="vehicleNumber"
                        type="text"
                        placeholder="e.g., ABC-123"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        required={formData.role === "driver"}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="vehicleImage">Vehicle Image</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="vehicleImage"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          required={formData.role === "driver"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("vehicleImage")?.click()}
                          className="w-full"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {formData.vehicleImage ? "Change Image" : "Upload Image"}
                        </Button>
                        {formData.vehicleImage && (
                          <span className="text-sm text-gray-500">
                            {typeof formData.vehicleImage === "object" ? formData.vehicleImage.name : "Image selected"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={formData.termsAgreed} onCheckedChange={handleTermsChange} required />
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
                  <p className="text-xs text-gray-500">
                    You must agree to our terms and conditions to create an account.
                  </p>
                </div>
              </div>

              <Button type="submit" className="mt-2 bg-teal-600 hover:bg-teal-700" disabled={!formData.termsAgreed}>
                Create Account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
