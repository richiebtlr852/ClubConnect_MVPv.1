import type { JSX } from "react";

interface AuthFormHeaderProps {
  title: string;
}

export function AuthFormHeader({ title }: AuthFormHeaderProps): JSX.Element {
  return (
    <h1 className="text-[34px] font-semibold leading-[40px] text-[#2563eb] tracking-[2.72px] text-center mb-12 font-sans">
      {title}
    </h1>
  );
}
