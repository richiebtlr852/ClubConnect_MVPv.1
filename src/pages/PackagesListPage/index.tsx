import { useGetClubByUserId, useGetPackagesByClubId } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { Button, Container, Group, Title, Stack, Tooltip, ActionIcon } from "@mantine/core";
import { CustomTable } from "@manufac/react-components-potli";
import { IconPlus, IconArrowRight } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router";
import type { PackageSchemaValues } from "../../schemas";
import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";

export function PackagesListPage(): JSX.Element {
  const { user } = useAuth();
  const { data: clubDetails } = useGetClubByUserId(user?.uid);
  const {
    data: packages,
    isLoading: isPackagesLoading,
    error: packagesError,
  } = useGetPackagesByClubId(clubDetails?.id ?? undefined);

  // Adopted from https://github.com/manufac-analytics/mover/blob/main/apps/web/src/pages/Admin/index.tsx
  const packageListColumns = useMemo(() => {
    const packageListColumnHelper = createColumnHelper<PackageSchemaValues>();
    return [
      packageListColumnHelper.accessor("name", {
        header: "Package Name",
      }),
      packageListColumnHelper.accessor("sponsorshipAmount", {
        header: "Amount",
      }),
      packageListColumnHelper.accessor("season", {
        header: "Season",
      }),
      packageListColumnHelper.accessor("id", {
        header: "Action",
        enableColumnFilter: false,
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <Group justify="flex-end">
              <Tooltip label="View Details">
                <ActionIcon variant="light" component={Link} to={`/packages/${value ?? ""}`}>
                  <IconArrowRight size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          );
        },
      }),
    ];
  }, []);

  return (
    <Container size="lg">
      <Stack>
        <Group justify="space-between">
          <Title>Sponsorship Packages</Title>
          <Button component={Link} to="/packages/create" leftSection={<IconPlus size={18} />}>
            Create new package
          </Button>
        </Group>
        <CustomTable
          columns={packageListColumns as ColumnDef<PackageSchemaValues>[]}
          data={packages ?? []}
          isLoading={isPackagesLoading}
          error={packagesError}
        />
      </Stack>
    </Container>
  );
}
