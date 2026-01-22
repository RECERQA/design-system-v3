"use client"

import { ChevronLeft, ChevronRight, Info, Settings2, Expand } from "lucide-react"
import Image from "next/image"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MonthlyPLChart } from "@/components/monthly-pl-chart"
import { MonthlyPLTable } from "@/components/monthly-pl-table"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function MonthlyPLPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
          {/* Top Section: Profile + Controls */}
          <div className="flex items-start gap-6">
            {/* Left: Profile Card */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">Sakamoto</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">CFO</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <button className="p-1 hover:bg-muted rounded">
                    <Settings2 className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded">
                    <Expand className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* Profile Image */}
              <div className="w-[150px] h-[180px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 flex items-end justify-center">
                <div className="text-white/20 text-6xl font-bold mb-4">S</div>
              </div>
            </div>

            {/* Right: Chart and Controls */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Scenario Tab + Date Controls */}
              <div className="flex items-center justify-between">
                <Tabs defaultValue="normal" className="w-auto">
                  <TabsList className="h-10 p-1">
                    <TabsTrigger value="normal" className="h-8 px-4 text-sm">通常ケース</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-background h-9">
                    <option>円</option>
                  </select>
                  <div className="flex items-center gap-1 border rounded-md px-2 h-9">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm px-2">2022/4 - 2023/3 (1期目)</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">予実推移</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <select className="text-sm border rounded-md px-3 py-1.5 bg-background h-9">
                      <option>MRR</option>
                    </select>
                    {/* Legend */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-blue-500 border-dashed" style={{ borderStyle: 'dashed', borderWidth: '1px', borderColor: '#3b82f6' }} />
                        <span className="text-muted-foreground">計画</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-0.5 bg-green-500" />
                        <span className="text-muted-foreground">実績</span>
                      </div>
                    </div>
                  </div>
                </div>
                <MonthlyPLChart />
              </div>
            </div>
          </div>

                      {/* Table Section */}
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">月次データ</span>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2">
                          {/* View Tabs */}
                          <Tabs defaultValue="plan-actual" className="w-auto">
                            <TabsList className="h-8 p-0.5">
                              <TabsTrigger value="plan-actual" className="h-7 px-3 text-xs">予実</TabsTrigger>
                              <TabsTrigger value="rate" className="h-7 px-3 text-xs">達成率</TabsTrigger>
                              <TabsTrigger value="diff" className="h-7 px-3 text-xs">差分</TabsTrigger>
                              <TabsTrigger value="settings" className="h-7 px-3 text-xs">設定</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      </div>
                      <MonthlyPLTable />
                    </div>
                  </div>
                </SidebarInset>
              </SidebarProvider>
            )
          }
