import type { InviteFormValues } from "../../schemas";

export const InviteLabels = {
  emails: "Sponsor Email Addresses",
} as const satisfies Record<keyof InviteFormValues, string>;

export const InvitePlaceholders = {
  emails: "sponsor1@example.com",
} as const satisfies Record<keyof InviteFormValues, string>;

export const InviteFormNames = {
  emails: "emails",
} as const satisfies Record<keyof InviteFormValues, keyof InviteFormValues>;
