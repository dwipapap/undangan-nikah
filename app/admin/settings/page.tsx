"use client";

import { useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  SimpleGrid,
  Card,
  Title,
  Stack,
  Group,
  Loader,
  Center,
  Divider,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { api } from "@/lib/api-client";
import type { WeddingSettings } from "@/lib/types";

export default function SettingsPage() {
  const [data, setData] = useState<Partial<WeddingSettings> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<WeddingSettings>("/api/settings").then(setData).catch(() => setData({}));
  }, []);

  function update<K extends keyof WeddingSettings>(key: K, value: WeddingSettings[K] | null) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      const saved = await api<WeddingSettings>("/api/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setData(saved);
      notifications.show({ message: "Pengaturan tersimpan", color: "green" });
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setSaving(false);
    }
  }

  if (!data) {
    return (
      <DashboardShell>
        <Center h={400}>
          <Loader />
        </Center>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2} className="!font-serif">
            Pengaturan Umum
          </Title>
          <Button
            onClick={save}
            loading={saving}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Simpan
          </Button>
        </Group>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Hero & Tema
          </Title>
          <Stack gap="md">
            <ImageUpload
              label="Hero Image (Section 1)"
              value={data.hero_image ?? null}
              onChange={(url) => update("hero_image", url)}
              folder="hero"
              height={220}
            />
            <DateTimePicker
              label="Tanggal & Waktu Pernikahan"
              value={data.wedding_date ? new Date(data.wedding_date) : null}
              onChange={(v) =>
                update("wedding_date", v ? new Date(v as unknown as string).toISOString() : null)
              }
              valueFormat="DD MMM YYYY HH:mm"
            />
          </Stack>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Quote / Hadist
          </Title>
          <Stack gap="md">
            <Textarea
              label="Teks Quote"
              minRows={3}
              autosize
              value={data.quote_text ?? ""}
              onChange={(e) => update("quote_text", e.currentTarget.value)}
            />
            <TextInput
              label="Sumber"
              value={data.quote_source ?? ""}
              onChange={(e) => update("quote_source", e.currentTarget.value)}
            />
          </Stack>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Mempelai Pria
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ImageUpload
              label="Foto"
              value={data.groom_photo ?? null}
              onChange={(url) => update("groom_photo", url)}
              folder="groom"
            />
            <Stack gap="sm">
              <TextInput
                label="Nama"
                value={data.groom_name ?? ""}
                onChange={(e) => update("groom_name", e.currentTarget.value)}
              />
              <TextInput
                label="Anak ke- (pertama, kedua, dst)"
                value={data.groom_child_order ?? ""}
                onChange={(e) => update("groom_child_order", e.currentTarget.value)}
              />
              <TextInput
                label="Nama Ayah"
                value={data.groom_father_name ?? ""}
                onChange={(e) => update("groom_father_name", e.currentTarget.value)}
              />
              <TextInput
                label="Nama Ibu"
                value={data.groom_mother_name ?? ""}
                onChange={(e) => update("groom_mother_name", e.currentTarget.value)}
              />
              <TextInput
                label="Username Instagram"
                value={data.groom_instagram ?? ""}
                onChange={(e) => update("groom_instagram", e.currentTarget.value)}
              />
            </Stack>
          </SimpleGrid>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Mempelai Wanita
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <ImageUpload
              label="Foto"
              value={data.bride_photo ?? null}
              onChange={(url) => update("bride_photo", url)}
              folder="bride"
            />
            <Stack gap="sm">
              <TextInput
                label="Nama"
                value={data.bride_name ?? ""}
                onChange={(e) => update("bride_name", e.currentTarget.value)}
              />
              <TextInput
                label="Anak ke- (pertama, kedua, dst)"
                value={data.bride_child_order ?? ""}
                onChange={(e) => update("bride_child_order", e.currentTarget.value)}
              />
              <TextInput
                label="Nama Ayah"
                value={data.bride_father_name ?? ""}
                onChange={(e) => update("bride_father_name", e.currentTarget.value)}
              />
              <TextInput
                label="Nama Ibu"
                value={data.bride_mother_name ?? ""}
                onChange={(e) => update("bride_mother_name", e.currentTarget.value)}
              />
              <TextInput
                label="Username Instagram"
                value={data.bride_instagram ?? ""}
                onChange={(e) => update("bride_instagram", e.currentTarget.value)}
              />
            </Stack>
          </SimpleGrid>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Acara — Background
          </Title>
          <ImageUpload
            label="Background Image (Floral/Frame)"
            value={data.acara_background_image ?? null}
            onChange={(url) => update("acara_background_image", url)}
            folder="theme"
            height={200}
          />
          <Divider my="lg" />
          <Title order={4} mb="md">
            Acara — Akad Nikah
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Hari"
              placeholder="Sabtu"
              value={data.akad_day ?? ""}
              onChange={(e) => update("akad_day", e.currentTarget.value)}
            />
            <TextInput
              label="Tanggal"
              placeholder="15 Agustus 2026"
              value={data.akad_date ?? ""}
              onChange={(e) => update("akad_date", e.currentTarget.value)}
            />
            <TextInput
              label="Waktu"
              placeholder="09:00 - 11:00 WIB"
              value={data.akad_time ?? ""}
              onChange={(e) => update("akad_time", e.currentTarget.value)}
            />
            <TextInput
              label="Google Maps URL"
              value={data.akad_maps_url ?? ""}
              onChange={(e) => update("akad_maps_url", e.currentTarget.value)}
            />
            <Textarea
              label="Lokasi"
              autosize
              minRows={2}
              className="sm:col-span-2"
              value={data.akad_location ?? ""}
              onChange={(e) => update("akad_location", e.currentTarget.value)}
            />
          </SimpleGrid>
          <Divider my="lg" />
          <Title order={4} mb="md">
            Acara — Resepsi
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Hari"
              value={data.resepsi_day ?? ""}
              onChange={(e) => update("resepsi_day", e.currentTarget.value)}
            />
            <TextInput
              label="Tanggal"
              value={data.resepsi_date ?? ""}
              onChange={(e) => update("resepsi_date", e.currentTarget.value)}
            />
            <TextInput
              label="Waktu"
              value={data.resepsi_time ?? ""}
              onChange={(e) => update("resepsi_time", e.currentTarget.value)}
            />
            <TextInput
              label="Google Maps URL"
              value={data.resepsi_maps_url ?? ""}
              onChange={(e) => update("resepsi_maps_url", e.currentTarget.value)}
            />
            <Textarea
              label="Lokasi"
              autosize
              minRows={2}
              className="sm:col-span-2"
              value={data.resepsi_location ?? ""}
              onChange={(e) => update("resepsi_location", e.currentTarget.value)}
            />
          </SimpleGrid>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Wedding Gift Message
          </Title>
          <Textarea
            autosize
            minRows={3}
            value={data.gift_message ?? ""}
            onChange={(e) => update("gift_message", e.currentTarget.value)}
          />
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="md">
            Background Music
          </Title>
          <ImageUpload
            label="Upload audio (mp3/wav)"
            value={data.music_url ?? null}
            onChange={(url) => update("music_url", url)}
            folder="music"
            height={80}
            accept="audio/*"
          />
        </Card>

        <Group justify="flex-end">
          <Button
            onClick={save}
            loading={saving}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Simpan Semua
          </Button>
        </Group>
      </Stack>
    </DashboardShell>
  );
}
