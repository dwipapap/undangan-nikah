"use client";

import { SessionProvider } from "next-auth/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";

const adminTheme = createTheme({
  primaryColor: "gray",
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  headings: { fontFamily: "var(--font-poppins), system-ui, sans-serif", fontWeight: "500" },
  defaultRadius: "md",
});

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider theme={adminTheme} defaultColorScheme="light">
        <Notifications position="top-right" />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
