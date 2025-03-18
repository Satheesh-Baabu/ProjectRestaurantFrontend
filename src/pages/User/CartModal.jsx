import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartModal = ({ cart, setCart, onClose, handleRemoveFromCart, user }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [dineOption, setDineOption] = useState("Dine-in");
  const [tableNumber, setTableNumber] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [cartId,setCartId]=useState();

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.foodId.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleQuantityChange = async (foodId, delta) => {
    try {
      const item = cart.find((cartItem) => cartItem.foodId._id === foodId);
      if (!item) return;

      const newQuantity = item.quantity + delta;
      if (newQuantity < 1) return;

      await axios.put("http://localhost:5000/cart/update", {
        userId: user.id,
        foodId,
        quantity: newQuantity,
      });

      const response = await axios.get(`http://localhost:5000/cart/${user.id}`);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const proceedToOrder = () => {
    setShowOrderForm(true);
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
      
      // Make sure cart is not empty
      if (orderItems.length === 0) {
        alert("Cart is empty. Please add items to place an order.");
        return;
      }
      const orderData = {      
        user_id: user.id,
        order_type:dineOption,
        table_number: dineOption === "Dine-in" ? tableNumber : null,
        items: orderItems,
        payment_method:paymentMethod
      };
      console.log(orderData)
      console.log(cart)
      await axios.post("http://localhost:5000/orders", orderData); //clear cart data
      setCart([])

      if (paymentMethod === "Online") {
        navigate("/payment", { state: { userId: user.id}});
      } else {
        await axios.delete(`http://localhost:5000/cart/clear/${user.id}`);
        navigate("/profile/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!showOrderForm ? (
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

                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => handleQuantityChange(item.foodId._id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => handleQuantityChange(item.foodId._id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="px-2 py-1 text-white rounded"
                      onClick={() => handleRemoveFromCart(item.foodId._id)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            )}

            {cart.length != 0 ? (
              <div>
                <h3 className="text-lg font-bold mt-4">Total: ₹{totalPrice}</h3>
                <button className="mt-4 w-full bg-orange-500 text-white p-2 rounded" onClick={proceedToOrder}>
                  Place Order
                </button>
              </div>)
            :""}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Order Details</h2>
            <label className="block mb-2">Dine Option:</label>
            <div className="flex space-x-4 mb-4">
              <label>
                <input
                  type="radio"
                  value="Dine-in"
                  checked={dineOption === "Dine-in"}
                  onChange={() => setDineOption("Dine-in")}
                /> Dine-In
              </label>
              <label>
                <input
                  type="radio"
                  value="Takeaway"
                  checked={dineOption === "Takeaway"}
                  onChange={() => setDineOption("Takeaway")}
                /> Takeaway
              </label>
            </div>
            {dineOption === "Dine-in" && (
              <>
                <label className="block mb-2">Table Number:</label>
                <select
                  className="w-full p-2 border rounded mb-4"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </>
            )}

            <label className="block mb-2">Payment Method:</label>
            <div className="flex space-x-4 mb-4">
              <label>
                <input
                  type="radio"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                /> Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={() => setPaymentMethod("Cash")}
                /> Cash Payment
              </label>
            </div>

            <button className="mt-4 w-full bg-green-500 text-white p-2 rounded" onClick={handleOrderSubmit}>
              Confirm Order
            </button>
          </>
        )}

        <button className="mt-4 w-full bg-red-500 text-white p-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
