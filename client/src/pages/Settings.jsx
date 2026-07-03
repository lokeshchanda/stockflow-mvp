import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Settings() {
  const [form, setForm] = useState({
    company: "",
    email: "",
    password: "",
    timezone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Saved:", form);
  };

  return (
    <div className="min-h-screen flex bg-[#0b1220] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-400">
              Manage your account and system preferences
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 max-w-2xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Company */}
              <div>
                <label className="text-gray-400 text-sm">
                  Company Name
                </label>

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full mt-2 p-3 bg-[#0b1220] border border-gray-700 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm">
                  Email
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-2 p-3 bg-[#0b1220] border border-gray-700 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-400 text-sm">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full mt-2 p-3 bg-[#0b1220] border border-gray-700 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="text-gray-400 text-sm">
                  Timezone
                </label>

                <input
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                  placeholder="e.g. IST (India)"
                  className="w-full mt-2 p-3 bg-[#0b1220] border border-gray-700 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
              >
                Save Settings
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;