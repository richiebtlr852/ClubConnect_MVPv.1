import { SignupFormNames, SignupLabels, SignupPlaceholders } from "./utiils";
import { useSignUp } from "../../hooks";
import { SignupSchema } from "../../schemas";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack,
  Container,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { Link, useNavigate } from "react-router";
import type { SignupFormValues } from "../../schemas";
import type { JSX } from "react";

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const { mutateAsync } = useSignUp({
    onSuccess: () => {
      void navigate("/");
    },
  });

  const { getInputProps, onSubmit, submitting } = useForm<SignupFormValues>({
    initialValues: {
      name: "",
      suburb: "",
      email: "",
      password: "",
    },
    validate: zod4Resolver(SignupSchema),
  });

  const handleSubmit = (values: SignupFormValues) => {
    mutateAsync(values).catch(console.log);
    // TODO: handle errors
  };

  return (
    <Container size="lg">
      <Stack>
        <Stack align="center" gap={2}>
          <Title>Create Club Account</Title>
          <Text c="dimmed" size="sm">
            Already have an account?{" "}
            <Text component={Link} to="/login" size="sm" fw={700} c="blue">
              Login
            </Text>
          </Text>
        </Stack>

        <Card withBorder radius="md">
          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label={SignupLabels.name}
                placeholder={SignupPlaceholders.name}
                withAsterisk
                {...getInputProps(SignupFormNames.name)}
              />
              <TextInput
                label={SignupLabels.suburb}
                placeholder={SignupPlaceholders.suburb}
                withAsterisk
                {...getInputProps(SignupFormNames.suburb)}
              />
              <TextInput
                label={SignupLabels.email}
                placeholder={SignupPlaceholders.email}
                withAsterisk
                {...getInputProps(SignupFormNames.email)}
              />
              <PasswordInput
                label={SignupLabels.password}
                placeholder={SignupPlaceholders.password}
                withAsterisk
                {...getInputProps(SignupFormNames.password)}
              />

              <Button type="submit" fullWidth loading={submitting}>
                Create Account
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}
