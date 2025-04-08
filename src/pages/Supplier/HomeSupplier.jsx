// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isAuthenticated, getUser } from "../../utils/ProtectedRoute";
// import axios from "axios";
// import Button from "../../components/Button";
// import socket from "../../utils/socket"; // ✅ Use shared socket

// const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


// function HomeSupplier() {
//   const [orders, setOrders] = useState([]); // ✅ Default to an empty array
//   const [user, setUser] = useState(null);
//   const [change, setChange] = useState(false);
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (!isAuthenticated()) {
//       alert("Session expired! Please log in again.");
//       navigate("/");
//     } else {
//       setUser(getUser());
//     }
//   }, [navigate]);

  
//   useEffect(() => {
//     if (!user) return;

//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/supplier-orders`);
//         setOrders(response.data.orders || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();

//     const handleNewOrder = () => {
//       fetchOrders();
//     };

//     socket.on("new_supplier_order", handleNewOrder);

//     return () => {
//       socket.off("new_supplier_order", handleNewOrder);
//     };
//   }, [user, change]);
  
//   const updateStatus = async (order) => {
//     try {
//       const res = await axios.put(`${API_BASE_URL}/supplier-updates/${order._id}`, {
//         order_status: order.order_status,
//       });
//       alert(res.data.message);
//       // setOrders((prevOrders) =>
//       //   prevOrders.map((o) => o._id === order._id ? { ...o, order_status: res.data.order.order_status } : o)
//       // );

//       setChange((pre) => !pre);
//     } catch (error) {
//       console.error("Error updating order:", error);
//     }
//   };
  
//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
//       <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200">
//         Logout
//       </button>
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Order Type</th>
//               <th className="border p-2">Table No.</th>
//               <th className="border p-2">Food Items</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Date & Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="border p-2">{order.order_type}</td>
//                   <td className="p-2 border">{order.table_number ?? "N/A"}</td>
//                   <td className="border p-2">
//                     {order.items?.map((item) => `${item.food_id?.foodname} (x${item.quantity})`).join(", ")}
//                   </td>
//                   <td className={`border p-2 text-white font-semibold rounded ${order.order_status === "Cooked" ? "bg-yellow-500" : "bg-green-500"}`}>
//                     {order.order_status} <Button text="Change" onClick={() => updateStatus(order)} />
//                   </td>
//                   <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="text-center">
//                 <td colSpan="4" className="text-gray-600 p-2">No orders found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default HomeSupplier;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../../utils/ProtectedRoute";
import axios from "axios";
import socket from "../../utils/socket";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function HomeSupplier() {
  const [orders, setOrders] = useState([]); // ✅ Default to an empty array
    const [user, setUser] = useState(null);
    const [change, setChange] = useState(false);
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
          const response = await axios.get(`${API_BASE_URL}/supplier-orders`);
          setOrders(response.data.orders || []);
          console.log(response.data.orders)
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
  
      fetchOrders();
  
      const handleNewOrder = () => {
        fetchOrders();
      };
  
      socket.on("new_supplier_order", handleNewOrder);
  
      return () => {
        socket.off("new_supplier_order", handleNewOrder);
      };
    }, [user, change]);
    
    const updateStatus = async (order) => {
      try {
        const res = await axios.put(`${API_BASE_URL}/supplier-updates/${order._id}`, {
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
    const updatePaymentStatus=async(order)=>{
      try{
        const res=await axios.put(`${API_BASE_URL}/supplier-payment-updates/${order._id}`,{order_paymentstatus:order.payment_status})
        alert(res.data.message)
        setChange((pre) => !pre);
      }
      catch(error){
        console.error("Error updating payment status:",error);
      }
    }
    
    const handleLogout = () => {
      sessionStorage.removeItem("token");
      navigate("/");
    };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={handleLogout}>Logout</button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr>
                <th className="border p-3">Order Type</th>
                <th className="border p-3">Table No.</th>
                <th className="border p-3">Food Items</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Payment</th>
                <th className="border p-3">Date & Time</th>
                <th className="border p-3">Change Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-all text-center border-b">
                    <td className="p-3">{order.order_type}</td>
                    <td className="p-3">{order.table_number ?? "N/A"}</td>
                    <td className="p-3">
                      {order.items?.map((item) => `${item.food_id?.foodname} (x${item.quantity})`).join(", ")}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                          order.order_status === "Cooked" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      >
                        {order.order_status}
                      </span>
                      <button
                        className="ml-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => updateStatus(order)}
                      >
                        Change
                      </button>
                    </td>
                    <td className="p-3">{order.payment_status}</td>
                    <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
                    {order.payment_status==="Pending" ?(<td className="p-3">
                      <button
                        className="ml-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => updatePaymentStatus(order)}
                      >
                        Pay
                      </button>
                    </td>):(<td className="p-3">NA</td>)}
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="5" className="text-gray-600 p-4">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeSupplier;

