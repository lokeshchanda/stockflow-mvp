import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Package,
  DollarSign,
  AlertTriangle,
  Boxes,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Products",
      value: 128,
      icon: <Package size={22} />,
      color: "bg-blue-500",
    },
    {
      title: "Inventory Value",
      value: "₹4.85L",
      icon: <DollarSign size={22} />,
      color: "bg-green-500",
    },
    {
      title: "Low Stock Items",
      value: 12,
      icon: <AlertTriangle size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Total Quantity",
      value: 2842,
      icon: <Boxes size={22} />,
      color: "bg-purple-500",
    },
  ];

  const products = [
    { name: "Laptop", stock: 10, status: "In Stock" },
    { name: "Keyboard", stock: 4, status: "Low Stock" },
    { name: "Mouse", stock: 20, status: "In Stock" },
    { name: "Monitor", stock: 7, status: "Low Stock" },
  ];

  return (
    <div className="flex h-screen bg-[#0B1220] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <Navbar />

        {/* CONTENT WRAPPER */}
        <div className="p-6 space-y-6 overflow-auto">

          {/* HEADER SECTION */}
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Overview of your inventory system
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:scale-[1.02] transition"
              >
                <div className="flex justify-between items-center">

                  <div className="text-gray-300 text-sm">
                    {item.title}
                  </div>

                  <div
                    className={`p-2 rounded-lg ${item.color}`}
                  >
                    {item.icon}
                  </div>

                </div>

                <div className="text-3xl font-bold mt-4">
                  {item.value}
                </div>
              </div>
            ))}

          </div>

          {/* LOWER SECTION */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* TABLE */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

              <h2 className="text-lg font-semibold mb-4">
                Recent Products
              </h2>

              <table className="w-full text-sm">

                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="text-left py-2">Product</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800"
                    >
                      <td className="py-3">{p.name}</td>
                      <td className="text-center">{p.stock}</td>
                      <td
                        className={
                          p.status === "Low Stock"
                            ? "text-red-400 text-center"
                            : "text-green-400 text-center"
                        }
                      >
                        {p.status}
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* SUMMARY CARD */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

              <h2 className="text-lg font-semibold mb-4">
                Inventory Breakdown
              </h2>

              <div className="space-y-4 text-gray-300">

                <div className="flex justify-between">
                  <span>Electronics</span>
                  <span>58%</span>
                </div>

                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="w-[58%] bg-blue-500 h-2 rounded-full"></div>
                </div>

                <div className="flex justify-between">
                  <span>Accessories</span>
                  <span>28%</span>
                </div>

                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="w-[28%] bg-green-500 h-2 rounded-full"></div>
                </div>

                <div className="flex justify-between">
                  <span>Office Supplies</span>
                  <span>14%</span>
                </div>

                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <div className="w-[14%] bg-purple-500 h-2 rounded-full"></div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;