"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecents } from "@/lib/api";

export const useRecents = () => {
  return useQuery({
    queryKey: ["recents"],
    queryFn: fetchRecents,
  });
};
