import { useState } from "react";
import { Eye, EyeOff, Package2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-700 p-5">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >

          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="flex flex-col items-center">

              <div className="bg-white p-4 rounded-full shadow-lg">

                <Package2
                  size={40}
                  className="text-indigo-700"
                />

              </div>

              <h1 className="text-4xl font-bold text-white mt-5">
                StockFlow
              </h1>

              <p className="text-white/70 mt-2">
                Inventory Management System
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label className="text-white text-sm">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/60 outline-none"
                />

              </div>

              <div>

                <label className="text-white text-sm">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 pr-12 text-white placeholder:text-white/60 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-4 text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-white py-3 font-semibold text-indigo-700 transition hover:scale-105 disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Login"}
              </button>

            </form>

            <div className="mt-6 text-center text-white">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-bold underline"
              >
                Register
              </Link>

            </div>

          </div>

        </motion.div>

      </div>
    </>
  );
}

export default Login;