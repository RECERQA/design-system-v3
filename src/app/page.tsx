"use client"

import { ChartLine, Settings2, UserRound } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { PLChart } from "@/components/pl-chart"
import { PLTable } from "@/components/pl-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function AnnualPLPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4">
            <Tabs defaultValue="normal" className="w-auto">
              <TabsList>
                <TabsTrigger value="normal">通常ケース</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="gap-2">
              <ChartLine className="h-4 w-4" />
              ケース比較
            </Button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" className="gap-2">
              <ChartLine className="h-4 w-4" />
              PLチャート
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <UserRound className="h-4 w-4" />
              一人あたりARR
            </Button>
          </div>

          {/* Chart Section */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <select className="text-sm border rounded-md px-3 py-1.5 bg-background">
                  <option>百万円</option>
                </select>
                <Button variant="outline" size="sm">
                  詳細を表示
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <PLChart />
          </div>

          {/* Table Section */}
          <div className="rounded-lg border bg-card p-6">
            <PLTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
