import { Link } from "react-router";
import type { JSX } from "react";

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export function AuthFormFooter({ text, linkText, linkTo }: AuthFormFooterProps): JSX.Element {
  return (
    <p className="text-center mt-6 text-[23px] tracking-[1.84px] font-sans">
      <span className="text-[#5a6acf] font-normal leading-[40px]">{text}</span>{" "}
      <Link
        to={linkTo}
        className="text-[#5b86e5] font-bold leading-[40px] no-underline hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
