import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Products() {
  const products = [
  { name: "MacBook Pro M2", sku: "LP001", stock: 12, price: 120000 },
  { name: "iPhone 15 Pro", sku: "PH002", stock: 5, price: 85000 },
  { name: "AirPods Pro", sku: "AP003", stock: 25, price: 22000 },
  { name: "Dell Monitor 27\"", sku: "MN004", stock: 7, price: 18000 },
  { name: "Logitech Mouse", sku: "MS005", stock: 42, price: 1500 },
  { name: "Mechanical Keyboard", sku: "KB006", stock: 3, price: 4500 },
  { name: "HP Laptop i5", sku: "LP007", stock: 9, price: 65000 },
  { name: "USB-C Hub", sku: "UB008", stock: 1, price: 2500 },
  { name: "External SSD 1TB", sku: "SS009", stock: 6, price: 9000 },
  { name: "Wireless Headphones", sku: "WH010", stock: 14, price: 6000 },
];

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
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-400">
              Manage your inventory items
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

            <table className="w-full text-sm table-fixed">

              {/* HEADER */}
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">

                  <th className="py-3 w-2/5 text-left">
                    Product Name
                  </th>

                  <th className="w-1/5 text-center">
                    SKU
                  </th>

                  <th className="w-1/5 text-center">
                    Stock
                  </th>

                  <th className="w-1/5 text-right">
                    Price
                  </th>

                </tr>
              </thead>

              {/* BODY */}
              <tbody>

                {products.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                  >

                    {/* PRODUCT */}
                    <td className="py-4 font-medium truncate">
                      {p.name}
                    </td>

                    {/* SKU */}
                    <td className="text-center text-gray-300">
                      {p.sku}
                    </td>

                    {/* STOCK */}
                    <td className="text-center">
                      <span
                        className={
                          p.stock <= 5
                            ? "text-red-400 font-semibold"
                            : "text-green-400 font-semibold"
                        }
                      >
                        {p.stock}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="text-right text-green-400 font-semibold">
                      ₹{p.price}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Products;