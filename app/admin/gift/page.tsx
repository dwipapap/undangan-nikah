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
import type { GiftAccount } from "@/lib/types";

export default function GiftPage() {
  const [items, setItems] = useState<GiftAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<GiftAccount | null>(null);
  const [form, setForm] = useState({
    bank_name: "",
    account_number: "",
    account_holder: "",
    logo_url: null as string | null,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      setItems(await api<GiftAccount[]>("/api/gift"));
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ bank_name: "", account_number: "", account_holder: "", logo_url: null });
    open();
  }
  function openEdit(it: GiftAccount) {
    setEditing(it);
    setForm({
      bank_name: it.bank_name,
      account_number: it.account_number,
      account_holder: it.account_holder,
      logo_url: it.logo_url,
    });
    open();
  }

  async function save() {
    if (!form.bank_name || !form.account_number || !form.account_holder) {
      notifications.show({ message: "Bank, no rek, dan nama wajib diisi", color: "orange" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await api(`/api/gift/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await api("/api/gift", {
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

  function remove(it: GiftAccount) {
    modals.openConfirmModal({
      title: "Hapus rekening?",
      children: <Text size="sm">{it.bank_name} - {it.account_number}</Text>,
      labels: { confirm: "Hapus", cancel: "Batal" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await api(`/api/gift/${it.id}`, { method: "DELETE" });
        refresh();
      },
    });
  }

  async function reorder(it: GiftAccount, dir: -1 | 1) {
    const idx = items.findIndex((i) => i.id === it.id);
    const target = items[idx + dir];
    if (!target) return;
    await Promise.all([
      api(`/api/gift/${it.id}`, {
        method: "PUT",
        body: JSON.stringify({ order: target.order }),
      }),
      api(`/api/gift/${target.id}`, {
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
              Wedding Gift
            </Title>
            <Text c="dimmed">Rekening untuk transfer hadiah dari tamu</Text>
          </div>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
            Tambah Rekening
          </Button>
        </Group>

        {loading ? (
          <Center h={240}>
            <Loader />
          </Center>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <Text c="dimmed">
              Belum ada rekening.
            </Text>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {items.map((it, idx) => (
              <Card key={it.id} withBorder p="md" radius="md">
                <Group>
                  {it.logo_url && (
                    <div style={{ position: "relative", width: 60, height: 40 }}>
                      <Image src={it.logo_url} alt={it.bank_name} fill style={{ objectFit: "contain" }} />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <Text fw={600}>{it.bank_name}</Text>
                    <Text size="sm" c="dimmed">{it.account_holder}</Text>
                  </div>
                </Group>
                <Text mt="sm" ff="monospace" fw={600} size="lg">{it.account_number}</Text>
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
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <Modal opened={opened} onClose={close} title={editing ? "Edit Rekening" : "Tambah Rekening"} centered size="md">
        <Stack>
          <TextInput
            label="Nama Bank"
            placeholder="BCA, Mandiri, BNI, dll"
            required
            value={form.bank_name}
            onChange={(e) => setForm({ ...form, bank_name: e.currentTarget.value })}
          />
          <TextInput
            label="Nomor Rekening"
            required
            value={form.account_number}
            onChange={(e) => setForm({ ...form, account_number: e.currentTarget.value })}
          />
          <TextInput
            label="Atas Nama"
            required
            value={form.account_holder}
            onChange={(e) => setForm({ ...form, account_holder: e.currentTarget.value })}
          />
          <ImageUpload
            label="Logo Bank (opsional)"
            value={form.logo_url}
            onChange={(url) => setForm({ ...form, logo_url: url })}
            folder="bank-logos"
            height={100}
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
