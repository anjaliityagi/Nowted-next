"use client";

import { Sidebar } from "../Sidebar/Sidebar";
import { Suspense, useState } from "react";
import { NotesListItems } from "../Notelist/NoteslistItems";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const th = localStorage.getItem("theme");
    return th === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <div className={`${theme} min-h-screen`}>
      <div className="flex w-screen h-screen p-[3px] overflow-y-auto bg-[var(--bg-main)]">
        <div className="w-1/5 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] flex flex-col">
          <Sidebar theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="w-1/4 bg-[var(--bg-notes)] border-r border-[var(--border-color)]">
          <Suspense fallback={<div>Loading...</div>}>
            <NotesListItems />
          </Suspense>
        </div>

        <div className="flex-1 overflow-hidden w-[55%]">{children}</div>
      </div>
    </div>
  );
}
