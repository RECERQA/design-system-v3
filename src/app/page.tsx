"use client"

import { ChartLine, Info, Settings2, UserRound } from "lucide-react"
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
              <TabsList className="h-11 p-1">
                <TabsTrigger value="normal" className="h-9 px-4 text-sm">通常ケース</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="h-9 px-4 gap-2 text-sm font-medium">
              <ChartLine className="h-4 w-4" />
              ケース比較
            </Button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2">
            <Button className="h-8 px-3 gap-2 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-white">
              <ChartLine className="h-4 w-4" />
              PLチャート
            </Button>
            <Button variant="outline" className="h-8 px-3 gap-2 text-xs font-medium bg-white hover:bg-gray-50">
              <UserRound className="h-4 w-4" />
              一人あたりARR
            </Button>
          </div>

          {/* Chart Section */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              {/* Left: Title */}
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">PL</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              {/* Right: Controls + Legend */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-background h-8">
                    <option>百万円</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    詳細を表示
                  </label>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>ARR</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>営業損益</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <div className="w-3 h-3 rounded bg-amber-500" />
                    <span>売上総利益率</span>
                  </div>
                </div>
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
