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
} from "@mantine/core";
import {
  IconUsers,
  IconUserCheck,
  IconUserX,
  IconClock,
  IconSettings,
  IconPhoto,
  IconHeart,
  IconGift,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const supabase = await createClient();
  const [{ data: guests }, { data: settings }] = await Promise.all([
    supabase.from("guests").select("attendance, number_of_guests"),
    supabase.from("wedding_settings").select("groom_name, bride_name").limit(1).single(),
  ]);

  const total = guests?.length ?? 0;
  const attending = guests?.filter((g) => g.attendance === "ATTENDING").length ?? 0;
  const notAttending = guests?.filter((g) => g.attendance === "NOT_ATTENDING").length ?? 0;
  const pending = guests?.filter((g) => g.attendance === "PENDING").length ?? 0;
  const totalGuests =
    guests
      ?.filter((g) => g.attendance === "ATTENDING")
      .reduce((sum, g) => sum + (g.number_of_guests ?? 0), 0) ?? 0;

  const stats = [
    { label: "Total Tamu", value: total, icon: IconUsers, color: "blue" },
    { label: "Akan Hadir", value: attending, icon: IconUserCheck, color: "green" },
    { label: "Tidak Hadir", value: notAttending, icon: IconUserX, color: "red" },
    { label: "Belum Konfirmasi", value: pending, icon: IconClock, color: "yellow" },
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
          <Title order={2} className="!font-serif">
            Selamat datang
          </Title>
          <Text c="dimmed">
            {settings ? `${settings.groom_name} & ${settings.bride_name}` : "Wedding Invitation"}
          </Text>
        </div>

        <SimpleGrid cols={{ base: 2, sm: 4 }}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} withBorder p="md" radius="md">
                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      {s.label}
                    </Text>
                    <Text size="xl" fw={700} mt={4}>
                      {s.value}
                    </Text>
                  </div>
                  <ThemeIcon color={s.color} variant="light" size="lg" radius="md">
                    <Icon size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        <Card withBorder p="md" radius="md">
          <Text size="sm" c="dimmed" tt="uppercase" fw={600} mb="xs">
            Estimasi Jumlah Hadirin
          </Text>
          <Title order={3}>{totalGuests} orang</Title>
          <Text size="sm" c="dimmed">
            (dari tamu yang sudah konfirmasi hadir)
          </Text>
        </Card>

        <div>
          <Title order={4} mb="sm" className="!font-serif">
            Quick Links
          </Title>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }}>
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Anchor
                  key={l.href}
                  component={Link}
                  href={l.href}
                  underline="never"
                >
                  <Card withBorder p="md" radius="md" className="hover:shadow-md transition">
                    <Stack align="center" gap="xs">
                      <ThemeIcon color="yellow" variant="light" size="xl" radius="md">
                        <Icon size={22} />
                      </ThemeIcon>
                      <Text size="sm" fw={500} ta="center">
                        {l.label}
                      </Text>
                    </Stack>
                  </Card>
                </Anchor>
              );
            })}
          </SimpleGrid>
        </div>
      </Stack>
    </DashboardShell>
  );
}
