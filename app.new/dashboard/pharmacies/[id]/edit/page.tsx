"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { useState } from "react"

const pharmacyData: Record<string, any> = {
  "1": {
    name: "City Pharmacy",
    address: "123 Main St, Anytown USA",
    phone: "(555) 123-4567",
    deliveryInstructions: "Use main entrance. Ring bell for deliveries.",
  },
  "2": {
    name: "Community Pharmacy",
    address: "456 Oak Ave, Anytown USA",
    phone: "(555) 234-5678",
    deliveryInstructions: "Delivery entrance on the side of the building.",
  },
  "3": {
    name: "Health First Pharmacy",
    address: "789 Pine Ln, Anytown USA",
    phone: "(555) 345-6789",
    deliveryInstructions: "Call upon arrival. Code: 5678#",
  },
  "4": {
    name: "Wellness Pharmacy",
    address: "101 Elm Rd, Anytown USA",
    phone: "(555) 456-7890",
    deliveryInstructions: "Use side door for deliveries. Code: 1234#",
  },
}

export default function EditPharmacyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const pharmacy = pharmacyData[id] || pharmacyData["1"]

  const [formData, setFormData] = useState({
    name: pharmacy.name,
    address: pharmacy.address,
    phone: pharmacy.phone,
    deliveryInstructions: pharmacy.deliveryInstructions,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    router.push(`/dashboard/pharmacies/${id}`)
  }

  const handleCancel = () => {
    router.push(`/dashboard/pharmacies/${id}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-lg font-semibold text-center">Edit Pharmacy</h1>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Pharmacy Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Contact Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">
              Delivery Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.deliveryInstructions}
              onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
              className="bg-background min-h-[120px] resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 bg-[#00B8D4]/10 text-[#00B8D4] border-[#00B8D4]/20 hover:bg-[#00B8D4]/20"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-12 bg-[#00B8D4] hover:bg-[#00B8D4]/90">
              Save Changes
            </Button>
          </div>
        </div>
      </form>

      <BottomNav activeTab="pharmacies" />
    </div>
  )
}
