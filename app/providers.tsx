"use client";

import { SessionProvider } from "next-auth/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";

const theme = createTheme({
  primaryColor: "yellow",
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  headings: { fontFamily: "var(--font-cormorant), serif" },
  defaultRadius: "md",
});

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
