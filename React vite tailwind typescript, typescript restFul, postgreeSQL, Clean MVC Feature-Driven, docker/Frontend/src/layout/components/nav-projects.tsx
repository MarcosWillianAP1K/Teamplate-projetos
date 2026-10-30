"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
    isLive?: boolean;
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {projects.map((item) => {
          const isActive =
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(item.url));

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className={cn(
                  "h-auto! p-3! text-[0.825rem] rounded-xl font-medium transition-colors",
                  item.isLive && !isActive
                    ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300 dark:bg-emerald-950/40"
                    : isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
                      : "hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary",
                )}
              >
                <Link to={item.url} className="flex items-center gap-3 w-full">
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
