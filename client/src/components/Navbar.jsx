import { useState } from "react";
import { Bell, UserCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New product added successfully",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      message: "Low stock alert: Keyboard",
      time: "15 mins ago",
      read: false,
    },
    {
      id: 3,
      message: "Inventory updated",
      time: "1 hour ago",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      read: true,
    }));
    setNotifications(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-[#111827] border-b border-gray-700 px-6 py-4 flex justify-between items-center relative">

      {/* LEFT TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-gray-300 text-sm">
          Welcome back 👋, manage your inventory
        </p>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-[#1f2937] px-3 py-2 rounded-lg w-1/3 border border-gray-700">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none px-2 w-full text-white placeholder-gray-400"
        />
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-4 relative">

        {/* NOTIFICATIONS */}
        <div className="relative">

          <div className="p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            onClick={() => setOpenNotify(!openNotify)}
          >
            <Bell className="text-gray-300 hover:text-white" />
          </div>

          {/* RED DOT */}
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}

          {/* DROPDOWN */}
          {openNotify && (
            <div className="absolute right-0 mt-3 w-80 bg-[#1f2937] border border-gray-700 rounded-xl shadow-xl z-50">

              <div className="p-3 border-b border-gray-700 text-white font-semibold">
                Notifications
              </div>

              <div className="max-h-60 overflow-y-auto">

                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-gray-800 hover:bg-gray-800 ${
                      n.read ? "opacity-50" : ""
                    }`}
                  >
                    <p className="text-sm text-white">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {n.time}
                    </p>
                  </div>
                ))}

              </div>

              <div
                onClick={markAllAsRead}
                className="p-2 text-center text-sm text-indigo-400 cursor-pointer hover:bg-gray-800"
              >
                Mark all as read
              </div>

            </div>
          )}

        </div>

        {/* USER */}
        <div className="relative">

          <div
            className="p-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <UserCircle className="text-gray-300 hover:text-white" />
          </div>

          {/* DROPDOWN */}
          {openMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-[#1f2937] border border-gray-700 rounded-xl shadow-xl z-50">

              <button
                onClick={() => {
                  setOpenMenu(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 text-sm"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 text-sm"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 text-sm"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Navbar;