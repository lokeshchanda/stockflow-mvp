import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Products", path: "/products", icon: <Package /> },
    { name: "Settings", path: "/settings", icon: <Settings /> },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        StockFlow
      </div>

      <div className="flex-1 mt-6">

        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 ${
              location.pathname === item.path ? "bg-indigo-600" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

      </div>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 p-4 flex justify-center gap-2"
      >
        <LogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;