"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button, Group, Stack, Text, FileButton, Modal, Slider, Box, Select } from "@mantine/core";
import { IconUpload, IconTrash, IconCrop } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Cropper from "react-easy-crop";
import { uploadFile } from "@/lib/api-client";
import getCroppedImg from "@/lib/cropImage";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  folder?: string;
  height?: number;
  accept?: string;
  aspectRatio?: number;
}

export function ImageUpload({
  value,
  onChange,
  label,
  folder = "misc",
  height = 160,
  accept = "image/*",
  aspectRatio = 1, // Default aspect ratio to 1:1, can be overridden
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [cropModalOpened, setCropModalOpened] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  
  // Aspect ratio state
  const [selectedAspect, setSelectedAspect] = useState<string>(aspectRatio ? aspectRatio.toString() : "1");

  // Cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  function handleFileSelect(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSelectedFileUrl(url);
    setCropModalOpened(true);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleCropAndUpload() {
    if (!selectedFileUrl || !croppedAreaPixels) return;

    setUploading(true);
    try {
      const croppedFile = await getCroppedImg(selectedFileUrl, croppedAreaPixels);
      if (!croppedFile) throw new Error("Gagal memproses gambar");

      const { url } = await uploadFile(croppedFile, folder);
      onChange(url);
      notifications.show({ message: "Upload berhasil", color: "green" });
      
      setCropModalOpened(false);
      URL.revokeObjectURL(selectedFileUrl);
      setSelectedFileUrl(null);
    } catch (e) {
      notifications.show({ message: (e as Error).message, color: "red" });
    } finally {
      setUploading(false);
    }
  }

  function handleCancelCrop() {
    setCropModalOpened(false);
    if (selectedFileUrl) {
      URL.revokeObjectURL(selectedFileUrl);
      setSelectedFileUrl(null);
    }
  }

  return (
    <>
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
          <FileButton onChange={handleFileSelect} accept={accept}>
            {(props) => (
              <Button
                {...props}
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

      <Modal
        opened={cropModalOpened}
        onClose={handleCancelCrop}
        title="Sesuaikan Gambar"
        size="lg"
        centered
        closeOnClickOutside={!uploading}
        closeOnEscape={!uploading}
        withCloseButton={!uploading}
      >
        <Stack gap="md">
          <Select
            label="Rasio Aspek (Aspect Ratio)"
            value={selectedAspect}
            onChange={(val) => setSelectedAspect(val || "1")}
            data={[
              { label: "1:1 (Square)", value: "1" },
              { label: "9:16 (Mobile Portrait)", value: (9 / 16).toString() },
              { label: "9:18 (Mobile Tall)", value: (9 / 18).toString() },
              { label: "9:19.5 (Mobile X-Tall)", value: (9 / 19.5).toString() },
              { label: "9:20 (Mobile XX-Tall)", value: (9 / 20).toString() },
              { label: "16:9 (Landscape)", value: (16 / 9).toString() },
              { label: "4:3 (Landscape)", value: (4 / 3).toString() },
              { label: "3:4 (Portrait)", value: (3 / 4).toString() },
              { label: "Bebas (Free Crop)", value: "0" },
            ]}
            disabled={uploading}
          />
          <Box pos="relative" w="100%" h={400} bg="dark.7" style={{ borderRadius: 8, overflow: 'hidden' }}>
            {selectedFileUrl && (
              <Cropper
                image={selectedFileUrl}
                crop={crop}
                zoom={zoom}
                aspect={selectedAspect === "0" ? undefined : parseFloat(selectedAspect)}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </Box>
          <Stack gap={4}>
            <Text size="sm" fw={500}>Zoom</Text>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={setZoom}
              disabled={uploading}
            />
          </Stack>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleCancelCrop} disabled={uploading}>
              Batal
            </Button>
            <Button 
              onClick={handleCropAndUpload} 
              loading={uploading}
              leftSection={<IconCrop size={16} />}
            >
              Crop & Upload
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
