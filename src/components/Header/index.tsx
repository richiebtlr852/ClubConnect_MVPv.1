import { useAuth } from "../../hooks/useAuth";
import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Text } from "@mantine/core";
import { IconMoonStars, IconSun, IconLogout } from "@tabler/icons-react";
import { useCallback } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router";
import type { MantineColorScheme } from "@mantine/core";
import type { JSX } from "react";

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
}

const NavLinks: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/packages",
    label: "Packages",
  },
  {
    path: "/invites",
    label: "Invites",
  },
];

export function Header({ colorScheme, onToggleColorScheme }: HeaderProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      await navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout, navigate]);

  return (
    <AppShell.Header p="md">
      <Group justify="space-between" align="center" h="100%">
        <Text component={Link} to="/" fw={800} visibleFrom="sm">
          SponsorHub
        </Text>

        <Group gap="sm">
          {user !== null ? (
            <Group gap="xs" visibleFrom="xs">
              {NavLinks.map(({ path, label }) => {
                const isActive =
                  location.pathname === path || location.pathname.startsWith(`${path}/`);

                return (
                  <MantineNavLink
                    key={path}
                    component={NavLink}
                    to={path}
                    label={label}
                    active={isActive}
                    style={{
                      width: "auto",
                      display: "inline-flex",
                    }}
                    styles={{
                      root: {
                        paddingInline: 12,
                      },
                    }}
                  />
                );
              })}
            </Group>
          ) : null}
        </Group>
        <Group gap="xs">
          <ActionIcon onClick={onToggleColorScheme} variant="default" size="lg">
            {colorScheme === "dark" ? <IconSun size={20} /> : <IconMoonStars size={20} />}
          </ActionIcon>

          {user !== null ? (
            <ActionIcon
              onClick={() => {
                void handleLogout();
              }}
              variant="light"
              color="red"
              size="lg"
              title="Logout"
            >
              <IconLogout size={20} />
            </ActionIcon>
          ) : null}
        </Group>
      </Group>
    </AppShell.Header>
  );
}
