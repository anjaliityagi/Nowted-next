"use client";

import { SidebarFolders } from "./SidebarFolders";
import { SidebarMore } from "./SidebarMore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarRecents } from "./SidebarRecents";

type SidebarProps = {
  theme: string;
  toggleTheme: () => void;
};

export function Sidebar({ theme, toggleTheme }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-full p-2">
      <SidebarHeader theme={theme} toggleTheme={toggleTheme} />
      <SidebarRecents />
      <SidebarFolders />
      <SidebarMore />
    </div>
  );
}
