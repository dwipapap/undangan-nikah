"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Title,
  UnstyledButton,
  Avatar,
  Text,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconSettings,
  IconUsers,
  IconPhoto,
  IconPhotoHeart,
  IconHeart,
  IconGift,
  IconMessage,
  IconLogout,
  IconExternalLink,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: IconHome },
  { href: "/admin/settings", label: "Pengaturan Umum", icon: IconSettings },
  { href: "/admin/guests", label: "Manajemen Tamu", icon: IconUsers },
  { href: "/admin/photos", label: "Foto Couple", icon: IconPhotoHeart },
  { href: "/admin/gallery", label: "Gallery", icon: IconPhoto },
  { href: "/admin/love-story", label: "Love Story", icon: IconHeart },
  { href: "/admin/gift", label: "Wedding Gift", icon: IconGift },
  { href: "/admin/wishes", label: "Ucapan Tamu", icon: IconMessage },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={4}>
              <span className="gold-text">Wedding</span> Admin
            </Title>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar size="sm" color="gray">
                    {(session?.user?.email ?? "A")[0].toUpperCase()}
                  </Avatar>
                  <Text size="sm" visibleFrom="sm">
                    {session?.user?.email ?? "Admin"}
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconExternalLink size={14} />}
                onClick={() => router.push("/")}
              >
                Lihat Site
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <ScrollArea>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<Icon size={18} />}
                active={active}
                variant="filled"
                onClick={() => opened && toggle()}
              />
            );
          })}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
