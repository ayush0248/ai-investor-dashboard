"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  LineChart,
  MessageSquare,
  PieChart,
  Settings,
  ShoppingCart,
  TrendingUp,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Portfolio",
    icon: PieChart,
    href: "/dashboard/portfolio",
    color: "text-violet-500",
  },
  {
    label: "Market",
    icon: TrendingUp,
    href: "/dashboard/market",
    color: "text-pink-700",
  },
  {
    label: "Stocks",
    icon: LineChart,
    href: "/dashboard/stocks",
    color: "text-orange-700",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "text-emerald-500",
  },
  {
    label: "Transactions",
    icon: ShoppingCart,
    href: "/dashboard/transactions",
    color: "text-green-700",
  },
  {
    label: "News",
    icon: MessageSquare,
    href: "/dashboard/news",
    color: "text-blue-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white border-r border-gray-800">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-xl font-bold">InvestDash</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gray-800/50 rounded-lg transition",
                pathname === route.href ? "text-white bg-gray-800" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3">
          <User className="h-5 w-5 text-zinc-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">fin-advisor</span>
            <span className="text-xs text-zinc-400">user@fin-advisor.in</span>
          </div>
        </div>
      </div>
    </div>
  )
}

