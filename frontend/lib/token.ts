export const refreshToken = async (): Promise<string | null> => {
  const refresh = localStorage.getItem("refreshToken");

  if (!refresh) {
    console.error("No refresh token available.");
    return null;
  }

  try {
    const res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("accessToken", data.access);
      return data.access;
    } else {
      // Optional: redirect to login or show session expired
      console.warn("Failed to refresh token.");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
