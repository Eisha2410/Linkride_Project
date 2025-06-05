import { apiFetch } from "@/lib/apis";

export async function checkInToRide(rideId: number) {
  const res = await apiFetch(`/api/rides/${rideId}/checkin/`, {
    method: "POST",
  });
  return res.json();
}

export async function checkOutFromRide(rideId: number) {
  const res = await apiFetch(`/api/rides/${rideId}/checkout/`, {
    method: "POST",
  });
  return res.json();
}
