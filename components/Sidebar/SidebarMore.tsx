"use client";

import { Trash2, Star, Archive } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function SidebarMore() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="bottom-16 left-0 w-full pt-4 h-[20%]">
      <div className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wide">
        More
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition
            ${
              isActive("/favorites")
                ? "bg-[var(--note-active-bg)] text-[var(--text-white)]"
                : "text-[var(--text-soft)] hover:bg-[var(--bg-hover)]"
            }
          `}
          onClick={() => router.push("/favorites")}
        >
          <Star size={18} />
          Favorites
        </div>

        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition
            ${
              isActive("/trash")
                ? "bg-[var(--note-active-bg)] text-[var(--text-white)]"
                : "text-[var(--text-soft)] hover:bg-[var(--bg-hover)]"
            }
          `}
          onClick={() => router.push("/trash")}
        >
          <Trash2 size={18} />
          Trash
        </div>

        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition
            ${
              isActive("/archive")
                ? "bg-[var(--note-active-bg)] text-[var(--text-white)]"
                : "text-[var(--text-soft)] hover:bg-[var(--bg-hover)]"
            }
          `}
          onClick={() => router.push("/archive")}
        >
          <Archive size={18} />
          Archived Notes
        </div>
      </div>
    </div>
  );
}
