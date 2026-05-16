import { AdminProviders } from "../providers";

export const metadata = { title: "Admin Dashboard — Wedding Invitation" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <div className="mantine-app-container min-h-screen admin-surface">{children}</div>
    </AdminProviders>
  );
}
