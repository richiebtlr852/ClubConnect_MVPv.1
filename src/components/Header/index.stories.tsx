import { Header } from ".";
import { AppShell } from "@mantine/core";
import { useDarkMode } from "@vueless/storybook-dark-mode";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

export const Template: StoryObj<typeof Header> = {
  render: function Wrapper() {
    const darkMode = useDarkMode();
    return (
      <AppShell>
        <Header onToggleColorScheme={console.log} colorScheme={darkMode ? "dark" : "light"} />
      </AppShell>
    );
  },
};
