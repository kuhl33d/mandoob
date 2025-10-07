import { DashboardHeader } from "@/components/dashboard-header"
import { MapView } from "@/components/map-view"
import { OrdersSummary } from "@/components/orders-summary"
import { BottomNav } from "@/components/bottom-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <MapView />
      <OrdersSummary />
      <BottomNav />
    </div>
  )
}
