import type { PackageSchemaValues } from "../../schemas";

export const PackageLabels = {
  name: "Sponsorship Package Name",
  season: "Season",
  sponsorshipAmount: "Sponsorship Amount",
  description: "Sponsorship Description",
  benefits: "Sponsorship Benefits",
  id: "",
  createdAt: "",
  updatedAt: "",
  createdBy: "",
  clubID: "",
} as const satisfies Record<keyof PackageSchemaValues, string>;

export const PackagePlaceholders = {
  name: "e.g. Platinum",
  season: "e.g. 2025 Season",
  sponsorshipAmount: "0",
  description: "Briefly describe the sponsorship package here",
  benefits: "Benefit",
  id: "",
  createdAt: "",
  updatedAt: "",
  createdBy: "",
  clubID: "",
} as const satisfies Record<keyof PackageSchemaValues, string>;

export const PackageFormNames = {
  name: "name",
  season: "season",
  sponsorshipAmount: "sponsorshipAmount",
  description: "description",
  benefits: "benefits",
  id: "id",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  createdBy: "createdBy",
  clubID: "clubID",
} as const satisfies Record<keyof PackageSchemaValues, keyof PackageSchemaValues>;
