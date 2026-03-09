import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

const ReactQueryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
