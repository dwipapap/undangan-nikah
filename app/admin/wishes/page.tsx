"use client";

import { useEffect, useState } from "react";
import {
  Title,
  Text,
  Stack,
  Card,
  ActionIcon,
  Group,
  Badge,
  Loader,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { IconTrash, IconQuote } from "@tabler/icons-react";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { api } from "@/lib/api-client";

interface Wish {
  id: string;
  name: string;
  attendance: "PENDING" | "ATTENDING" | "NOT_ATTENDING";
  wishes: string;
  created_at: string;
}

export default function WishesPage() {
  const [items, setItems] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      setItems(await api<Wish[]>("/api/wishes"));
    } finally {
      setLoading(false);
    }
  }

  function remove(w: Wish) {
    modals.openConfirmModal({
      title: "Hapus ucapan?",
      children: (
        <Text size="sm">
          Ucapan dari <b>{w.name}</b> akan dihapus.
        </Text>
      ),
      labels: { confirm: "Hapus", cancel: "Batal" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await api(`/api/wishes/${w.id}`, { method: "DELETE" });
          notifications.show({ message: "Ucapan dihapus", color: "green" });
          refresh();
        } catch (e) {
          notifications.show({ message: (e as Error).message, color: "red" });
        }
      },
    });
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("id-ID");
  }

  function statusBadge(s: Wish["attendance"]) {
    if (s === "ATTENDING") return <Badge color="green" size="sm">Hadir</Badge>;
    if (s === "NOT_ATTENDING") return <Badge color="red" size="sm">Tidak Hadir</Badge>;
    return <Badge color="gray" size="sm">Pending</Badge>;
  }

  return (
    <DashboardShell>
      <Stack gap="lg">
        <div>
          <Title order={2} className="!font-serif">
            Ucapan Tamu
          </Title>
          <Text c="dimmed">Semua ucapan dan doa dari tamu undangan</Text>
        </div>

        {loading ? (
          <Center h={240}>
            <Loader />
          </Center>
        ) : items.length === 0 ? (
          <Card withBorder p="xl">
            <Text ta="center" c="dimmed">
              Belum ada ucapan dari tamu.
            </Text>
          </Card>
        ) : (
          <Stack gap="md">
            {items.map((w) => (
              <Card key={w.id} withBorder p="md" radius="md">
                <Group justify="space-between" align="flex-start">
                  <Group align="flex-start" gap="sm" style={{ flex: 1 }}>
                    <IconQuote size={20} className="text-amber-600 mt-1" />
                    <div style={{ flex: 1 }}>
                      <Group gap="xs">
                        <Text fw={600}>{w.name}</Text>
                        {statusBadge(w.attendance)}
                        <Text size="xs" c="dimmed">
                          {formatDate(w.created_at)}
                        </Text>
                      </Group>
                      <Text mt={4} c="gray.7">
                        {w.wishes}
                      </Text>
                    </div>
                  </Group>
                  <ActionIcon color="red" variant="subtle" onClick={() => remove(w)}>
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </DashboardShell>
  );
}
