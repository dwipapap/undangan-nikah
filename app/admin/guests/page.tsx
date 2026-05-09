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
  FileInput,
  ScrollArea
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
  IconUpload,
  IconBrandWhatsapp,
  IconDownload
} from "@tabler/icons-react";
import { DashboardShell } from "@/components/admin/DashboardShell";
import { api } from "@/lib/api-client";
import type { Guest } from "@/lib/types";
import { read, utils } from "xlsx";

const generateWaMessage = (guestName: string, link: string) => {
  return `Kepada Yth.
Bapak/Ibu/Saudara/i
${guestName}
_______

Assalamualaikum Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

Berikut link undangan kami, untuk info lengkap dari acara, bisa kunjungi :

${link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Wassalamualaikum Warahmatullahi Wabarakatuh

Terima Kasih

Hormat kami,
Madhan dan Selvi
________`;
};

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [opened, { open, close }] = useDisclosure(false);
  const [importOpened, { open: openImport, close: closeImport }] = useDisclosure(false);
  
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [parsedNames, setParsedNames] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);

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

  const handleFileChange = async (payload: File | null) => {
    setFile(payload);
    setParsedNames([]);
    if (!payload) return;
    
    // check file size (max 5MB)
    if (payload.size > 5 * 1024 * 1024) {
      notifications.show({ message: "Ukuran file terlalu besar. Maksimal 5MB", color: "red" });
      setFile(null);
      return;
    }

    try {
      const buffer = await payload.arrayBuffer();
      const wb = read(buffer, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json<{ guest_name: string }>(ws);
      
      const names = data
        .map(row => row.guest_name || (row as any)["Nama"] || (row as any)["nama"] || Object.values(row)[0])
        .filter(n => typeof n === "string" && n.trim().length > 0)
        .map(n => n.trim());

      // remove duplicates
      const uniqueNames = Array.from(new Set(names));

      if (uniqueNames.length === 0) {
        notifications.show({ message: "❌ Tidak ditemukan data nama tamu pada file", color: "red" });
        setFile(null);
        return;
      }

      setParsedNames(uniqueNames);
    } catch (error) {
      notifications.show({ message: "❌ Format file tidak valid", color: "red" });
      setFile(null);
    }
  };

  const processImport = async () => {
    if (parsedNames.length === 0) return;
    setImporting(true);
    try {
      await api("/api/guests", { method: "POST", body: JSON.stringify({ names: parsedNames }) });
      notifications.show({ message: `✅ ${parsedNames.length} tamu berhasil diimpor`, color: "green" });
      closeImport();
      setFile(null);
      setParsedNames([]);
      refresh();
    } catch (e) {
      notifications.show({ message: "❌ Gagal mengimpor tamu: " + (e as Error).message, color: "red" });
    } finally {
      setImporting(false);
    }
  };

  const exportCSV = () => {
    if (guests.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "guest_name,invitation_link\n";
    
    guests.forEach(g => {
      const link = `${origin}/${g.slug}`;
      const safeName = g.name.replace(/"/g, '""');
      csvContent += `"${safeName}","${link}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guests_links.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <Group justify="space-between" align="center">
          <Title order={2} className="!font-serif">
            Manajemen Tamu
          </Title>
          <Group gap="sm">
            <Button variant="light" leftSection={<IconUpload size={16} />} onClick={openImport}>
              Import Excel
            </Button>
            <Button variant="light" color="green" leftSection={<IconDownload size={16} />} onClick={exportCSV}>
              Export Links
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={open}>
              Tambah Tamu
            </Button>
          </Group>
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
              Belum ada tamu. Klik "Tambah Tamu" atau "Import Excel" untuk mulai.
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
                    <Table.Th>Link Undangan</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filtered.map((g) => {
                    const link = `${origin}/${g.slug}`;
                    const waMessage = generateWaMessage(g.name, link);
                    const waLink = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

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
                                <Tooltip label={copied ? "Link Tersalin!" : "Copy Link"}>
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
                            
                            <CopyButton value={waMessage}>
                              {({ copied, copy }) => (
                                <Tooltip label={copied ? "Pesan Tersalin!" : "Copy Pesan WA"}>
                                  <ActionIcon
                                    variant="light"
                                    color={copied ? "teal" : "gray"}
                                    onClick={copy}
                                  >
                                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </CopyButton>

                            <Tooltip label="Share via WhatsApp">
                              <ActionIcon
                                component="a"
                                href={waLink}
                                target="_blank"
                                variant="light"
                                color="green"
                              >
                                <IconBrandWhatsapp size={14} />
                              </ActionIcon>
                            </Tooltip>
                            
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

      <Modal opened={importOpened} onClose={() => { closeImport(); setFile(null); setParsedNames([]); }} title="Import Data Tamu" centered size="lg">
        <Stack>
          <Text size="sm" c="dimmed">
            Upload file Excel (.xlsx atau .xls). Sistem akan membaca kolom pertama atau kolom dengan header "guest_name" / "Nama" pada sheet pertama. Maksimal 5MB.
          </Text>

          <FileInput
            label="Pilih File Excel"
            placeholder="Upload file"
            accept=".xlsx, .xls"
            value={file}
            onChange={handleFileChange}
            clearable
          />

          {parsedNames.length > 0 && (
            <Stack gap="xs" mt="sm">
              <Text fw={500} size="sm">
                Preview: {parsedNames.length} nama ditemukan (duplikat diabaikan)
              </Text>
              <ScrollArea h={150} type="auto" offsetScrollbars>
                <Stack gap={4}>
                  {parsedNames.map((n, i) => (
                    <Text key={i} size="sm" c="dimmed">
                      {i + 1}. {n}
                    </Text>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => { closeImport(); setFile(null); setParsedNames([]); }}>
              Batal
            </Button>
            <Button 
              onClick={processImport} 
              loading={importing}
              disabled={parsedNames.length === 0}
            >
              Proses Import
            </Button>
          </Group>
        </Stack>
      </Modal>

    </DashboardShell>
  );
}
