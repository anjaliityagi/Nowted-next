"use client";
import { FileText } from "lucide-react";

export function EmptyNote() {
  return (
    <div className="flex flex-1 h-full w-full items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-xl border border-[var(--border-white-20)] flex items-center justify-center">
            <FileText size={32} className="text-[var(--text-white)]" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-[var(--text-white)] mb-3">
          Select a note to view
        </h2>
        <p className="text-sm text-[var(--text-gray-400)] leading-relaxed">
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </div>
  );
}
