"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardNav } from "@/components/dashboard-nav"
import { Badge } from "@/components/ui/badge"
import { Car, Edit2, MapPin, Save, User, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    organization: "University A",
    department: "Computer Science",
    cellNumber: "+92 300 1234567",
    whatsappNumber: "+92 300 1234567",
    shareContact: true,
    role: "driver", // Added role to determine display behavior
    bio: "Graduate student looking for carpooling options to save money and reduce my carbon footprint.",
    interests: ["Technology", "Music", "Sports"],
  })

  const [newInterest, setNewInterest] = useState("")

  const handleChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Handle profile update logic here
    console.log("Updated profile:", profile)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-6 pt-6">
        <div className="container max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="organization">Organization/University</Label>
                      <Select
                        value={profile.organization}
                        onValueChange={(value) => handleChange("organization", value)}
                      >
                        <SelectTrigger id="organization">
                          <SelectValue placeholder="Select your organization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="University A">University A</SelectItem>
                          <SelectItem value="University B">University B</SelectItem>
                          <SelectItem value="Company A">Company A</SelectItem>
                          <SelectItem value="Company B">Company B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={profile.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="cellNumber">Cell Number</Label>
                      <Input
                        id="cellNumber"
                        value={profile.cellNumber}
                        onChange={(e) => handleChange("cellNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                      <Input
                        id="whatsappNumber"
                        value={profile.whatsappNumber}
                        onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {profile.role === "rider" && (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="shareContact"
                        checked={profile.shareContact}
                        onCheckedChange={(checked) =>
                          setProfile((prev) => ({ ...prev, shareContact: checked as boolean }))
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

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell others about yourself"
                      value={profile.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                          {interest}
                          <button
                            type="button"
                            onClick={() => removeInterest(interest)}
                            className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {interest}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an interest"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addInterest()
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addInterest}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                      <User className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                      <p className="text-gray-500">{profile.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Organization</h3>
                      <p>{profile.organization}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Department</h3>
                      <p>{profile.department}</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Cell Number</h3>
                      <p>{profile.cellNumber}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">WhatsApp Number</h3>
                      <p>{profile.whatsappNumber}</p>
                    </div>
                  </div>

                  {profile.role === "rider" && (
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-500">Contact Visibility</h3>
                      <p>
                        {profile.shareContact
                          ? "Your contact information is visible to drivers"
                          : "Your contact information is hidden from drivers"}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Bio</h3>
                    <p>{profile.bio}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Rides Taken</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Rides Offered</p>
                        <p className="text-2xl font-bold">5</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
