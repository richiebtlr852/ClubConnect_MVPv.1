import type { SignupFormValues } from "../../schemas";

export const SignupLabels = {
  name: "Club Name",
  suburb: "Suburb",
  email: "Email",
  password: "Password",
} as const satisfies Record<keyof SignupFormValues, string>;

export const SignupPlaceholders = {
  name: "Your club name",
  suburb: "e.g. Richmond",
  email: "you@email.com",
  password: "Your password",
} as const satisfies Record<keyof SignupFormValues, string>;

export const SignupFormNames = {
  email: "email",
  name: "name",
  suburb: "suburb",
  password: "password",
} as const satisfies Record<keyof SignupFormValues, keyof SignupFormValues>;
