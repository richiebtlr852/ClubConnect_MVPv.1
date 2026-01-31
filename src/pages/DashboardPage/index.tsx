import { DashboardCards } from "./utils";
import { useGetDocuments } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { CollectionNames } from "../../schemas";
import {
  Container,
  SimpleGrid,
  Card,
  Title,
  Text,
  Group,
  Stack,
  ThemeIcon,
  Paper,
} from "@mantine/core";
import { IconBuildingCommunity } from "@tabler/icons-react";
import { where, limit } from "firebase/firestore";
import { Link } from "react-router";
import type { JSX } from "react";

export function DashboardPage(): JSX.Element {
  const { user } = useAuth();
  const { data: clubDetails } = useGetDocuments({
    collectionName: CollectionNames.Club,
    queryConstraints:
      typeof user?.uid === "string" ? [where("createdBy", "==", user.uid), limit(1)] : undefined,
    enabled: typeof user?.uid === "string",
  });

  return (
    <Container size="lg">
      <Stack>
        <Group>
          <Stack gap={0}>
            <Title>Dashboard</Title>
            <Text c="dimmed">Manage your club&apos;s sponsorship activities</Text>
          </Stack>
        </Group>

        {Array.isArray(clubDetails) && clubDetails.length > 0 ? (
          <Paper withBorder p="xl" radius="md" bg="var(--mantine-color-blue-0)">
            <Group>
              <ThemeIcon size={60} radius="md" variant="light">
                <IconBuildingCommunity size={34} />
              </ThemeIcon>
              <Stack gap={0}>
                <Title order={3}>{clubDetails[0].name}</Title>
                <Text c="dimmed">{clubDetails[0].suburb}</Text>
              </Stack>
            </Group>
          </Paper>
        ) : null}

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {DashboardCards.map(({ to, iconColor, icon, title, description }) => {
            return (
              <Card key={to} withBorder radius="md" component={Link} to={to}>
                <Stack>
                  <ThemeIcon color={iconColor} size={40} radius="md" variant="light">
                    {icon}
                  </ThemeIcon>

                  <Stack gap={0}>
                    <Text fw={700} size="lg">
                      {title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {description}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
