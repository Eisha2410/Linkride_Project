'use client'

import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from 'react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Car, Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

/* -------------------------------------------------------------------------- */
/*                                 Typings                                    */
/* -------------------------------------------------------------------------- */

type Role = 'passenger' | 'driver'

interface FormState {
  fullName: string
  cnic: string
  email: string
  password: string
  role: Role
  organization: string
  department: string
  cellNumber: string
  whatsappNumber: string
  shareContact: boolean
  vehicleModel: string
  vehicleNumber: string
  vehicleImage: File | null
  termsAgreed: boolean
}

/* -------------------------------------------------------------------------- */
/*                             Component                                      */
/* -------------------------------------------------------------------------- */

export default function SignupPage() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    cnic: '',
    email: '',
    password: '',
    role: 'passenger',
    organization: '',
    department: '',
    cellNumber: '',
    whatsappNumber: '',
    shareContact: false,
    vehicleModel: '',
    vehicleNumber: '',
    vehicleImage: null,
    termsAgreed: false,
  })

  /* ------------------------------- handlers -------------------------------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: Role) =>
    setFormData(prev => ({ ...prev, role: value }))

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFormData(prev => ({ ...prev, vehicleImage: file }))
  }

  const handleTermsChange = (checked: boolean | 'indeterminate') =>
    setFormData(prev => ({ ...prev, termsAgreed: Boolean(checked) }))

  const handleShareContactChange = (checked: boolean | 'indeterminate') =>
    setFormData(prev => ({ ...prev, shareContact: Boolean(checked) }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData()
    data.append('full_name',        formData.fullName)
    data.append('cnic',             formData.cnic)
    data.append('email',            formData.email)
    data.append('password',         formData.password)
    data.append('phone_number',     formData.cellNumber)
    data.append('role',             formData.role)
    data.append('organization',     formData.organization)
    data.append('department',       formData.department)
    data.append('whatsapp_number',  formData.whatsappNumber)
    data.append('share_contact',    String(formData.shareContact))

    if (formData.role === 'driver') {
      data.append('vehicle_model',  formData.vehicleModel)
      data.append('vehicle_number', formData.vehicleNumber)
      if (formData.vehicleImage) data.append('vehicle_image', formData.vehicleImage)
    }

    try {
      const res    = await fetch('http://127.0.0.1:8000/api/accounts/register/', { 
                            method: 'POST',
                            body: data,
                            headers: {
                              'Accept': 'application/json'  // Optional, encourages JSON response
                            }
                          })

      const result = await res.json()

      if (res.ok) {
        alert('Account created successfully!')
      } else {
        console.error('Signup failed:', result)
        alert('Signup error: ' + JSON.stringify(result))
      }
    } catch (err) {
      console.error('Network error:', err)
      alert('Network error occurred.')
    }
  }

  /* ------------------------------- JSX ------------------------------------ */

  return (
    <div className="container flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex items-center justify-center gap-2">
            <Car className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-semibold tracking-tight">LinkRide</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
          <p className="text-sm text-gray-500">
            Enter your details to create your LinkRide account
          </p>
        </div>

        {/* -------------------------- FORM ----------------------------------- */}
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Full name */}
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* CNIC */}
          <div className="grid gap-2">
            <Label htmlFor="cnic">CNIC (Username)</Label>
            <Input
              id="cnic"
              name="cnic"
              placeholder="00000-0000000-0"
              value={formData.cnic}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500">
              Your CNIC will be used as your unique username for login purposes only.
            </p>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role */}
          <div className="grid gap-2">
            <Label>I want to be a</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={value => handleRoleChange(value as Role)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="passenger" id="passenger" />
                <Label htmlFor="passenger">Passenger</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="driver" id="driver" />
                <Label htmlFor="driver">Driver</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Org / Dept */}
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization/University</Label>
            <Input
              id="organization"
              name="organization"
              placeholder="Your org or university"
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
              placeholder="e.g. Computer Science"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          {/* Phone / WhatsApp */}
          <div className="grid gap-2">
            <Label htmlFor="cellNumber">Cell Number</Label>
            <Input
              id="cellNumber"
              name="cellNumber"
              type="tel"
              placeholder="+92 300 1234567"
              value={formData.cellNumber}
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
              placeholder="+92 300 1234567"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500">
              This will be used for communication with your ride partners.
            </p>
          </div>

          {/* Rider-only toggle */}
          {formData.role === 'passenger' && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="shareContact"
                checked={formData.shareContact}
                onCheckedChange={handleShareContactChange}
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

          {/* Driver-only vehicle section */}
          {formData.role === 'driver' && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 font-medium">Vehicle Information</h3>

              {/* Vehicle model */}
              <div className="grid gap-2">
                <Label htmlFor="vehicleModel">Vehicle Model</Label>
                <Input
                  id="vehicleModel"
                  name="vehicleModel"
                  placeholder="Toyota Corolla 2018"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Vehicle number */}
              <div className="grid gap-2">
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  placeholder="ABC-123"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Vehicle image */}
              <div className="grid gap-2">
                <Label htmlFor="vehicleImage">Vehicle Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="vehicleImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('vehicleImage')?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {formData.vehicleImage ? 'Change Image' : 'Upload Image'}
                  </Button>
                  {formData.vehicleImage && (
                    <span className="text-sm text-gray-500 line-clamp-1">
                      {formData.vehicleImage.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.termsAgreed}
              onCheckedChange={handleTermsChange}
              required
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{' '}
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
                    {/* Long scroll area … */}
                    <ScrollArea className="h-[60vh] pr-4">
                      {/* ↳ Your existing terms markup left unchanged */}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </label>
              <p className="text-xs text-gray-500">
                You must agree to our terms and conditions to create an account.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-2 bg-teal-600 hover:bg-teal-700"
            disabled={!formData.termsAgreed}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
