"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFolders, createFolders, delFolder, editFolder } from "@/lib/api";

export const useFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
};

export const useCreateFolder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createFolders,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useDeleteFolder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: delFolder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useEditFolder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      editFolder(id, name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });
};
