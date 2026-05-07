"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Container,
} from "@mantine/core";
import { IconLock, IconAlertCircle } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@wedding.local");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email atau password salah");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory via-cream to-rose px-4">
      <Container size="xs" w="100%">
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Stack gap="lg">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
                <IconLock size={28} className="text-amber-700" />
              </div>
              <Title order={2} className="!font-serif">
                Admin Login
              </Title>
              <Text size="sm" c="dimmed">
                Masuk untuk mengelola undangan
              </Text>
            </div>

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="admin@wedding.local"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                  label="Password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Button type="submit" loading={loading} fullWidth size="md">
                  Login
                </Button>
              </Stack>
            </form>

            <Text size="xs" c="dimmed" ta="center">
              Default: admin@wedding.local / admin123
            </Text>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
