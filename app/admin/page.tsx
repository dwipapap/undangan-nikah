import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/admin/DashboardShell";
import {
  SimpleGrid,
  Card,
  Text,
  Title,
  Group,
  ThemeIcon,
  Stack,
  Anchor,
  Divider,
} from "@mantine/core";
import {
  IconUsers,
  IconMessage,
  IconSettings,
  IconPhoto,
  IconHeart,
  IconGift,
  IconArrowRight,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const supabase = await createClient();
  const [{ count: totalGuests }, { data: wishes }, { data: settings }] = await Promise.all([
    supabase.from("guests").select("*", { count: "exact", head: true }),
    supabase.from("wishes").select("id"),
    supabase.from("wedding_settings").select("groom_name, bride_name").limit(1).single(),
  ]);

  const stats = [
    { label: "Total Tamu", value: totalGuests ?? 0, icon: IconUsers },
    { label: "Total Ucapan Masuk", value: wishes?.length ?? 0, icon: IconMessage },
  ];

  const links = [
    { href: "/admin/settings", label: "Pengaturan Umum", icon: IconSettings },
    { href: "/admin/guests", label: "Manajemen Tamu", icon: IconUsers },
    { href: "/admin/gallery", label: "Gallery Foto", icon: IconPhoto },
    { href: "/admin/love-story", label: "Love Story", icon: IconHeart },
    { href: "/admin/gift", label: "Wedding Gift", icon: IconGift },
  ];

  return (
    <DashboardShell>
      <Stack gap="xl">
        <div>
          <Title order={2}>
            Selamat datang
          </Title>
          <Text c="dimmed" size="sm">
            {settings ? `${settings.groom_name} & ${settings.bride_name}` : "Wedding Invitation"}
          </Text>
        </div>

        <SimpleGrid cols={{ base: 2 }}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} withBorder p="lg" radius="md" bg="var(--mantine-color-body)">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      {s.label}
                    </Text>
                    <Text fz={28} fw={700} mt={4} lh={1}>
                      {s.value}
                    </Text>
                  </div>
                  <ThemeIcon color="gray" variant="light" size="lg" radius="md">
                    <Icon size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        <Divider />

        <div>
          <Text fw={600} size="sm" tt="uppercase" c="dimmed" mb="md">
            Kelola
          </Text>
          <Stack gap={4}>
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Anchor
                  key={l.href}
                  component={Link}
                  href={l.href}
                  underline="never"
                  c="dark"
                >
                  <Group
                    py="sm"
                    px="md"
                    gap="sm"
                    className="rounded-md hover:bg-[var(--mantine-color-gray-0)] transition"
                  >
                    <Icon size={18} className="text-gold" />
                    <Text size="sm" fw={500} style={{ flex: 1 }}>
                      {l.label}
                    </Text>
                    <IconArrowRight size={14} className="text-muted" />
                  </Group>
                </Anchor>
              );
            })}
          </Stack>
        </div>
      </Stack>
    </DashboardShell>
  );
}
