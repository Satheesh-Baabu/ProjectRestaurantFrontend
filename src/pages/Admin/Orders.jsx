import { useEffect, useState } from "react";
import socket from "../../utils/socket"; // ✅ Use shared socket
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin-orders`); // Replace with actual API
        const data = await response.json();
        setOrders(data.orders);
        filterOrders(data.orders, paymentFilter, selectedDate);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    const handleNewOrder = () => {
      fetchOrders();
    };
    socket.on("new_order", handleNewOrder);
    socket.on("new_supplier_order", handleNewOrder);
    socket.on("new_supplier_updates",handleNewOrder)
    return () => {
        socket.off("new_order", handleNewOrder);
        socket.off("new_supplier_order", handleNewOrder);
          socket.off("new_supplier_order",handleNewOrder)
        
    };
  }, []);

  useEffect(() => {
    filterOrders(orders, paymentFilter, selectedDate);
  }, [paymentFilter, selectedDate, orders]);

  const filterOrders = (orders, paymentStatus, date) => {
    const today = new Date(date).toISOString().split("T")[0];

    let filtered = orders.filter((order) => order.created_at.split("T")[0] === today);

    // Sort by Dine-in first, then Takeaway
    filtered.sort((a, b) => {
      if (a.order_status === "Served") return 1; // Move Finished orders to bottom
      if (b.order_status === "Served") return -1;
      if (a.order_type === "Dine-in" && b.order_type === "Takeaway") return -1;
      if (a.order_type === "Takeaway" && b.order_type === "Dine-in") return 1;
      return 0;
    });

    // Filter by payment status
    if (paymentStatus !== "All") {
      filtered = filtered.filter((order) => order.payment_status === paymentStatus);
    }

    setFilteredOrders(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Order Dashboard</h2>

      {/* Search & Filter Section */}
      <div className="flex gap-4 mb-4">
        {/* Payment Status Filter */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setPaymentFilter(e.target.value)}
          value={paymentFilter}
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Unpaid</option>
        </select>

        {/* Date Picker */}
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Table No.</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Payment Status</th>
              <th className="p-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border">
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">{order.user_id}</td>
                  <td className="p-2 border">{order.order_type}</td>
                  <td className="p-2 border">{order.table_number ?? "N/A"}</td>
                  <td className="p-2 border">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.food_id ? item.food_id.foodname : "Unknown Item"} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">₹{order.total_amount}</td>
                  <td
                    className={`p-2 border ${
                      order.payment_status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.payment_status}
                  </td>
                  <td className="p-2 border">{order.order_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No orders found for selected date & filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
