"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { useToast } from "@/hooks/use-toast"

export default function AddPharmacyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    operational_hours: "",
    delivery_instructions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.from("pharmacies").insert([
        {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          operational_hours: formData.operational_hours,
          delivery_instructions: formData.delivery_instructions || null,
        },
      ])

      if (error) throw error

      toast({
        title: "Success",
        description: "Pharmacy added successfully",
      })

      router.push("/dashboard/pharmacies")
    } catch (error) {
      console.error("[v0] Error adding pharmacy:", error)
      toast({
        title: "Error",
        description: "Failed to add pharmacy. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <Link href="/dashboard/pharmacies">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Add Pharmacy</h1>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="max-w-md mx-auto bg-card border border-[#00B8D4]/20 rounded-2xl p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-muted-foreground">
              Pharmacy Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-muted/30 border-0"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm text-muted-foreground">
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-muted/30 border-0"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-muted-foreground">
              Contact Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-muted/30 border-0"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-muted/30 border-0"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="text-sm text-muted-foreground">
              Operational Hours
            </Label>
            <Input
              id="hours"
              value={formData.operational_hours}
              onChange={(e) => setFormData({ ...formData, operational_hours: e.target.value })}
              className="bg-muted/30 border-0"
              placeholder="e.g., Mon-Fri: 9:00 AM - 6:00 PM"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_instructions" className="text-sm text-muted-foreground">
              Delivery Instructions (Optional)
            </Label>
            <Textarea
              id="delivery_instructions"
              value={formData.delivery_instructions}
              onChange={(e) => setFormData({ ...formData, delivery_instructions: e.target.value })}
              className="bg-muted/30 border-0 min-h-[80px]"
              placeholder="e.g., Use main entrance. Ring bell for deliveries."
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00B8D4] hover:bg-[#00B8D4]/90 h-12 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}
