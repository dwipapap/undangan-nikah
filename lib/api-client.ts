import { createClient } from "@/lib/supabase/client";

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(data.error || "Request failed");
  }
  return res.json();
}

export async function uploadFile(file: File, folder = "misc"): Promise<{ url: string; path: string }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() ?? "bin";
  const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("wedding-uploads")
    .upload(filePath, file, {
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Upload failed");
  }

  const { data } = supabase.storage.from("wedding-uploads").getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
}
