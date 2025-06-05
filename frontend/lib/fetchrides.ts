import { apiFetch } from "@/lib/apis";

export async function fetchRides() {
  try {
    const response = await apiFetch("/api/rides/");
    if (!response.ok) {
      throw new Error(`Failed to fetch rides: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw error;
  }
}


