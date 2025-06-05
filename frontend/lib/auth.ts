// lib/auth.ts
export async function loginUser(cnic: string, password: string) {
  const res = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: cnic, password }), // Django uses "username"
  });

  if (!res.ok) {
    throw new Error("Invalid CNIC or password");
  }

  return res.json(); // { token: "..." }
}

// frontend/lib/auth.ts
export async function refreshToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;          // user not logged in

  const res = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (res.ok) {
    const data = await res.json();            // { access: "…" }
    localStorage.setItem("access_token", data.access);
    return data.access;                       // hand back new token
  }

  // refresh failed → log the user out
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";            // or router.push(...)
  return null;
}

