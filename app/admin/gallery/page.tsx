import { Title, Text, Stack } from "@mantine/core";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { OrderedImageManager } from "@/components/admin/OrderedImageManager";

export default function GalleryPage() {
  return (
    <DashboardShell>
      <Stack gap="lg">
        <div>
          <Title order={2} className="!font-serif">
            Gallery
          </Title>
          <Text c="dimmed">Foto-foto pre-wedding & dokumentasi</Text>
        </div>
        <OrderedImageManager
          endpoint="/api/gallery"
          folder="gallery"
          emptyMessage="Belum ada foto gallery. Upload sekarang."
        />
      </Stack>
    </DashboardShell>
  );
}
