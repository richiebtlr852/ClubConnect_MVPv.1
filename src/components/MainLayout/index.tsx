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
      <main className="ml-64 pt-16">
        <div className="px-5 py-5">{children}</div>
      </main>
    </div>
  );
}
