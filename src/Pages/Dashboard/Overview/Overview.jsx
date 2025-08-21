// OverviewPage.jsx
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const OverviewPage = () => {
  // Fake summary data
  const stats = {
    totalUsers: 120,
    totalVendors: 15,
    totalProducts: 350,
    totalOrders: 80,
    totalRevenue: 5400,
  };

  // Fake chart data
  const ordersData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [5, 10, 8, 12, 7, 15, 9],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue (৳)",
        data: [500, 800, 400, 1200, 700, 900, 600],
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const topProductsData = {
    labels: ["Apple", "Tomato", "Spinach", "Carrot", "Potato"],
    datasets: [
      {
        label: "Top Selling Products",
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Fake recent activities
  const recentOrders = [
    { id: 1, product: "Apple", user: "Shihab", amount: 180, date: "2025-07-30" },
    { id: 2, product: "Spinach", user: "Shihab", amount: 10, date: "2025-07-21" },
    { id: 3, product: "Tomato", user: "Shihab", amount: 40, date: "2025-07-21" },
  ];

  const recentProducts = [
    { id: 1, name: "Apple", market: "Karwan Bazar", price: 180 },
    { id: 2, name: "Spinach", market: "Shantinagar Bazar", price: 10 },
    { id: 3, name: "Tomato", market: "New Market", price: 40 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-2">Dashboard Overview</h1>
      <p className="text-gray-600 mb-6">Welcome back! Here is your summary.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Vendors</h2>
          <p className="text-2xl">{stats.totalVendors}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">৳{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Orders Over Time</h3>
          <Line data={ordersData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue Over Time</h3>
          <Bar data={revenueData} />
        </div>
        <div>
             <h3 className="text-lg font-semibold mb-2">Top Selling Products</h3>
              <div className="bg-white p-4 rounded shadow md:col-span-2 lg:W-100 lg:h-100 xl:w-120 xl:h-120">
       
          <Pie className="" data={topProductsData} />
        </div>
        </div>
       
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">User</th>
                <th className="border-b p-2">Amount</th>
                <th className="border-b p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b p-2">{order.product}</td>
                  <td className="border-b p-2">{order.user}</td>
                  <td className="border-b p-2">৳{order.amount}</td>
                  <td className="border-b p-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Products Added</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Market</th>
                <th className="border-b p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((prod) => (
                <tr key={prod.id}>
                  <td className="border-b p-2">{prod.name}</td>
                  <td className="border-b p-2">{prod.market}</td>
                  <td className="border-b p-2">৳{prod.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
