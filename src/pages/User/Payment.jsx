import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve userId from navigation state
  const [cart, setCart] = useState(null);
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/${userId}`)
      .then((response) => {
        setCart(response.data);
        console.log("Cart Data:", response.data);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  }, [userId]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/payment", { userId });

      console.log("Payment response:", data);
      console.log("Order ID from backend:", data.data.id);  

      const options = {
        key: "rzp_test_sC6hyMIOMRrCE8",
        amount: data.data.amount, // Backend sends the amount
        currency: "INR",
        name: "MSV Restaurant",
        description: "Order Payment",
        order_id: data.data.id,
        handler: async (response) => {
          const verifyRes = await axios.post("http://localhost:5000/payment/verify", {
            ...response,
            userId,
            cartId: data.cart.cartId, 
          });

          if (verifyRes.data.message === "Payment verified successfully") {
            alert("Payment Successful!");
            navigate("/profile/orders");
          } else {
            alert("Payment verification failed!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      {cart ? (
        <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          
          {/* Cart Items */}
          <ul className="divide-y divide-gray-300">
            {cart.items.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.foodId.foodname}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ₹{item.foodId.price}
                  </p>
                </div>
                <p className="font-semibold">₹{item.quantity * item.foodId.price}</p>
              </li>
            ))}
          </ul>

          {/* Total Amount */}
          <div className="flex justify-between font-semibold text-lg mt-4">
            <p>Total Amount:</p>
            <p>₹{cart.total_amount}</p>
          </div>
        </div>
      ) : (
        <p>Loading cart details...</p>
      )}

      {/* Payment Button */}
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={handlePayment}
        disabled={!cart} 
      >
        Pay ₹{cart?.total_amount || 0}
      </button>
    </div>
  );
}

export default Payment;
