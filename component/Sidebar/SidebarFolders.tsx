"use client";

import { useState, useEffect } from "react";
import { Plus, FolderClosed, FolderOpen, Trash } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
import {
  fetchFolders,
  createFolders,
  delFolder,
  editFolder,
  type Folder,
} from "@/lib/api";
import { Skeleton } from "../Notelist/Skeleton";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
export function SidebarFolders() {
  const router = useRouter();
  const params = useParams();

  const folderId =
    typeof params.folderId === "string" ? params.folderId : undefined;

  const filter = typeof params.filter === "string" ? params.filter : undefined;

  const qc = useQueryClient();

  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const { data: folders = [], isLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
  useEffect(() => {
    if (!folders.length) return;

    if (!folderId && !filter) {
      router.push(`/folders/${folders[0].id}?name=${folders[0].name}`);
    }
  }, [folders, folderId, filter, router]);

  const createMutation = useMutation({
    mutationFn: (name: string) => createFolders(name),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["folders"] });
      const data = await fetchFolders();

      router.push(`/folders/${data[0].id}?name=${data[0].name}`);

      toast.success("Folder created successfulyy! Wohooo!!");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      editFolder(id, name),
    onSuccess: async (_, variables) => {
      await qc.invalidateQueries({ queryKey: ["folders"] });
      setEdit(false);

      router.push(`/folders/${variables.id}?name=${variables.name}`);
      toast.success("FolderName Edited Successfulyy! So Nicee!!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => delFolder(id),
    onSuccess: async (_, deletedId) => {
      await qc.invalidateQueries({ queryKey: ["folders"] });

      const data = await fetchFolders();

      if (deletedId === folderId) {
        if (data.length > 0) {
          router.push(`/folders/${data[0].id}?name=${data[0].name}`);
        } else {
          router.push("/");
        }
      }

      toast.success("Folder deleted Successfully! Sad...");
      setFolderToDelete(null);
    },
  });

  const folderSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, "Folder name is required")
      .max(30, "Folder name must be under 30 characters")
      .refine((val) => !/[\\/]/.test(val), "Folder name cannot contain / or \\")
      .refine(
        (val) => !/[?&#%]/.test(val),
        "Folder name cannot contain ?, &, #, or %",
      ),
  });
  const handleCreateFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowInput(false);
      setInput("");
      return;
    }

    if (e.key !== "Enter") return;

    const result = folderSchema.safeParse({ name: input });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const name = result.data.name;
    const normalizedName = name.toLowerCase().trim();

    const alreadyExists = folders.some(
      (f) => f.name.toLowerCase().trim() === normalizedName,
    );

    if (alreadyExists) {
      toast.error("Folder already exists");
      return;
    }

    createMutation.mutate(name);
    setInput("");
    setShowInput(false);
  };

  const handleEditingFolder = (
    e: React.KeyboardEvent<HTMLInputElement>,
    folder: Folder,
  ) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;

      if (
        folders.some(
          (f) =>
            f.name.toLowerCase().trim() === input.toLowerCase().trim() &&
            f.id !== folder.id,
        )
      ) {
        toast.error("Folder already exists");
        return;
      }

      editMutation.mutate({ id: folder.id, name: input });
    }

    if (e.key === "Escape") {
      setEdit(false);
      setInput("");
    }
  };

  return (
    <>
      <div className="mb-[22px] flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-center text-xs text-[var(--text-gray-500)] mb-2 px-1">
          <span>Folders</span>
          <button
            className="cursor-pointer hover:text-[var(--text-white)] transition"
            onClick={() => setShowInput(!showInput)}
          >
            <Plus size={16} />
          </button>
        </div>

        {showInput && (
          <div className="flex items-center gap-2 px-1 mb-2">
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCreateFolder}
              className="flex-1 px-3 py-2 rounded-md bg-[var(--bg-input)] text-[var(--text-white)] text-sm outline-none"
              placeholder="New folder name"
            />
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-2">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
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
            folders.map((folder) => {
              const isActive = folderId === folder.id;
              const isEditing = edit && editIndex === folder.id;

              return (
                <div
                  key={folder.id}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEdit(true);
                    setEditIndex(folder.id);
                    setInput(folder.name);
                  }}
                  onClick={() =>
                    router.push(`/folders/${folder.id}?name=${folder.name}`)
                  }
                  className={`
              group flex justify-between items-center
              px-3 py-2 rounded-lg text-sm cursor-pointer 
              
              ${
                isActive
                  ? "bg-[var(--folder-active-bg)] text-[var(--text-white)]"
                  : "text-[var(--text-gray-400)] hover:bg-[var(--bg-input)]"
              }
            `}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {isActive ? (
                      <FolderOpen size={18} className="text-[var(--primary)]" />
                    ) : (
                      <FolderClosed
                        size={18}
                        className="text-[var(--text-gray-400)] group-hover:text-[var(--text-gray-200)] transition"
                      />
                    )}

                    {isEditing ? (
                      <input
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => handleEditingFolder(e, folder)}
                        onBlur={() => setEdit(false)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[var(--bg-input)] px-2 py-1 rounded-md text-[var(--text-white)] text-sm outline-none w-full"
                      />
                    ) : (
                      <span className=" max-w-[200px] truncate">
                        {folder.name}
                      </span>
                    )}
                  </div>

                  {!isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolderToDelete(folder);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition duration-200 text-[var(--text-gray-500)] hover:text-[var(--danger-red)]"
                    >
                      <Trash size={18} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      {folderToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-[400px] bg-[var(--bg-input)] rounded-xl shadow-2xl border border-[var(--border-gray-700)] p-6">
            <h2 className="text-lg font-semibold text-[var(--text-white)] mb-3">
              Delete Folder
            </h2>

            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              Are you sure you want to permanently delete this folder?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setFolderToDelete(null)}
                className="px-4 py-2 rounded-md text-sm bg-[var(--bg-hover)] text-[var(--text-white)] hover:opacity-90 transition"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  deleteMutation.mutate(folderToDelete.id);
                }}
                className="px-4 py-2 rounded-md text-sm bg-[var(--danger-red)] text-white hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
