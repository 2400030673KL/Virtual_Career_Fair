const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";
const ROLE_KEY = "userType";

function isAuthPath(path) {
  return /^\/auth\/(login|signin|register|signup|admin-login)$/.test(path);
}

function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthUser() {
  const value = localStorage.getItem(USER_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function persistAuthSession(response, fallbackRole) {
  if (!response?.token || !response?.user) {
    throw new Error("Authentication response is missing token or user data");
  }

  localStorage.setItem(TOKEN_KEY, response.token);
  localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  localStorage.setItem(ROLE_KEY, response.user.role || fallbackRole || "student");
}

function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token && !headers.Authorization && !isAuthPath(path)) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof payload === "string" ? payload : payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload;
}

async function restoreSessionFromToken() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  try {
    const response = await request("/auth/me");
    persistAuthSession(response, response?.user?.role);
    return response.user;
  } catch {
    clearAuthSession();
    return null;
  }
}

export const api = {
  request,
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  remove: (path) => request(path, { method: "DELETE" }),
  getAuthToken,
  getAuthUser,
  persistAuthSession,
  clearAuthSession,
  restoreSessionFromToken,
};

export { API_BASE_URL };