"use client";

import { useQuery } from "@tanstack/react-query";
import { searchNote } from "@/lib/api";

export const useSearchNotes = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchNote(query),
    enabled: !!query,
  });
};
