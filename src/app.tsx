import { Header } from "./components/Header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles

const ReactQueryClient = new QueryClient();

export function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <AppShell
        padding="md" // It is important to use it instead of setting padding on the AppShell.Main directly because padding of the AppShell.Main is also used to offset AppShell.Header, AppShell.Navbar, AppShell.Aside and AppShell.Footer components. Ref: https://mantine.dev/core/app-shell/#padding-prop
        header={{ height: 60 }}
      >
        <Header colorScheme={colorScheme} onToggleColorScheme={toggleColorScheme} />
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}
