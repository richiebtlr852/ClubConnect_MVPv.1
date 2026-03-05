import type { JSX } from "react";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function AuthButton({
  type = "submit",
  children,
  disabled = false,
  onClick,
}: AuthButtonProps): JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-[#2563eb] text-white border-none rounded-lg h-[60px] w-[419px] text-[25px] font-semibold cursor-pointer font-sans transition-all duration-200 hover:bg-[#1d4ed8] disabled:opacity-70 disabled:cursor-not-allowed tracking-[2px]`}
    >
      {children}
    </button>
  );
}
