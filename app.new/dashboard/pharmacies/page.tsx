"use client"

import { ArrowLeft, Search, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import useSWR from "swr"
import { createBrowserClient } from "@supabase/ssr"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

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

const fetcher = async () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data, error } = await supabase.from("pharmacies").select("*").order("name", { ascending: true })

  if (error) throw error
  return data as Pharmacy[]
}

export default function PharmaciesPage() {
  const searchParams = useSearchParams()
  const urlSearch = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const { data: pharmacies, error, isLoading } = useSWR("pharmacies", fetcher)

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
  }, [urlSearch])

  const filteredPharmacies =
    pharmacies?.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Pharmacies</h1>
      </header>

      {/* Search and Filters */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pharmacies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50 border-0"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-[#00B8D4]/10 text-[#00B8D4] border-[#00B8D4]/20">
            Sort
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="bg-[#00B8D4]/10 text-[#00B8D4] border-[#00B8D4]/20">
            Filter
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Pharmacies List */}
      <div className="flex-1 px-4 space-y-2">
        {isLoading && <div className="text-center py-8 text-muted-foreground">Loading pharmacies...</div>}

        {error && <div className="text-center py-8 text-destructive">Failed to load pharmacies</div>}

        {!isLoading && !error && filteredPharmacies.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No pharmacies found</div>
        )}

        {filteredPharmacies.map((pharmacy) => (
          <Link key={pharmacy.id} href={`/dashboard/pharmacies/${pharmacy.id}`}>
            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:bg-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#00B8D4]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#00B8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{pharmacy.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{pharmacy.address}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link href="/dashboard/pharmacies/add">
        <Button
          size="icon"
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-[#00B8D4] hover:bg-[#00B8D4]/90 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>

      <BottomNav activeTab="pharmacies" />
    </div>
  )
}
