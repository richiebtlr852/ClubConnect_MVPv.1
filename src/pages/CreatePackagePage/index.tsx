import { PackageLabels, PackagePlaceholders, PackageFormNames } from "./utils";
import { useCreateDocument, useGetDocuments } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { PackageSchema, CollectionNames } from "../../schemas";
import {
  Button,
  Card,
  Container,
  Group,
  Stack,
  TextInput,
  Textarea,
  Title,
  Text,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { limit, where } from "firebase/firestore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNavigate } from "react-router";
import type { PackageSchemaValues } from "../../schemas";
import type { JSX, MouseEventHandler } from "react";

export function CreatePackagePage(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: clubDetails, isLoading } = useGetDocuments({
    collectionName: CollectionNames.Club,
    queryConstraints:
      typeof user?.uid === "string" ? [where("createdBy", "==", user.uid), limit(1)] : undefined,
    enabled: typeof user?.uid === "string",
  });
  const { mutateAsync: createPackage } = useCreateDocument(CollectionNames.Packages);
  const { getInputProps, submitting, values, removeListItem, insertListItem, onSubmit, errors } =
    useForm<PackageSchemaValues>({
      initialValues: {
        name: "",
        season: "",
        sponsorshipAmount: 0,
        description: "",
        benefits: [],
        clubID: "",
      },
      validate: zod4Resolver(PackageSchema),
    });

  const handleSubmit = async (values: PackageSchemaValues) => {
    if (Array.isArray(clubDetails) && clubDetails.length > 0 && typeof user?.uid === "string") {
      try {
        await createPackage({
          ...values,
          clubID: clubDetails[0].id ?? "", // clubDetails is a single document for a single user its allways present in this Page as this page is inside the protected route
          createdBy: user.uid, // user is always present in this Page as this page is inside the protected route
        });
        void navigate("/packages");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveBenefitItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    const parsedIndex = Number.parseInt(index ?? "");
    if (Number.isNaN(parsedIndex) === false) {
      removeListItem(PackageFormNames.benefits, parsedIndex);
    }
  };

  const handleAddBenefitItem: MouseEventHandler<HTMLButtonElement> = () => {
    insertListItem(PackageFormNames.benefits, {
      id: crypto.randomUUID(),
      text: "",
    });
  };

  return (
    <Container size="lg">
      <Stack>
        <Title>Create New Sponsorship Package</Title>
        <Card withBorder radius="md">
          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label={PackageLabels.name}
                placeholder={PackagePlaceholders.name}
                withAsterisk
                {...getInputProps(PackageFormNames.name)}
              />
              {/* TODO: update TextInput if needed */}
              <TextInput
                label={PackageLabels.season}
                placeholder={PackagePlaceholders.season}
                withAsterisk
                {...getInputProps(PackageFormNames.season)}
              />
              <NumberInput
                label={PackageLabels.sponsorshipAmount}
                placeholder={PackagePlaceholders.sponsorshipAmount}
                prefix="$"
                thousandSeparator=","
                withAsterisk
                hideControls
                {...getInputProps(PackageFormNames.sponsorshipAmount)}
              />
              <Textarea
                label={PackageLabels.description}
                placeholder={PackagePlaceholders.description}
                withAsterisk
                rows={4}
                {...getInputProps(PackageFormNames.description)}
              />
              <Stack>
                <Text size="sm" fw={500}>
                  {PackageLabels.benefits}
                </Text>
                {typeof errors.benefits === "string" ? (
                  <Text size="xs" c="red">
                    {errors.benefits}
                  </Text>
                ) : null}
                {values.benefits.map((benefit, index) => {
                  return (
                    <Group key={benefit.id} align="flex-start">
                      <TextInput
                        style={{ flex: 1 }}
                        placeholder={`${PackagePlaceholders.benefits} ${(index + 1).toString()}`}
                        {...getInputProps(`${PackageFormNames.benefits}.${index.toString()}.text`)}
                      />

                      <ActionIcon
                        color="red"
                        variant="light"
                        data-index={index}
                        size="lg" // For matching the height of TextInput
                        onClick={handleRemoveBenefitItem}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  );
                })}

                <Button
                  variant="light"
                  leftSection={<IconPlus size={16} />}
                  onClick={handleAddBenefitItem}
                >
                  Add new benefit
                </Button>
              </Stack>

              <Button type="submit" loading={submitting || isLoading}>
                Save package
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
