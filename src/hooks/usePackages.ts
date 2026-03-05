import { PackageService } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PackageSchemaValues } from "../schemas";
import type { CreatePackageData, UpdatePackageData } from "../services";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

/**
 * Hook to create a new package
 */
export function useCreatePackage(): UseMutationResult<PackageSchemaValues, Error, CreatePackageData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePackageData) => {
      return await PackageService.createPackage(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}

/**
 * Hook to get a package by ID
 */
export function useGetPackageById(packageId: string | undefined): UseQueryResult<PackageSchemaValues | null> {
  return useQuery({
    queryKey: ["packages", packageId],
    queryFn: async () => {
      if (typeof packageId !== "string" || packageId.length === 0) {
        return null;
      }
      return await PackageService.getPackageById(packageId);
    },
    enabled: typeof packageId === "string" && packageId.length > 0,
  });
}

/**
 * Hook to get all packages for a club
 */
export function useGetPackagesByClubId(clubId: string | undefined): UseQueryResult<PackageSchemaValues[]> {
  return useQuery({
    queryKey: ["packages", "club", clubId],
    queryFn: async () => {
      if (typeof clubId !== "string" || clubId.length === 0) {
        return [];
      }
      return await PackageService.getPackagesByClubId(clubId);
    },
    enabled: typeof clubId === "string" && clubId.length > 0,
  });
}

/**
 * Hook to update a package
 */
export function useUpdatePackage(): UseMutationResult<void, Error, { packageId: string; data: UpdatePackageData }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ packageId, data }) => {
      await PackageService.updatePackage(packageId, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}

/**
 * Hook to delete a package
 */
export function useDeletePackage(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageId: string) => {
      await PackageService.deletePackage(packageId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}
