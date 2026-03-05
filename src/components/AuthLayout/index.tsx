import type { JSX, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden relative">
      {/* Left Section - Blue Branding Panel */}
      <div className="w-[45%] bg-gradient-to-b from-[#3b82f6] to-[#2563eb] flex flex-col justify-center px-[60px] relative flex-shrink-0">
        {/* Logo */}
        <div className="absolute top-[40px] left-[60px]">
          <img
            src="https://res.cloudinary.com/mushi42/image/upload/svgviewer-png-output_mdpb2e.png"
            alt="ClubConnect.ai"
            className="h-[50px] w-auto"
          />
        </div>

        {/* Marketing Headline */}
        <div className="text-[48px] font-bold leading-tight font-sans">
          <div className="text-white">Where Clubs,</div>
          <div className="text-[#efbf04]">Sponsors &</div>
          <div className="text-white">Members</div>
          <div className="text-white">Connect</div>
        </div>
      </div>

      {/* Right Section - Form Panel */}
      <div className="w-[65%] flex absolute right-0 h-screen">
        {/* White Rounded Container with Elliptical Curve */}
        <div className="bg-white rounded-l-[200px] px-[120px] py-[80px] pl-[180px] w-full h-screen flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
