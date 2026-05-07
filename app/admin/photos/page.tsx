import { Title, Text, Stack } from "@mantine/core";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { OrderedImageManager } from "@/components/admin/OrderedImageManager";

export default function PhotosPage() {
  return (
    <DashboardShell>
      <Stack gap="lg">
        <div>
          <Title order={2} className="!font-serif">
            Foto Couple
          </Title>
          <Text c="dimmed">Foto yang muncul di section &quot;We Found Love&quot;</Text>
        </div>
        <OrderedImageManager
          endpoint="/api/photos"
          folder="couple"
          emptyMessage="Belum ada foto. Klik 'Tambah Foto' untuk upload."
        />
      </Stack>
    </DashboardShell>
  );
}
