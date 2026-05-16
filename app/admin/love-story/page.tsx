"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Title,
  Text,
  Stack,
  Card,
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  ActionIcon,
  SimpleGrid,
  Loader,
  Center,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons-react";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { api } from "@/lib/api-client";
import type { LoveStory } from "@/lib/types";

export default function LoveStoryPage() {
  const [items, setItems] = useState<LoveStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<LoveStory | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    image_url: null as string | null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      setItems(await api<LoveStory[]>("/api/love-story"));
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: "", date: "", description: "", image_url: null });
    open();
  }
  function openEdit(it: LoveStory) {
    setEditing(it);
    setForm({
      title: it.title,
      date: it.date ?? "",
      description: it.description ?? "",
      image_url: it.image_url,
    });
    open();
  }

  async function save() {
    if (!form.title.trim()) {
      notifications.show({ message: "Judul wajib diisi", color: "orange" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await api(`/api/love-story/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await api("/api/love-story", {
          method: "POST",
          body: JSON.stringify({ ...form, order: items.length + 1 }),
        });
      }
      notifications.show({ message: "Tersimpan", color: "green" });
      close();
      refresh();
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setSaving(false);
    }
  }

  function remove(it: LoveStory) {
    modals.openConfirmModal({
      title: "Hapus love story?",
      children: <Text size="sm">{it.title} akan dihapus.</Text>,
      labels: { confirm: "Hapus", cancel: "Batal" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await api(`/api/love-story/${it.id}`, { method: "DELETE" });
        refresh();
      },
    });
  }

  async function reorder(it: LoveStory, dir: -1 | 1) {
    const idx = items.findIndex((i) => i.id === it.id);
    const target = items[idx + dir];
    if (!target) return;
    await Promise.all([
      api(`/api/love-story/${it.id}`, {
        method: "PUT",
        body: JSON.stringify({ order: target.order }),
      }),
      api(`/api/love-story/${target.id}`, {
        method: "PUT",
        body: JSON.stringify({ order: it.order }),
      }),
    ]);
    refresh();
  }

  return (
    <DashboardShell>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2}>
              Love Story
            </Title>
            <Text c="dimmed">Perjalanan cinta yang akan ditampilkan di section Love Story</Text>
          </div>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
            Tambah Cerita
          </Button>
        </Group>

        {loading ? (
          <Center h={240}>
            <Loader />
          </Center>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Text c="dimmed">
              Belum ada cerita. Tambahkan minimal 1 milestone.
            </Text>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {items.map((it, idx) => (
              <Card key={it.id} withBorder p="md" radius="md">
                {it.image_url && (
                  <Card.Section>
                    <div style={{ position: "relative", width: "100%", height: 160 }}>
                      <Image src={it.image_url} alt={it.title} fill style={{ objectFit: "cover" }} />
                    </div>
                  </Card.Section>
                )}
                <Stack gap={4} mt="sm">
                  <Text size="xs" c="gray.6" fw={600} tt="uppercase">
                    {it.date}
                  </Text>
                  <Text fw={600}>{it.title}</Text>
                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {it.description}
                  </Text>
                  <Group justify="space-between" mt="sm">
                    <Group gap={4}>
                      <Tooltip label="Naik">
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          disabled={idx === 0}
                          onClick={() => reorder(it, -1)}
                        >
                          <IconArrowUp size={14} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Turun">
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          disabled={idx === items.length - 1}
                          onClick={() => reorder(it, 1)}
                        >
                          <IconArrowDown size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                    <Group gap={4}>
                      <ActionIcon size="sm" variant="subtle" onClick={() => openEdit(it)}>
                        <IconEdit size={14} />
                      </ActionIcon>
                      <ActionIcon size="sm" color="red" variant="subtle" onClick={() => remove(it)}>
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <Modal opened={opened} onClose={close} title={editing ? "Edit Cerita" : "Tambah Cerita"} centered size="md">
        <Stack>
          <TextInput
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.currentTarget.value })}
          />
          <TextInput
            label="Tanggal"
            placeholder="14 Februari 2022"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.currentTarget.value })}
          />
          <Textarea
            label="Deskripsi"
            autosize
            minRows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.currentTarget.value })}
          />
          <ImageUpload
            label="Foto (opsional)"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
            folder="love-story"
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              Batal
            </Button>
            <Button onClick={save} loading={saving}>
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </DashboardShell>
  );
}
