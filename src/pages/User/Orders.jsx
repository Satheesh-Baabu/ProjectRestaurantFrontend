import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
                const response = await axios.get(`http://localhost:5000/orders/${user.id}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [user]);

    const groupOrdersByDate = (orders) => {
        return orders.reduce((acc, order) => {
            const date = new Date(order.created_at).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(order);
            return acc;
        }, {});
    };
    
    const getTodayDateString = () => {
        return new Date().toLocaleDateString();
    };
    
    const groupedOrders = groupOrdersByDate(orders);
    const todayDate = getTodayDateString();
    
    // Sort the dates so that today's orders appear first
    const sortedDates = Object.keys(groupedOrders).sort((a, b) => {
        return a === todayDate ? -1 : b === todayDate ? 1 : new Date(b) - new Date(a);
    });
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>
            {sortedDates.length > 0 ? (
                sortedDates.map((date, index) => (
                    <div key={date} className={`mb-8 ${date === todayDate ? "border border-blue-500 p-4 rounded-lg bg-blue-50 shadow-md" : ""}`}>
                        <h3 className={`text-lg font-semibold mb-2 border-b pb-2 ${date === todayDate ? "text-blue-700" : "text-gray-700"}`}>
                            {date === todayDate ? "Today's Orders" : date}
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {groupedOrders[date].map((order) => (
                                <div key={order._id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                    <h3 className="font-semibold text-orange-600">Order ID: {order._id}</h3>
                                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                                    <p className="mt-2 text-gray-700"><strong>Mode:</strong> {order.order_type}</p>
                                    {order.order_type === "Dine-in" && (
                                        <p className="text-gray-700"><strong>Table:</strong> #{order.table_number}</p>
                                    )}
                                    <p className="mt-2 font-semibold">Items:</p>
                                    <ul className="ml-4 text-gray-700">
                                        {order.items.map((item) => (
                                            <li key={item._id} className="flex justify-between">
                                                <span>{item.food_id.foodname} ({item.quantity})</span>
                                                <span>₹{item.food_id.price * item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 font-semibold text-gray-700">Total: ₹{order.total_amount}</p>
                                    <p className="text-gray-700"><strong>Payment:</strong> {order.payment_method} ({order.payment_status})</p>
                                    <p className={`mt-2 font-semibold ${order.order_status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                                        Status: {order.order_status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No orders found.</p>
            )}
        </div>
    );
    
}

export default Orders;

