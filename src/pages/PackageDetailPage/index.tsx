import { useGetPackageById } from "../../hooks";
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Group,
  List,
  ThemeIcon,
  ActionIcon,
  Divider,
  Button,
  Skeleton,
  Card,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconCurrencyDollar, IconCalendar } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import type { JSX } from "react";

export function PackageDetailPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: packageDetail, isLoading, error } = useGetPackageById(id);

  return (
    <Container size="lg">
      <Skeleton visible={isLoading}>
        {error !== null || packageDetail === null ? (
          <Card withBorder radius="md" ta="center">
            <Text c="red" size="lg" mb="md">
              Failed to load package detail
            </Text>
            <Button
              onClick={() => {
                void navigate("/packages");
              }}
              variant="light"
            >
              Back to list
            </Button>
          </Card>
        ) : (
          <Stack>
            <Group>
              <ActionIcon
                variant="subtle"
                onClick={() => {
                  void navigate(-1);
                }}
                size="lg"
              >
                <IconArrowLeft />
              </ActionIcon>
              <Title>{packageDetail.name}</Title>
            </Group>
            <Paper withBorder p="xl" radius="md">
              <Stack gap="xl">
                <Group grow align="flex-start">
                  <Stack gap={5}>
                    <Text size="sm" c="dimmed" fw={500}>
                      Investment Amount
                    </Text>
                    <Group>
                      <ThemeIcon color="green" variant="light" size="xl" radius="md">
                        <IconCurrencyDollar />
                      </ThemeIcon>
                      <Text size="xl" fw={700}>
                        {packageDetail.sponsorshipAmount.toLocaleString()}
                      </Text>
                    </Group>
                  </Stack>

                  <Stack gap={5}>
                    <Text size="sm" c="dimmed" fw={500}>
                      Season
                    </Text>
                    <Group>
                      <ThemeIcon color="blue" variant="light" size="xl" radius="md">
                        <IconCalendar />
                      </ThemeIcon>
                      <Text size="xl" fw={700}>
                        {packageDetail.season}
                      </Text>
                    </Group>
                  </Stack>
                </Group>

                <Divider />

                <Stack>
                  <Title order={4}>Description</Title>
                  <Text>{packageDetail.description}</Text>
                </Stack>

                <Stack>
                  <Title order={4}>Benefits</Title>
                  <List
                    spacing="xs"
                    center
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCheck size={16} />
                      </ThemeIcon>
                    }
                  >
                    {packageDetail.benefits.map(({ id, text }) => {
                      return <List.Item key={id}>{text}</List.Item>;
                    })}
                  </List>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Skeleton>
    </Container>
  );
}
