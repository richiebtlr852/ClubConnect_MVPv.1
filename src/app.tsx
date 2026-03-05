import { Header } from "./components/Header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles

const ReactQueryClient = new QueryClient();

export function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();

  // Hide header on login and signup pages
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <QueryClientProvider client={ReactQueryClient}>
      <AppShell padding={hideHeader ? 0 : "md"} header={hideHeader ? undefined : { height: 60 }}>
        {!hideHeader && (
          <Header colorScheme={colorScheme} onToggleColorScheme={toggleColorScheme} />
        )}
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}
