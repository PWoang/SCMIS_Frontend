export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  // Nếu có token -> gắn vào header
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Nếu BE trả 401 -> token hết hạn
  if (response.status === 401) {
    alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  return response;
}