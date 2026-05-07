"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  Stack,
  Group,
  Title,
  Button,
  Text,
  ActionIcon,
  Modal,
  TextInput,
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
  IconArrowUp,
  IconArrowDown,
  IconEdit,
} from "@tabler/icons-react";
import { ImageUpload } from "./ImageUpload";
import { api } from "@/lib/api-client";

interface Item {
  id: string;
  image_url: string;
  caption: string | null;
  order: number;
}

interface Props {
  endpoint: string; // e.g. "/api/photos" or "/api/gallery"
  folder: string;
  emptyMessage: string;
}

export function OrderedImageManager({ endpoint, folder, emptyMessage }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  async function refresh() {
    setLoading(true);
    try {
      const data = await api<Item[]>(endpoint);
      setItems(data);
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setImgUrl(null);
    setCaption("");
    open();
  }
  function openEdit(it: Item) {
    setEditing(it);
    setImgUrl(it.image_url);
    setCaption(it.caption ?? "");
    open();
  }

  async function save() {
    if (!imgUrl) {
      notifications.show({ message: "Upload gambar dulu", color: "orange" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await api(`${endpoint}/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify({ image_url: imgUrl, caption }),
        });
      } else {
        await api(endpoint, {
          method: "POST",
          body: JSON.stringify({
            image_url: imgUrl,
            caption,
            order: items.length + 1,
          }),
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

  async function remove(it: Item) {
    modals.openConfirmModal({
      title: "Hapus foto?",
      children: <Text size="sm">Foto akan dihapus permanen.</Text>,
      labels: { confirm: "Hapus", cancel: "Batal" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await api(`${endpoint}/${it.id}`, { method: "DELETE" });
          refresh();
        } catch (e) {
          notifications.show({ message: (e as Error).message, color: "red" });
        }
      },
    });
  }

  async function reorder(it: Item, dir: -1 | 1) {
    const idx = items.findIndex((i) => i.id === it.id);
    const target = items[idx + dir];
    if (!target) return;
    try {
      await Promise.all([
        api(`${endpoint}/${it.id}`, {
          method: "PUT",
          body: JSON.stringify({ order: target.order }),
        }),
        api(`${endpoint}/${target.id}`, {
          method: "PUT",
          body: JSON.stringify({ order: it.order }),
        }),
      ]);
      refresh();
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    }
  }

  return (
    <Stack gap="lg">
      <Group justify="flex-end">
        <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
          Tambah Foto
        </Button>
      </Group>

      {loading ? (
        <Center h={240}>
          <Loader />
        </Center>
      ) : items.length === 0 ? (
        <Card withBorder p="xl">
          <Text ta="center" c="dimmed">
            {emptyMessage}
          </Text>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
          {items.map((it, idx) => (
            <Card key={it.id} withBorder p="xs" radius="md">
              <Card.Section>
                <div style={{ position: "relative", width: "100%", height: 160 }}>
                  <Image src={it.image_url} alt={it.caption ?? ""} fill style={{ objectFit: "cover" }} />
                </div>
              </Card.Section>
              <Stack gap={4} mt="xs">
                <Text size="sm" lineClamp={1}>
                  {it.caption || <span style={{ color: "#aaa" }}>(tanpa caption)</span>}
                </Text>
                <Group justify="space-between" mt={4}>
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

      <Modal
        opened={opened}
        onClose={close}
        title={editing ? "Edit Foto" : "Tambah Foto"}
        centered
        size="md"
      >
        <Stack>
          <ImageUpload value={imgUrl} onChange={setImgUrl} folder={folder} height={200} />
          <TextInput
            label="Caption (opsional)"
            value={caption}
            onChange={(e) => setCaption(e.currentTarget.value)}
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
    </Stack>
  );
}
