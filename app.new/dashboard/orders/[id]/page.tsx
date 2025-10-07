"use client"

import { ArrowLeft, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { createBrowserClient } from "@supabase/ssr"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

type OrderWithDetails = {
  id: string
  pharmacy_id: string
  status: string
  total_amount: number
  created_at: string
  pharmacies: {
    name: string
    address: string
  }
  order_items: {
    id: string
    medicine_name: string
    quantity: number
    price: number
  }[]
}

const fetcher = async (id: string) => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      pharmacies (
        name,
        address
      ),
      order_items (
        id,
        medicine_name,
        quantity,
        price
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data as OrderWithDetails
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-yellow-600"
    case "Out for Delivery":
      return "text-blue-600"
    case "Delivered":
      return "text-green-600"
    case "Cancelled":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const { data: order, error, isLoading, mutate } = useSWR(`order-${params.id}`, () => fetcher(params.id))

  const handleMarkAsDelivered = async () => {
    if (!order || order.status === "Delivered") return

    setIsUpdating(true)
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.from("orders").update({ status: "Delivered" }).eq("id", params.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Order marked as delivered",
      })

      mutate()
    } catch (error) {
      console.error("[v0] Error updating order:", error)
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Order Details</h1>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Order Details</h1>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Failed to load order details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Order Details</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Pharmacy Information */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3">Pharmacy Information</h2>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="font-medium">{order.pharmacies.name}</p>
              <p className="text-sm text-muted-foreground">{order.pharmacies.address}</p>
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-medium">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="font-medium">{formatDate(order.created_at)}</span>
            </div>
          </div>
        </Card>

        {/* Items */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3">Items</h2>
          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{item.medicine_name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold text-lg">${order.total_amount.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-[#00B8D4] hover:bg-[#00A5C0] text-white"
            onClick={handleMarkAsDelivered}
            disabled={order.status === "Delivered" || isUpdating}
          >
            {isUpdating ? "UPDATING..." : order.status === "Delivered" ? "DELIVERED" : "MARK AS DELIVERED"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#00B8D4] text-[#00B8D4] hover:bg-cyan-50 bg-transparent"
            onClick={() => router.push(`/dashboard/orders/${params.id}/edit`)}
          >
            EDIT ORDER
          </Button>
        </div>
      </div>
    </div>
  )
}
