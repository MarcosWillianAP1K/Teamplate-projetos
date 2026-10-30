"use client";

import * as React from "react";
import { Layers, Sparkles } from "lucide-react";
import { APP_ROUTES } from "@/routes/utils/Path";

import { NavProjects } from "./nav-projects";
import { NavHeader } from "./nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import { NewSection } from "./nav-button";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onCreateNewItem?: () => void | Promise<void>;
  isCreating?: boolean;
}

export function AppSidebar({
  onCreateNewItem,
  isCreating = false,
  ...props
}: AppSidebarProps) {
  const navItems = [
    {
      name: "Feature Exemplo",
      url: APP_ROUTES.EXEMPLO,
      icon: Layers,
    },
    {
      name: "Modo Foco (Layout)",
      url: APP_ROUTES.EXEMPLO_FOCO,
      icon: Sparkles,
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="bg-sidebar border-r border-sidebar-border"
      {...props}
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NewSection
          onCreateChat={
            onCreateNewItem
              ? async () => {
                  await onCreateNewItem();
                }
              : undefined
          }
          isCreating={isCreating}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
