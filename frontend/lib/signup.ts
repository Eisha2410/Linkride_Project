// frontend/lib/signup.ts
import { apiFetch } from "@/lib/apis";

export async function registerUser(userData: {
  cnic: string;
  password: string;
  // Include other necessary fields
}) {
  try {
    const response = await apiFetch("/api/signup/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Signup failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

