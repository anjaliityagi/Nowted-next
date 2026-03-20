"use client";

import { useParams, useRouter } from "next/navigation";
import { History } from "lucide-react";
import { restoreNote, fetchNoteById } from "@/lib/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function RestoreNote() {
  const { noteId, filter } = useParams();
  const router = useRouter();
  const qc = useQueryClient();

  const [loading, setLoading] = useState(false);
  const noteTitle = "this note";
  const handleRestore = async () => {
    if (!noteId) return;

    setLoading(true);

    try {
      await restoreNote(noteId as string);

      const updatedNote = await fetchNoteById(noteId as string);

      qc.invalidateQueries({ queryKey: ["notes"] });

      if (filter === "favorites" || filter === "archive") {
        router.push(`/${filter}/notes/${updatedNote.id}`);
      } else {
        router.push(
          `/folders/${updatedNote.folder.id}/notes/${updatedNote.id}`,
        );
      }

      toast.success("Note restored successfully!");
    } catch {
      toast.error("Restore failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 h-full w-full items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-[var(--border-white-20)] flex items-center justify-center">
            <History size={30} className="text-[var(--text-white-80)]" />
          </div>
        </div>

        <div className="text-2xl font-semibold text-[var(--text-white)] mb-3">
          Restore “{noteTitle}”
        </div>

        <p className="text-sm text-[var(--text-gray-400)] leading-relaxed mb-7">
          Don&apos;t want to lose this note? It&apos;s not too late! Just click
          the &apos;Restore&apos; button and it will be added back to your list.
          It&apos;s that simple.
        </p>

        <button
          onClick={handleRestore}
          disabled={loading}
          className="px-8 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--text-white)] text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Restoring..." : "Restore"}
        </button>
      </div>
    </div>
  );
}
