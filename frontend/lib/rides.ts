import { apiFetch } from "@/lib/apis";

export async function getRides() {
  const res = await apiFetch("/api/rides/");
  return res.json();
}

export async function getRide(id: number) {
  const res = await apiFetch(`/api/rides/${id}/`);
  return res.json();
}

export async function createRide(data: any) {
  const res = await apiFetch("/api/rides/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function joinRide(id: number) {
  const res = await apiFetch(`/api/rides/${id}/join/`, {
    method: "POST",
  });
  return res.json();
}
