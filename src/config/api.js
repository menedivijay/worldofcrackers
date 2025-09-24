
// api.js
const BASE_URL = "https://cracker-backend-0iz6.onrender.com";

function normalizeUser(data) {
  if (!data) return null;
  return {
    ...data,
    username: data.username || data.userName || data.name || "",
    fullName: data.fullName || data.name || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || data.phone || "",
  };
}

export const signup = async (fullname, username, email, phone, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullname,
        userName: username,
        email: email,
        phoneNumber: Number(phone),
        password: password,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, message: data.message || "Signup failed" };
    }

    const token = data?.token;
    const user = normalizeUser(data?.data);
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("authUser", JSON.stringify(user));

    return { success: true, token, user };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    const token = data?.token;
    const user = normalizeUser(data?.data);
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("authUser", JSON.stringify(user));

    return { success: true, token, user };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};

