import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AddressDialog from "../components/AddressDialog";
import { FiPlus, FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";


export default function CartPage() {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const { token, user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses") || "[]");
    setAddresses(saved);
    if (saved.length > 0) setSelectedIndex(0);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  if (!cart.items.length) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl">Your cart is empty.</h2>
        <Link to="/shop" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const handleSaveAddress = (addr) => {
    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = addr;
      setAddresses(updated);
      setEditIndex(null);
    } else {
      const updated = [...addresses, addr];
      setAddresses(updated);
      if (selectedIndex === null) setSelectedIndex(updated.length - 1);
    }
  };

  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    if (selectedIndex === index) {
      setSelectedIndex(updated.length > 0 ? 0 : null);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (selectedIndex === null) {
      alert("Please select a shipping address before checkout.");
      return;
    }

    const addr = addresses[selectedIndex];
    const fullAddress = `${addr.name}, ${addr.addressLine}, ${addr.city}, ${addr.state} - ${addr.pin}`;

    try {
      const res = await axios.post(
        "http://localhost:5050/api/payment/create-order",
        { amount: total, address: fullAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency } = res.data;

      const loaded = await loadRazorpay();
      if (!loaded) return alert("Failed to load Razorpay SDK");

      const options = {
        key: "rzp_test_2asmRQBGDUCFeO",
        amount,
        currency,
        name: "Trendorama",
        description: "Order Payment",
        order_id: orderId,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          window.location.reload();
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "",
        },
        theme: {
          color: "#10B981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Failed to start checkout");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {cart.items.map((item) => (
        <div
          key={item._id}
          className="flex items-center bg-white p-4 rounded-lg shadow"
        >
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">₹{item.product.price}</p>
            <div className="mt-2 flex items-center space-x-2">
              <button
                onClick={() =>
                  updateCartItem(item._id, item.quantity - 1 <= 0 ? 0 : item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateCartItem(item._id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="font-bold">₹{item.product.price * item.quantity}</div>
        </div>
      ))}

     <div className="space-y-3">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-lg">Shipping Addresses</h3>
    <button
      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-transform hover:scale-105"
      onClick={() => setShowDialog(true)}
    >
      <FiPlus className="text-white" size={18} />
      Add Address
    </button>
  </div>

  {addresses.length > 0 ? (
    <div className="space-y-3">
      {addresses.map((addr, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg bg-white shadow flex justify-between items-start border transition-all duration-300 ${
            selectedIndex === index ? "border-green-500" : "border-gray-200"
          }`}
        >
          <div className="flex gap-3">
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedIndex === index}
              onChange={() => setSelectedIndex(index)}
              className="mt-2 accent-green-500"
            />
            <div>
              <p className="font-medium flex items-center gap-1">
                <FiMapPin className="text-green-600" /> {addr.name}
              </p>
              <p className="text-sm text-gray-600">{addr.addressLine}</p>
              <p className="text-sm text-gray-600">
                {addr.city}, {addr.state} - {addr.pin}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="p-1 text-yellow-400 bg-white rounded hover:text-yellow-500 transition-transform hover:scale-110"
              onClick={() => {
                setEditIndex(index);
                setShowDialog(true);
              }}
              title="Edit"
            >
              <FiEdit size={16} />
            </button>
            <button
              className="p-1 text-red-500 bg-white rounded hover:text-red-600 transition-transform hover:scale-110"
              onClick={() => handleDeleteAddress(index)}
              title="Delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No addresses added yet.</p>
  )}
</div>

      <div className="text-right font-bold text-xl">Total: ₹{total}</div>
      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>

      <AddressDialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditIndex(null);
        }}
        onSave={handleSaveAddress}
        initialData={editIndex !== null ? addresses[editIndex] : null}
        mode={editIndex !== null ? "edit" : "add"}
      />
    </div>
  );
}
