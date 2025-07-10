import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Header />
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  )
}
