// frontend/lib/apis.ts
import { refreshToken } from "@/lib/token";

export async function apiFetch(
  url: string,
  options: RequestInit = {},
  retry = true
) {
  let token = localStorage.getItem("accessToken");

  const fetchWithToken = async (authToken: string | null) => {
    return fetch(`http://localhost:8000${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: authToken ? `Bearer ${authToken}` : "",
        "Content-Type": "application/json",
      },
    });
  };

  let response = await fetchWithToken(token);

  if (response.status === 401 && retry) {
    const newToken = await refreshToken();
    if (newToken) {
      return apiFetch(url, options, false);
    }
  }

  return response;
}


