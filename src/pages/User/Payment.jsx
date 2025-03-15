// import React, { useEffect, useState } from 'react'
// import { useNavigation } from 'react-router-dom'

// function Payment({route}) {
//   const navigation=useNavigation();
//   const {userId}=route.params;
//   const [amount,setAmount]=useState();
//   useEffect(()=>{
//       const getAmount=async()=>{
//         const res=await axios.get(`http://localhost:5000/${userId}`);
//         setAmount(res.data);
//       }
//       getAmount();
//   },[])
//   const handlePayment=async()=>{
//     try {
//       const {data}=await axios.post("http://localhost:5000/payment",{amount:250});
      
//       console.log(data)
      
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div>
//       Payment
//       <button onClick={handlePayment}>Pay</button>
//     </div>
//   )
// }

// export default Payment;

  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import axios from "axios";

  function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {}; // Retrieve userId from navigation state
  

    const handlePayment = async () => {
      try {
          console.log("hello")
          const { data} = await axios.post("http://localhost:5000/payment", { userId });

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
                      cartId:data.cart.cartId
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
        <h2 className="text-xl font-bold">Payment</h2>
        {/* <p className="mt-2 text-lg">Amount to Pay: ₹{amount}</p> */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    );
  }

  export default Payment;
