
// api.js
const BASE_URL = "https://cracker-backend-0iz6.onrender.com";


export const signup = async (fullname,username, email, phone, password) => {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Signup error:", errorData);

      return { success: false, message: errorData.message || "Signup failed" };
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // save token for session
    return { success: true };
  } catch (error) {
    console.error("Signup failed:", error);
    return { success: false, message: "Network error" };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signin`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login error:", errorData);
      return { success: false, message: errorData.message || "Login failed" };
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // save token
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error" };
  }
};

