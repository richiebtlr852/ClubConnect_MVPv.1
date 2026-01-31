import { useAuth } from "../hooks/useAuth";
import { Center, Loader } from "@mantine/core";
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
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  } else if (user === null) {
    content = <Navigate to="/login" replace />;
  } else {
    content = <>{children}</>;
  }

  return content;
}
