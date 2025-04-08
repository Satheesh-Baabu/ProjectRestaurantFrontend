// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

// const CartModal = ({ cart, setCart, onClose, handleRemoveFromCart, user }) => {
//   const navigate = useNavigate();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showOrderForm, setShowOrderForm] = useState(false);
//   const [dineOption, setDineOption] = useState("Dine-in");
//   const [tableNumber, setTableNumber] = useState();
//   const [paymentMethod, setPaymentMethod] = useState("Online");
  
//   useEffect(() => {
//     const total = cart.reduce((sum, item) => sum + item.foodId.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, [cart]);
//   useEffect(() => {
//     const storedTableNumber = localStorage.getItem("tableNumber");

//     // Check if storedTableNumber is a valid number
//     if (!isNaN(storedTableNumber) && storedTableNumber !== null) {
//         setTableNumber(Number(storedTableNumber));  
//     } else if (storedTableNumber === "takeaway") {
//         setDineOption("Takeaway"); // Automatically set Dine Option to Takeaway
//     } else {
//         setTableNumber(1); // Default to table 1 if invalid
//     }
// }, []);


 
//   const handleQuantityChange = async (foodId, delta) => {
//     try {
//       const item = cart.find((cartItem) => cartItem.foodId._id === foodId);
//       if (!item) return;

//       const newQuantity = item.quantity + delta;
//       if (newQuantity < 1) return;

//       await axios.put(`${API_BASE_URL}/cart/update`, {
//         userId: user.id,
//         foodId,
//         quantity: newQuantity,
//       });

//       const response = await axios.get(`${API_BASE_URL}/cart/${user.id}`);
//       setCart(response.data.items || []);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const proceedToOrder = () => {
//     setShowOrderForm(true);
//   };

//   const handleOrderSubmit = async () => {
    
//     try {
//       if (!user || !user.id) {
//         alert("User not logged in!");
//         return;
//       }
//       const orderItems = cart.map(item => ({
//         food_id: item.foodId._id,  
//         quantity: item.quantity
//       }));
      
//       // Make sure cart is not empty
//       if (orderItems.length === 0) {
//         alert("Cart is empty. Please add items to place an order.");
//         return;
//       }
//       const orderData = {      
//         user_id: user.id,
//         order_type:dineOption,
//         table_number: dineOption === "Dine-in" ? tableNumber : null,
//         items: orderItems,
//         payment_method:paymentMethod
//       };
//       console.log(orderData)
//       console.log(cart)
//       await axios.post(`${API_BASE_URL}/orders`, orderData); //clear cart data
//       setCart([])

//       if (paymentMethod === "Online") {
//         navigate("/payment", { state: { userId: user.id}});
//       } else {
//         await axios.delete(`${API_BASE_URL}/cart/clear/${user.id}`);
//         navigate("/profile/orders");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         {!showOrderForm ? (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Your Cart</h2>

//             {cart.length === 0 ? (
//               <p className="text-center text-gray-500">Your cart is empty</p>
//             ) : (
//               cart.map((item, index) => (
//                 <div key={index} className="flex justify-between items-center p-2 border-b">
//                   <div>
//                     <h3 className="font-medium">{item.foodId.foodname}</h3>
//                     <p className="text-sm text-gray-600">₹{item.foodId.price * item.quantity}</p>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <button
//                       className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
//                       onClick={() => handleQuantityChange(item.foodId._id, -1)}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
//                       onClick={() => handleQuantityChange(item.foodId._id, 1)}
//                     >
//                       +
//                     </button>
//                     <button
//                       className="px-2 py-1 text-white rounded cursor-pointer"
//                       onClick={() => handleRemoveFromCart(item.foodId._id)}
//                     >
//                       ❌
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}

//             {cart.length != 0 ? (
//               <div>
//                 <h3 className="text-lg font-bold mt-4">Total: ₹{totalPrice}</h3>
//                 <button className="mt-4 w-full bg-orange-500 text-white p-2 rounded cursor-pointer" onClick={proceedToOrder}>
//                   Place Order
//                 </button>
//               </div>)
//             :""}
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Order Details</h2>
//             <label className="block mb-2">Dine Option:</label>
//             <div className="flex space-x-4 mb-4">
//               <label>
//                 <input
//                   type="radio"
//                   value="Dine-in"
//                   checked={dineOption === "Dine-in"}
//                   onChange={() => setDineOption("Dine-in")}
//                 /> Dine-In
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="Takeaway"
//                   checked={dineOption === "Takeaway"}
//                   onChange={() => setDineOption("Takeaway")}
//                 /> Takeaway
//               </label>
//             </div>
//             {dineOption === "Dine-in" && (
//               <>
//                 <label className="block mb-2">Table Number:</label>
//                 <label
//                   className="w-full p-2 border rounded mb-4">{tableNumber} 
//                 </label>
//               </>
//             )}

//             <label className="block mb-2">Payment Method:</label>
//             <div className="flex space-x-4 mb-4">
//               <label>
//                 <input
//                   type="radio"
//                   value="Online"
//                   checked={paymentMethod === "Online"}
//                   onChange={() => setPaymentMethod("Online")}
//                 /> Online Payment
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="Cash"
//                   checked={paymentMethod === "Cash"}
//                   onChange={() => setPaymentMethod("Cash")}
//                 /> Cash Payment
//               </label>
//             </div>

//             <button className="mt-4 w-full bg-green-500 text-white p-2 rounded cursor-pointer" onClick={handleOrderSubmit}>
//               Confirm Order
//             </button>
//           </>
//         )}

//         <button className="mt-4 w-full bg-red-500 text-white p-2 rounded cursor-pointer" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CartModal = ({ cart, setCart, onClose, handleRemoveFromCart, user }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [dineOption, setDineOption] = useState(null);
  const [tableNumber, setTableNumber] = useState();
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [showQRDialog, setShowQRDialog] = useState(false);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.foodId.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  const proceedToOrder = () => {
    const storedTableNumber = localStorage.getItem("tableNumber");

    if (!storedTableNumber) {
      setShowQRDialog(true); // Show QR scan dialog if no data found
    } else if (storedTableNumber === "Takeaway") {
      setDineOption("Takeaway");
      setShowOrderForm(true);
    } else if (!isNaN(storedTableNumber)) {
      setDineOption("Dine-in");
      setTableNumber(Number(storedTableNumber));
      setShowOrderForm(true);
    } else {
      setShowQRDialog(true); // If invalid, ask to rescan QR
    }
  };

  const handleOrderSubmit = async () => {
    try {
      if (!user || !user.id) {
        alert("User not logged in!");
        return;
      }
      const orderItems = cart.map(item => ({
        food_id: item.foodId._id,  
        quantity: item.quantity
      }));

      if (orderItems.length === 0) {
        alert("Cart is empty. Please add items to place an order.");
        return;
      }
      const orderData = {      
        user_id: user.id,
        order_type: dineOption,
        table_number: dineOption === "Dine-in" ? tableNumber : null,
        items: orderItems,
        payment_method: paymentMethod
      };
      
      await axios.post(`${API_BASE_URL}/orders`, orderData);
      setCart([]);

      if (paymentMethod === "Online") {
        navigate("/payment", { state: { userId: user.id } });
      } else {
        await axios.delete(`${API_BASE_URL}/cart/clear/${user.id}`);
        navigate("/profile/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {showQRDialog ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
            <p className="text-gray-600">Please scan a QR code to continue.</p>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded cursor-pointer" onClick={() => navigate('/scanqr')}>
              Scan 
            </button>
          </div>
        ) : !showOrderForm ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <h3 className="font-medium">{item.foodId.foodname}</h3>
                    <p className="text-sm text-gray-600">₹{item.foodId.price * item.quantity}</p>
                  </div>
                  <button className="px-2 py-1 text-red-500 cursor-pointer" onClick={() => handleRemoveFromCart(item.foodId._id)}>
                    ❌
                  </button>
                </div>
              ))
            )}
            {cart.length !== 0 && (
              <div>
                <h3 className="text-lg font-bold mt-4">Total: ₹{totalPrice}</h3>
                <button className="mt-4 w-full bg-orange-500 text-white p-2 rounded" onClick={proceedToOrder}>
                  Place Order
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Order Details</h2>
            <p className="font-semibold">Dine Option: {dineOption}</p>
            {dineOption === "Dine-in" && <p className="font-semibold">Table Number: {tableNumber}</p>}
            <label className="block mb-2">Payment Method:</label>
            <div className="flex space-x-4 mb-4">
              <label>
                <input type="radio" value="Online" checked={paymentMethod === "Online"} onChange={() => setPaymentMethod("Online")} /> Online
              </label>
              <label>
                <input type="radio" value="Cash" checked={paymentMethod === "Cash"} onChange={() => setPaymentMethod("Cash")} /> Cash
              </label>
            </div>
            <button className="mt-4 w-full bg-green-500 text-white p-2 rounded" onClick={handleOrderSubmit}>
              Confirm Order
            </button>
          </>
        )}
        <button className="mt-4 w-full bg-red-500 text-white p-2 rounded cursor-pointer" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
