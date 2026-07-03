import { useState } from "react";
import { Eye, EyeOff, Package2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      organization,
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !organization ||
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        organization,
        name,
        email,
        password,
      });

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
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
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >

          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="text-center">

              <div className="inline-flex bg-white p-4 rounded-full shadow-lg">

                <Package2
                  className="text-indigo-700"
                  size={40}
                />

              </div>

              <h1 className="text-4xl font-bold text-white mt-5">
                Create Account
              </h1>

              <p className="text-white/70 mt-2">
                Start managing inventory smarter
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >

              <input
                type="text"
                name="organization"
                placeholder="Organization Name"
                value={formData.organization}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder:text-white/60 outline-none"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder:text-white/60 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder:text-white/60 outline-none"
              />

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 pr-12 text-white placeholder:text-white/60 outline-none"
                />

                <button
                  type="button"
                  className="absolute right-4 top-4 text-white"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>

              </div>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder:text-white/60 outline-none"
              />

              <button
                disabled={loading}
                className="w-full rounded-xl bg-white py-3 text-indigo-700 font-bold transition hover:scale-105 disabled:opacity-70"
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}
              </button>

            </form>

            <div className="text-center mt-6 text-white">

              Already have an account?

              <Link
                to="/"
                className="ml-2 underline font-bold"
              >
                Login
              </Link>

            </div>

          </div>

        </motion.div>

      </div>
    </>
  );
}

export default Register;