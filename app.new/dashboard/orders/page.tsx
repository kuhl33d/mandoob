"use client"

import { useState } from "react"
import { Menu, Settings, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import useSWR from "swr"
import { createBrowserClient } from "@supabase/ssr"

type Order = {
  id: string
  pharmacy_id: string
  status: string
  total_amount: number
  created_at: string
  pharmacies: {
    name: string
  }
}

const fetcher = async () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      pharmacies (
        name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Order[]
}

const filterTabs = ["All", "Pending", "Out for Delivery", "Delivered"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
    case "Out for Delivery":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100"
    case "Delivered":
      return "bg-green-100 text-green-700 hover:bg-green-100"
    case "Cancelled":
      return "bg-red-100 text-red-700 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { data: orders, error, isLoading } = useSWR("orders", fetcher)

  const filteredOrders =
    orders?.filter((order) => {
      const matchesFilter = activeFilter === "All" || order.status === activeFilter
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.pharmacies.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    }) || []

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 -ml-2">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Orders</h1>
          <button className="p-2 -mr-2">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by ID, pharmacy..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === tab ? "bg-[#00B8D4] text-white" : "bg-secondary text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="px-4 space-y-3">
        {isLoading && <div className="text-center py-8 text-muted-foreground">Loading orders...</div>}

        {error && <div className="text-center py-8 text-destructive">Failed to load orders</div>}

        {!isLoading && !error && filteredOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No orders found</div>
        )}

        {filteredOrders.map((order) => (
          <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-base">#{order.id}</p>
                  <p className="text-sm text-muted-foreground mt-1">{order.pharmacies.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(order.created_at)}</p>
                </div>
                <Badge variant="secondary" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <BottomNav activeTab="orders" />
    </div>
  )
}
