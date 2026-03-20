"use client";

import { FileText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "../Notelist/Skeleton";
import { useRecents } from "@/hooks/useRecents";

export function SidebarRecents() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: recentNotes = [], isLoading } = useRecents();

  return (
    <div className="mb-[22px] flex flex-col gap-2 min-h-[15%]">
      <div className="text-xs text-[var(--text-gray-500)] mb-2 px-1">
        Recents
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-[var(--bg-input)] flex items-center gap-3"
            >
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        recentNotes.map((note) => {
          const isActive = pathname.includes(note.id);

          return (
            <div
              key={note.id}
              onClick={() =>
                router.push(
                  `/folders/${note.folderId}/notes/${note.id}?name=${note.folder.name}`,
                )
              }
              className={`group flex px-3 py-2 rounded-lg text-sm cursor-pointer ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--text-white)]"
                  : "text-[var(--text-gray-400)] hover:bg-[var(--bg-input)]"
              }`}
            >
              <FileText size={18} />
              <span className="ml-2 truncate">{note.title || "Untitled"}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
