import { InviteLabels, InvitePlaceholders, InviteFormNames } from "./utils";
import { useCreateDocument, useGetDocuments } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { CollectionNames, InviteFormSchema } from "../../schemas";
import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
  TextInput,
  ActionIcon,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSend, IconPlus, IconTrash } from "@tabler/icons-react";
import { limit, where } from "firebase/firestore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { InviteFormValues } from "../../schemas";
import type { JSX, MouseEventHandler } from "react";

export function InvitePage(): JSX.Element {
  const { user } = useAuth();
  const { mutateAsync: sendInvitation } = useCreateDocument(CollectionNames.Mail);
  const { data: clubDetails, isLoading } = useGetDocuments({
    collectionName: CollectionNames.Club,
    queryConstraints:
      typeof user?.uid === "string" ? [where("createdBy", "==", user.uid), limit(1)] : undefined,
    enabled: typeof user?.uid === "string",
  });
  const {
    getInputProps,
    submitting,
    values,
    errors,
    removeListItem,
    insertListItem,
    onSubmit,
    reset,
  } = useForm<InviteFormValues>({
    initialValues: {
      emails: [],
    },
    validate: zod4Resolver(InviteFormSchema),
  });

  const handleSubmit = async (values: InviteFormValues): Promise<void> => {
    if (Array.isArray(clubDetails) && clubDetails.length > 0 && typeof user?.uid === "string") {
      try {
        const sendEmailPromises = values.emails.map((email) => {
          return sendInvitation({
            clubID: clubDetails[0].id ?? "",
            to: email,
            message: {
              subject: "Sponsorship Invitation",
              html: `<p>You have been invited to sponsor our club. Please contact us for more details.</p>`,
            },
            createdBy: user.uid,
          });
        });
        await Promise.all(sendEmailPromises);
        reset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveEmail: MouseEventHandler<HTMLButtonElement> = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    const parsedIndex = Number.parseInt(index ?? "");
    if (Number.isNaN(parsedIndex) === false) {
      removeListItem(InviteFormNames.emails, parsedIndex);
    }
  };

  const handleAddEmail: MouseEventHandler<HTMLButtonElement> = () => {
    insertListItem(InviteFormNames.emails, "");
  };

  return (
    <Container size="lg">
      <Stack>
        <Title>Invite Sponsors</Title>
        <Card withBorder radius="md">
          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack>
              <Text size="sm" c="dimmed" fw={500}>
                {InviteLabels.emails}
              </Text>
              {typeof errors.emails === "string" ? (
                <Text size="xs" c="red">
                  {errors.emails}
                </Text>
              ) : null}
              {values.emails.map((_, index) => {
                return (
                  <Group key={index} align="flex-start">
                    <TextInput
                      style={{ flex: 1 }}
                      placeholder={InvitePlaceholders.emails}
                      {...getInputProps(`${InviteFormNames.emails}.${index.toString()}`)}
                    />
                    <ActionIcon
                      color="red"
                      variant="light"
                      data-index={index}
                      size="lg" // For matching the height of TextInput
                      onClick={handleRemoveEmail}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              })}

              <Button variant="light" leftSection={<IconPlus size={16} />} onClick={handleAddEmail}>
                Add new email
              </Button>
              <Button
                type="submit"
                leftSection={<IconSend size={18} />}
                loading={submitting || isLoading}
              >
                Send Invitation
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
