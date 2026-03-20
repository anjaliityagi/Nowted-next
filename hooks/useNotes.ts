"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNotes, fetchFav, fetchArchive, fetchDeleted } from "@/lib/api";

export const useNotes = (filter?: string, folderId?: string) => {
  return useInfiniteQuery({
    queryKey: ["notes", filter, folderId],

    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      const page = pageParam as number;

      if (filter === "favorites") return fetchFav(true, page, 10);
      if (filter === "archive") return fetchArchive(true, page, 10);
      if (filter === "trash") return fetchDeleted(true, page, 10);
      if (folderId) return fetchNotes(folderId, page, 10);

      return Promise.resolve([]);
    },

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};
