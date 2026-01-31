import { IconPackage, IconSend } from "@tabler/icons-react";
import type { JSX } from "react";

interface DashboardCardItem {
  title: string;
  description: string;
  icon: JSX.Element;
  iconColor: string;
  to: string;
}

export const DashboardCards: DashboardCardItem[] = [
  {
    title: "Sponsorship Packages",
    description: "View, create and manage your club's sponsorship tiers and benefits.",
    icon: <IconPackage size={24} />,
    iconColor: "violet",
    to: "/packages",
  },
  {
    title: "Sponsor Invitations",
    description: "Send invitations to potential sponsors and track their responses.",
    icon: <IconSend size={24} />,
    iconColor: "blue",
    to: "/invites",
  },
];
