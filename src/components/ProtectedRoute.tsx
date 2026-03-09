import { MainLayout } from "./MainLayout";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { user, isLoading } = useAuth();
  let content: JSX.Element;

  if (isLoading === true) {
    content = (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue" />
      </div>
    );
  } else if (user === null) {
    content = <Navigate to="/login" replace />;
  } else {
    content = <MainLayout>{children}</MainLayout>;
  }

  return content;
}
