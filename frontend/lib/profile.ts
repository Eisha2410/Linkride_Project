import { apiFetch } from "@/lib/apis";

export async function getProfile() {
  const res = await apiFetch("/api/profile/");
  return res.json();
}
