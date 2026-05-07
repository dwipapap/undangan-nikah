"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Group, Stack, Text, FileButton } from "@mantine/core";
import { IconUpload, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { uploadFile } from "@/lib/api-client";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  folder?: string;
  height?: number;
  accept?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  folder = "misc",
  height = 160,
  accept = "image/*",
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFile(file, folder);
      onChange(url);
      notifications.show({ message: "Upload berhasil", color: "green" });
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <Stack gap="xs">
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      {value ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height,
            borderRadius: 8,
            overflow: "hidden",
            background: "#f1f1f1",
          }}
        >
          <Image src={value} alt="upload" fill style={{ objectFit: "cover" }} />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height,
            borderRadius: 8,
            background: "#fafafa",
            border: "1px dashed #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
            fontSize: 13,
          }}
        >
          Belum ada gambar
        </div>
      )}
      <Group>
        <FileButton onChange={handleFile} accept={accept}>
          {(props) => (
            <Button
              {...props}
              loading={uploading}
              leftSection={<IconUpload size={14} />}
              variant="light"
              size="xs"
            >
              {value ? "Ganti" : "Upload"}
            </Button>
          )}
        </FileButton>
        {value && (
          <Button
            color="red"
            variant="subtle"
            size="xs"
            leftSection={<IconTrash size={14} />}
            onClick={() => onChange(null)}
          >
            Hapus
          </Button>
        )}
      </Group>
    </Stack>
  );
}
