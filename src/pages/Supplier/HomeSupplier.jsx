import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../../utils/ProtectedRoute";
import axios from "axios";
import Button from "../../components/Button";
import { io } from "socket.io-client";

function HomeSupplier() {
  const [orders, setOrders] = useState([]); // ✅ Default to an empty array
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const socket = io("http://localhost:5000"); 


  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Session expired! Please log in again.");
      navigate("/");
    } else {
      setUser(getUser());
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/supplier-orders");
        setOrders(response.data.orders || []); // ✅ Ensure orders is always an array
        console.log(response.data.orders);
      } catch (error) {
        setOrders(null); // ✅ Set to an empty array instead of null
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
    socket.on("new_supplier_order", (newOrder) => {
      // setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order to the list
      fetchOrders();
    });

  return () => {
      socket.off("new_supplier_order");
  };
  }, [user, change]);

  const updateStatus = async (order) => {
    try {
      const res = await axios.put(`http://localhost:5000/supplier-updates/${order._id}`, {
        order_status: order.order_status,
      });
      alert(res.data.message);
      // setOrders((prevOrders) =>
      //   prevOrders.map((o) => o._id === order._id ? { ...o, order_status: res.data.order.order_status } : o)
      // );

      setChange((pre) => !pre);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  
  
  
  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
      <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200">
        Logout
      </button>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order Type</th>
              <th className="border p-2">Table No.</th>
              <th className="border p-2">Food Items</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{order.order_type}</td>
                  <td className="p-2 border">{order.table_number ?? "N/A"}</td>
                  <td className="border p-2">
                    {order.items?.map((item) => `${item.food_id?.foodname} (x${item.quantity})`).join(", ")}
                  </td>
                  <td className={`border p-2 text-white font-semibold rounded ${order.order_status === "Cooked" ? "bg-yellow-500" : "bg-green-500"}`}>
                    {order.order_status} <Button text="Change" onClick={() => updateStatus(order)} />
                  </td>
                  <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="4" className="text-gray-600 p-2">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeSupplier;
