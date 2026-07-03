const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    console.log("LOGIN RESPONSE:", res.data);

    const token = res.data.token || res.data.data?.token;

    if (!token) {
      alert("Login failed: No token received");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(res.data.user || {}));

    navigate("/dashboard");

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Login failed");
  }
};