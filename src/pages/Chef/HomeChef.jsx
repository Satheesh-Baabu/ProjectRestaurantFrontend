import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated,getUser } from '../../utils/ProtectedRoute';
import axios from 'axios';
import Button from '../../components/Button';
import { io } from "socket.io-client";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


function HomeChef() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [change,setChange]=useState(false);

    const socket = io(API_BASE_URL); 

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
                const response = await axios.get(`${API_BASE_URL}/chef-orders`);
                setOrders(response.data.orders || []); 
                console.log(response.data.orders)

            } catch (error) {
                setOrders(null)
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
        socket.on("new_order", (newOrder) => {
          // setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order to the list
          fetchOrders();
        });

      return () => {
          socket.off("new_order");
      };
    }, [user,change]);
    
    const updateStatus = async (order) => {
      try {
          const res = await axios.put(`${API_BASE_URL}/update-status/${order._id}`, {
              order_status: order.order_status
          });
          alert(res.data.message);
  
          // Refresh orders after update
          setOrders((prevOrders) =>
              prevOrders.map((o) =>
                  o._id === order._id ? { ...o, order_status: res.data.order.order_status } : o
              )
          );
          setChange((pre)=>!pre)
      } catch (error) {
          console.error("Error updating order:", error);
      }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chef Dashboard</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order Type</th>
              <th className="border p-2">Food Items</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length>0 ?(orders.map((order, index) => (
              <tr key={index} className="text-center">  
                <td className="border p-2">{order.order_type}</td>
                <td className="border p-2">
                  {order.items.map(item => `${item.food_id.foodname} (x${item.quantity})`).join(", ")}
                </td>
                <td className={`border p-2 text-white font-semibold rounded ${order.order_status === "Pending" ? "bg-yellow-500" : order.order_status === "Cooking" ? "bg-blue-500" : "bg-green-500"}`}>
                  {order.order_status} <Button text="Change" onClick={() => updateStatus(order)} />
                </td>
                <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))):(
              <tr className='text-center'><td className=" text-gray-600">No orders found.</td></tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomeChef