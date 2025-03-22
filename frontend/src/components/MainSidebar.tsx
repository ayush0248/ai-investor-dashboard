"use client";

import * as React from "react";
import {
  BarChart2,
  DollarSign,
  HelpCircle,
  PieChart,
  Settings,
  Languages,
  Bell,
  User,
  Bot,
  BookOpen,
  Wallet,
  Icon,
  Calculator,
  ChartCandlestick ,
} from "lucide-react";

import { SidebarUpperContent } from "@/components/SidebarUpperContent";
import { SidebarLowerContent } from "@/components/SidebarLowerContent";
import { SidebarUser } from "@/components/SidebarUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export const data = {
  user: {
    name: "fin-advisor",
    email: "user@fin-advisor.in",
    avatar: "/avatars/user.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart2,
      isActive: true,
      items: [
        { title: "portfolio", url: "/dashboard/portfolio", Icon:"ChartCandlestick " },

      ],
    },
   
     {
      title: "Tax Calculator",
      url: "/Calculator",
      icon: Calculator ,
      items: [
        { title: "Calculator", url: "/dashboard/calculator" },
      ],
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: Bot,
      items: [
        { title: "AI Chatbot", url: "/chatbot" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "Profile", url: "/dashboard/settings/profile", icon: User },

      ],
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
      items: [
        { title: "Help & Support", url: "/dashboard/settings/support" },
      ],
    },
  ],
};

export function MainSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarUpperContent items={data.navMain} />
        <SidebarLowerContent projects={[]} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
