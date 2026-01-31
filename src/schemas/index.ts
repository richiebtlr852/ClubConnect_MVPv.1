import { Timestamp } from "firebase/firestore";
import { z } from "zod";
import type { ZodType } from "zod";

const BaseSchema = z.object({
  id: z.string().nullish(),
  createdAt: z.instanceof(Timestamp).nullish(),
  updatedAt: z.instanceof(Timestamp).nullish(),
  createdBy: z.string().nullish(),
});

const BenefitSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Benefit is required"),
});

export const ClubSchema = BaseSchema.extend({
  // id (ClubID), createdAt, createdBy, and updatedAt will be assigned at the time of creation.
  name: z.string(),
  suburb: z.string(),
  email: z.email(),
});

export const PackageSchema = BaseSchema.extend({
  // id (PackageID), createdAt, createdBy, and updatedAt will be assigned at the time of creation
  clubID: z.string(),
  name: z.string().min(1, "Package name is required"),
  season: z.string().min(1, "Season is required"),
  sponsorshipAmount: z.number().min(1, "Amount is required"),
  description: z.string().min(1, "Description is required"),
  benefits: z.array(BenefitSchema).min(1, "At least one benefit is required"),
});

export const InviteSchema = BaseSchema.extend({
  // id (InviteID), createdAt, createdBy, and updatedAt will be assigned at the time of creation
  clubID: z.string(),
  to: z.email(),
  message: z.object({
    subject: z.string(),
    html: z.string(),
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(1, "Club name is required"),
  suburb: z.string().min(1, "Suburb is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const InviteFormSchema = z.object({
  emails: z
    .array(z.email("Invalid email address"))
    .min(1, "Please enter at least one email address")
    .refine(
      (emails) => {
        const normalized = emails.map((email) => {
          return email.trim().toLowerCase();
        });
        return new Set(normalized).size === normalized.length;
      },
      { message: "Duplicate emails are not allowed" },
    ),
});

export const CollectionNames = {
  Club: "club",
  Packages: "packages",
  Mail: "mail",
} as const;

export const CollectionMap = {
  [CollectionNames.Club]: ClubSchema,
  [CollectionNames.Packages]: PackageSchema,
  [CollectionNames.Mail]: InviteSchema,
} as const satisfies Record<CollectionName, ZodType>;

export type Club = z.infer<typeof ClubSchema>;
export type Invite = z.infer<typeof InviteSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type CollectionName = (typeof CollectionNames)[keyof typeof CollectionNames];
export type PackageSchemaValues = z.infer<typeof PackageSchema>;
export type InviteFormValues = z.infer<typeof InviteFormSchema>;
