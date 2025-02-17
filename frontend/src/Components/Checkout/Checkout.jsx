import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navigations/Navbar";
import Footer from "../Footer/Footer";

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    jela: "",
    upazela: "",
    address: "",
    postalCode: "",
    zip: "",
    paymentMethod: "COD",
  });

  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem(`cart_${localStorage.getItem("userId")}`)) || [];

  const deliveryCharge = 120;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price * (1 - item.discount / 100),
    0
  ) + deliveryCharge;
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
  
    // Ensure all fields are filled
    for (let key in userDetails) {
      if (!userDetails[key]) {
        toast.error(`Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
        return;
      }
    }
  
    // Adding product details to the order
    const orderItems = cartItems.map(item => ({
        productId: item._id,
      productName: item.productName, // Assuming productName exists in cart item
      productImage: item.productImage, // Assuming productImage exists in cart item
      productDescription: item.productDescription, // Assuming productDescription exists in cart item
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      productCode: item.productCode
    }));
  
    const order = {
      userId,
      items: orderItems,
      deliveryCharge,
      totalAmount: totalPrice,
      status: "Pending",
      estimatedDeliveryDate,
      ...userDetails,
    };
  
    try {
      const response = await fetch("https://aarshi.onrender.com/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success("Order placed successfully!");
        // localStorage.removeItem(cart_${userId});
        localStorage.setItem("orderSuccess", JSON.stringify(order));
        navigate("/success");
      } else {
        toast.error(responseData.error || "Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };
  
  

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="text-center my-10">
          <h2 className="text-xl font-bold">Your Cart is Empty</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        
        {/* Order Summary */}
        <div className="border p-4 rounded mb-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item._id + item.selectedSize + item.selectedColor} className="flex justify-between">
                <p className="text-[#D4AF37]">{item.productName} (x{item.quantity})</p>
                <p className="text-[#D2C385]">
                  Tk. {(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold mt-4">
            <p className="text-[#D2C385]">Delivery Charge:</p>
            <p className="text-[#D2C385]">Tk. {deliveryCharge.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <p className="text-[#D4AF37]">Total:</p>
            <p className="text-[#D4AF37]">Tk. {totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-6">
            <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="phone" placeholder="Phone Number" value={userDetails.phone} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="state" placeholder="State/City" value={userDetails.state} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="jela" placeholder="District (Jela)" value={userDetails.jela} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="upazela" placeholder="Sub-district (Upazela)" value={userDetails.upazela} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <textarea name="address" placeholder="Delivery Address" value={userDetails.address} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="postalCode" placeholder="Postal Code" value={userDetails.postalCode} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <input type="text" name="zip" placeholder="ZIP Code" value={userDetails.zip} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]" />
            <select name="paymentMethod" value={userDetails.paymentMethod} onChange={handleInputChange} required className="border p-3 rounded w-full text-[#D4AF37]">
              <option value="COD" className="text-[#D4AF37]">Cash on Delivery</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-3 bg-[#D4AF37] text-white rounded hover:bg-[#D2C385] transition w-full">
            Place Order
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Checkout;