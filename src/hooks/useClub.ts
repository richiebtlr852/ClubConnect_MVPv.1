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
      if (!userId) return null;
      return await ClubService.getClubByUserId(userId);
    },
    enabled: !!userId,
  });
}

/**
 * Hook to get club by ID
 */
export function useGetClubById(clubId: string | undefined): UseQueryResult<Club | null> {
  return useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => {
      if (!clubId) return null;
      return await ClubService.getClubById(clubId);
    },
    enabled: !!clubId,
  });
}
