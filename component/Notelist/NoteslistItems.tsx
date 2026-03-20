"use client";

import { useEffect, useRef } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useNotes } from "@/hooks/useNotes";
import { Skeleton } from "./Skeleton";

type filterType = "favorites" | "trash" | "archive";

export function NotesListItems() {
  const router = useRouter();
  // const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const folderName = searchParams.get("name");

  const filter = params.filter as filterType | undefined;
  const folderId = params.folderId as string | undefined;

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotes(filter, folderId);

  const notes = data?.pages.flat() ?? [];

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "500px" },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-[28px] font-semibold text-[var(--text-white)] px-4 py-3 border-b border-[var(--border-gray-800)] truncate capitalize">
        {folderName ? decodeURIComponent(folderName) : filter}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="p-5 rounded-xl bg-[var(--note-bg)]">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <p className="text-[var(--text-gray-500)] text-[15px] font-medium mb-2 flex justify-center align-center">
            Nothing to show here...create a new note by clicking on NewNote
            button
          </p>
        ) : (
          notes.map((note) => {
            const isActive = location.pathname.includes(note.id);

            const base = filter ? `/${filter}` : `/folders/${folderId}`;

            return (
              <div
                key={note.id}
                onClick={() =>
                  router.push(`${base}/notes/${note.id}`, {
                    //  state: { title: note.title },
                  })
                }
                className={`
                  mb-4 p-5 cursor-pointer rounded-xl
                 
                  ${
                    isActive
                      ? "bg-[var(--note-active-bg)]"
                      : "bg-[var(--note-bg)] hover:bg-[var(--note-hover-bg)]"
                  }
                `}
              >
                <h3 className="text-[var(--text-white)] text-[15px] font-medium mb-2 truncate">
                  {note.title || "Untitled"}
                </h3>

                <div className="flex items-center gap-1 text-[12px]">
                  <span className="text-[var(--text-gray-500)] whitespace-nowrap">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-[var(--text-gray-400)] truncate">
                    {note.preview}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center text-[var(--text-gray-500)] transition">
            Loading more...
          </div>
        )}

        {!hasNextPage && notes.length > 0 && !isLoading && (
          <div className="flex justify-center py-4 text-sm text-[var(--text-gray-500)]">
            No more notes
          </div>
        )}

        <div ref={observerRef} className="h-5 w-20" />
      </div>
    </div>
  );
}
