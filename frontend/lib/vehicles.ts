import { apiFetch } from "@/lib/apis";

export async function getVehicles() {
  const res = await apiFetch("/api/vehicles/");
  return res.json();
}

export async function addVehicle(data: any) {
  const res = await apiFetch("/api/vehicles/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}
