// Adapted from https://github.com/manufac-analytics/mover/blob/main/apps/web/src/pages/Login/index.tsx
import { FirebaseAuth } from "../../lib/firebase-config";
import { Center, Stack, Title, Paper, Loader, Box, Text } from "@mantine/core";
import { EmailAuthProvider, onAuthStateChanged } from "firebase/auth"; // Ref: https://firebase.google.com/docs/auth/web/start
import * as FirebaseUI from "firebaseui"; // Ref: https://firebase.google.com/docs/auth/web/firebaseui
import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router";
import type { JSX } from "react";
import "firebaseui/dist/firebaseui.css"; // Ref: https://github.com/firebase/firebaseui-web

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const ui = useMemo(() => {
    const ui = FirebaseUI.auth.AuthUI.getInstance() ?? new FirebaseUI.auth.AuthUI(FirebaseAuth);
    return ui;
  }, []);

  useEffect(() => {
    const uiConfig: FirebaseUI.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return false; // Prevent full page reload
        },
        uiShown: () => {
          const loader = document.getElementById("loader");
          if (loader !== null) {
            loader.style.display = "none";
          }
        },
      },
      signInFlow: "popup",
      // Disable the default Firebase user signup flow since additional fields are required during registration.
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          disableSignUp: {
            status: true,
          },
        },
      ],
    };

    // Start FirebaseUI
    // Ref: https://firebase.google.com/docs/auth/web/firebaseui#using_firebaseui
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [navigate, ui]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user !== null) {
        void navigate("/");
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <Center>
      <Stack align="center" gap={16}>
        <Stack align="center" gap={2}>
          <Title order={3}>Welcome back!</Title>
          <Text c="dimmed" size="sm">
            Don&apos;t have an account?{" "}
            <Text component={Link} to="/signup" size="sm" fw={700} c="blue">
              SignUp
            </Text>
          </Text>
        </Stack>
        <Box id="firebaseui-auth-container" w={450} />
        <Paper id="loader" shadow="xs" radius="md" p="md" withBorder w="100%">
          <Loader />
        </Paper>
      </Stack>
    </Center>
  );
}
