"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Title,
  Table,
  Button,
  TextInput,
  Modal,
  Stack,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
  Text,
  Card,
  Loader,
  Center,
  CopyButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import {
  IconPlus,
  IconCopy,
  IconTrash,
  IconCheck,
  IconExternalLink,
  IconSearch,
} from "@tabler/icons-react";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { api } from "@/lib/api-client";
import type { Guest } from "@/lib/types";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const data = await api<Guest[]>("/api/guests");
      setGuests(data);
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setLoading(false);
    }
  }

  async function createGuest() {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await api("/api/guests", { method: "POST", body: JSON.stringify({ name: name.trim() }) });
      notifications.show({ message: "Tamu berhasil ditambahkan", color: "green" });
      setName("");
      close();
      refresh();
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setCreating(false);
    }
  }

  async function deleteGuest(g: Guest) {
    modals.openConfirmModal({
      title: "Hapus tamu?",
      children: (
        <Text size="sm">
          Tamu <b>{g.name}</b> akan dihapus permanen.
        </Text>
      ),
      labels: { confirm: "Hapus", cancel: "Batal" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await api(`/api/guests/${g.id}`, { method: "DELETE" });
          notifications.show({ message: "Tamu dihapus", color: "green" });
          refresh();
        } catch (e) {
          notifications.show({ message: (e as Error).message, color: "red" });
        }
      },
    });
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return guests;
    const q = search.toLowerCase();
    return guests.filter(
      (g) => g.name.toLowerCase().includes(q) || g.slug.toLowerCase().includes(q)
    );
  }, [guests, search]);

  function statusBadge(status: Guest["attendance"]) {
    if (status === "ATTENDING") return <Badge color="green">Hadir</Badge>;
    if (status === "NOT_ATTENDING") return <Badge color="red">Tidak Hadir</Badge>;
    return <Badge color="gray">Pending</Badge>;
  }

  return (
    <DashboardShell>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2} className="!font-serif">
            Manajemen Tamu
          </Title>
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            Tambah Tamu
          </Button>
        </Group>

        <Card withBorder p="md" radius="md">
          <TextInput
            placeholder="Cari nama atau slug..."
            leftSection={<IconSearch size={14} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            mb="md"
          />

          {loading ? (
            <Center h={200}>
              <Loader />
            </Center>
          ) : filtered.length === 0 ? (
            <Text ta="center" c="dimmed" py="xl">
              Belum ada tamu. Klik &quot;Tambah Tamu&quot; untuk mulai.
            </Text>
          ) : (
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="sm" striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Nama</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Jumlah</Table.Th>
                    <Table.Th>Ucapan</Table.Th>
                    <Table.Th>Link</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filtered.map((g) => {
                    const link = `${origin}/${g.slug}`;
                    return (
                      <Table.Tr key={g.id}>
                        <Table.Td>
                          <Text fw={500}>{g.name}</Text>
                          <Text size="xs" c="dimmed">
                            {g.slug}
                          </Text>
                        </Table.Td>
                        <Table.Td>{statusBadge(g.attendance)}</Table.Td>
                        <Table.Td>{g.number_of_guests}</Table.Td>
                        <Table.Td>
                          <Text size="sm" lineClamp={2} style={{ maxWidth: 200 }}>
                            {g.wishes ?? "-"}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <CopyButton value={link}>
                              {({ copied, copy }) => (
                                <Tooltip label={copied ? "Tersalin!" : "Copy link"}>
                                  <ActionIcon
                                    variant="light"
                                    color={copied ? "green" : "blue"}
                                    onClick={copy}
                                  >
                                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </CopyButton>
                            <Tooltip label="Buka link">
                              <ActionIcon
                                component="a"
                                href={`/${g.slug}`}
                                target="_blank"
                                variant="light"
                              >
                                <IconExternalLink size={14} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <ActionIcon color="red" variant="subtle" onClick={() => deleteGuest(g)}>
                            <IconTrash size={14} />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </Card>
      </Stack>

      <Modal opened={opened} onClose={close} title="Tambah Tamu" centered>
        <Stack>
          <TextInput
            label="Nama Tamu"
            placeholder="Budi Santoso"
            required
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            data-autofocus
          />
          <Text size="xs" c="dimmed">
            Slug akan otomatis dibuat dari nama + random string (contoh: budi-santoso-x7k2)
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              Batal
            </Button>
            <Button onClick={createGuest} loading={creating}>
              Tambah
            </Button>
          </Group>
        </Stack>
      </Modal>
    </DashboardShell>
  );
}
