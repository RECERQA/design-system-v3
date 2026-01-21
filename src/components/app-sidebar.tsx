"use client"

import * as React from "react"
import Link from "next/link"
import {
  Activity,
  Calculator,
  ChevronRight,
  ChevronsUpDown,
  FileText,
  Landmark,
  Settings,
  UserRound,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationData = {
  mainNav: [
    {
      title: "モニタリング",
      icon: Activity,
      items: [
        { title: "ダッシュボード", href: "/dashboard" },
        { title: "月次予実管理", href: "/monthly-pl" },
        { title: "レポートビルダー", href: "/report", badge: "開発" },
      ],
    },
    {
      title: "予算策定",
      icon: Calculator,
      isActive: true,
      items: [
        { title: "年間PL", href: "/annual-pl", isActive: true },
        { title: "Sales KPI", href: "/kpi" },
        { title: "売上構成", href: "/revenue" },
        { title: "コスト", href: "/cost" },
      ],
    },
    {
      title: "財務戦略",
      icon: Landmark,
      items: [],
    },
  ],
  settingsNav: [
    {
      title: "設定",
      icon: Settings,
      items: [
        { title: "基本情報", href: "/settings" },
        { title: "ケース管理", href: "/settings/cases" },
        { title: "メンバー管理", href: "/settings/permissions" },
        { title: "外部連携", href: "/settings/integrations" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <button>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200 overflow-hidden shrink-0 group-data-[collapsible=icon]:mx-auto">
                  <FileText className="size-4 text-gray-600" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">事業計画書</span>
                </div>
                <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-2 px-2 pb-2 group-data-[collapsible=icon]:hidden">
              <div className="h-6 w-6 rounded-full overflow-hidden bg-violet-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-violet-700">S</span>
              </div>
              <div className="text-xs font-medium text-sidebar-foreground">CFO</div>
            </div>
            <SidebarMenu>
              {navigationData.mainNav.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                            >
                              <Link href={subItem.href}>
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="ml-auto text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                    {subItem.badge}
                                  </span>
                                )}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.settingsNav.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={true}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.href}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground overflow-hidden">
                <UserRound className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold">shotaro@recerqa.com</span>
                <span className="truncate text-xs text-muted-foreground">shotaro@recerqa.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
