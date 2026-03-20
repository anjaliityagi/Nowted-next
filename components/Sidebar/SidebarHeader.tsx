"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Search, Sun, Moon } from "lucide-react";
import { useSearchNotes } from "@/hooks/useSearchNotes";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import { Logo } from "./Logo";

type SidebarHeaderProps = {
  theme: string;
  toggleTheme: () => void;
};

export function SidebarHeader({ theme, toggleTheme }: SidebarHeaderProps) {
  const router = useRouter();
  const params = useParams();

  const folderId =
    typeof params.folderId === "string" ? params.folderId : undefined;

  const folderName =
    typeof params.folderName === "string" ? params.folderName : undefined;

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data: results = [] } = useSearchNotes(debounced);

  const handleCreateNote = async () => {
    if (!folderId) return;

    try {
      const newNote = await createNote(folderId, "", "", false, false);

      router.push(`/folders/${folderId}/notes/${newNote}`);

      toast.success("Note created!");
    } catch {
      toast.error("Failed to create note");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Logo />
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="
              w-9 h-9 flex items-center justify-center rounded-full
              text-[var(--text-gray-400)]
              hover:text-[var(--text-white)]
              hover:bg-[var(--bg-hover)]
              transition-all duration-200
            "
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="
              w-9 h-9 flex items-center justify-center rounded-full
              text-[var(--text-gray-400)]
              hover:text-[var(--text-white)]
              hover:bg-[var(--bg-hover)]
              transition-all duration-200
            "
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-6 relative">
        {showSearch ? (
          <div
            className="relative w-[260px]"
            tabIndex={0}
            onBlur={() => setShowResult(false)}
          >
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResult(true);
              }}
              placeholder="Search notes..."
              className="
                w-full h-[40px]
                px-3 py-2.5
                rounded-lg
                bg-[var(--bg-input)]
                text-[var(--text-white)]
                text-sm
                placeholder:text-[var(--text-gray-500)]
                outline-none
                focus:ring-1 focus:ring-[var(--primary)]
                transition
              "
            />

            {showResult && results.length > 0 && (
              <div
                className="
                  absolute top-full left-0 mt-2 w-full
                  bg-[var(--bg-input)]
                  rounded-xl shadow-xl
                  border border-[var(--border-gray-800)]
                  max-h-60 overflow-y-auto z-50
                "
              >
                {results.map((note) => (
                  <div
                    key={note.id}
                    onMouseDown={() => {
                      setShowResult(false);
                      setSearch("");

                      router.push(`/folders/${note.folderId}/notes/${note.id}`);
                    }}
                    className="
                      px-4 py-2 hover:bg-[var(--note-active-bg)]
                      cursor-pointer transition
                    "
                  >
                    <div className="text-sm text-[var(--text-white)] truncate">
                      {note.title}
                    </div>
                    <div className="text-xs text-[var(--text-gray-400)] truncate">
                      {note.folder.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleCreateNote}
            className="
              flex justify-center items-center gap-2
              w-[260px] h-[40px]
              rounded-lg bg-[var(--primary)]
              text-[var(--text-white)]
              text-md font-medium
              hover:bg-[var(--primary-hover)]
              transition
            "
          >
            <Plus size={18} />
            New Note
          </button>
        )}
      </div>
    </>
  );
}
