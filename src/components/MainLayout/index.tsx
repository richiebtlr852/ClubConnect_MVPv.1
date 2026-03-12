import { Sidebar } from "../Sidebar";
import { TopHeader } from "../TopHeader";
import type { JSX, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <TopHeader />
      <main className="ml-[276px] pt-[88px]">
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
