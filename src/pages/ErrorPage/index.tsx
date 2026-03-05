import { Container, Title, Text, Button, Group, Stack, ThemeIcon } from "@mantine/core";
import { IconError404, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { JSX } from "react";

export function ErrorPage(): JSX.Element {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    void navigate("/");
  };

  const handleGoBack = (): void => {
    void navigate(-1);
  };

  return (
    <Container size="md" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Stack align="center" gap="xl" style={{ width: "100%", textAlign: "center" }}>
        <ThemeIcon size={120} radius="xl" variant="light" color="red">
          <IconError404 size={80} />
        </ThemeIcon>

        <Stack gap="md" align="center">
          <Title order={1} size="3rem">
            404
          </Title>
          <Title order={2} size="1.5rem" fw={600}>
            Page Not Found
          </Title>
          <Text size="lg" c="dimmed" maw={500}>
            Sorry, the page you are looking for doesn&apos;t exist or has been moved. The link you
            followed may be broken or the page may have been removed.
          </Text>
        </Stack>

        <Group gap="md">
          <Button size="lg" leftSection={<IconHome size={20} />} onClick={handleGoHome}>
            Go to Dashboard
          </Button>
          <Button size="lg" variant="light" onClick={handleGoBack}>
            Go Back
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
