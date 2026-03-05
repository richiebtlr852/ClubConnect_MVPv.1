import { ClubService } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { Club } from "../schemas";
import type { UseQueryResult } from "@tanstack/react-query";

/**
 * Hook to get club by user ID
 */
export function useGetClubByUserId(userId: string | undefined): UseQueryResult<Club | null> {
  return useQuery({
    queryKey: ["club", "user", userId],
    queryFn: async () => {
      if (typeof userId !== "string" || userId.length === 0) {
        return null;
      }
      return await ClubService.getClubByUserId(userId);
    },
    enabled: typeof userId === "string" && userId.length > 0,
  });
}

/**
 * Hook to get club by ID
 */
export function useGetClubById(clubId: string | undefined): UseQueryResult<Club | null> {
  return useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => {
      if (typeof clubId !== "string" || clubId.length === 0) {
        return null;
      }
      return await ClubService.getClubById(clubId);
    },
    enabled: typeof clubId === "string" && clubId.length > 0,
  });
}
