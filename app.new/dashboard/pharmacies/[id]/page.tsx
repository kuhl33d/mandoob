"use client"

import { ArrowLeft, MapPin, Phone, Mail, Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import useSWR from "swr"
import { createBrowserClient } from "@supabase/ssr"

type Pharmacy = {
  id: string
  name: string
  address: string
  phone: string
  email: string
  operational_hours: string
  delivery_instructions: string | null
  created_at: string
}

const fetcher = async (id: string) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data, error } = await supabase.from("pharmacies").select("*").eq("id", id).single()

  if (error) throw error
  return data as Pharmacy
}

export default function PharmacyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: pharmacy, error, isLoading } = useSWR(`pharmacy-${id}`, () => fetcher(id))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-20">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/pharmacies">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Pharmacy Details</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading pharmacy details...</p>
        </div>
        <BottomNav activeTab="pharmacies" />
      </div>
    )
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-20">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/pharmacies">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Pharmacy Details</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-destructive">Failed to load pharmacy details</p>
        </div>
        <BottomNav activeTab="pharmacies" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pharmacies">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Pharmacy Details</h1>
        </div>
        <Link href={`/dashboard/pharmacies/${id}/edit`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-5 w-5" />
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Pharmacy Name */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-xl font-semibold">{pharmacy.name}</h2>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Contact Information</h3>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#00B8D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-[#00B8D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{pharmacy.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-[#00B8D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{pharmacy.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#00B8D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Operational Hours</p>
              <p className="text-sm text-muted-foreground">{pharmacy.operational_hours}</p>
            </div>
          </div>
        </div>

        {/* Delivery Instructions */}
        {pharmacy.delivery_instructions && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Delivery Instructions</h3>
            <p className="text-sm">{pharmacy.delivery_instructions}</p>
          </div>
        )}
      </div>

      <BottomNav activeTab="pharmacies" />
    </div>
  )
}
