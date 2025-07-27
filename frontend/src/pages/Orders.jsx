import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5050/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error("Orders fetch error:", err))
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>
                <span className={`text-sm px-2 py-1 rounded ${
                  order.status === "Delivered" ? "bg-green-100 text-green-700" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                  order.status === "Paid" ? "bg-purple-100 text-purple-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-1">
                {order.items.map(item => (
                  <div key={item.product._id} className="flex justify-between">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 border-t pt-2 text-sm text-gray-600">
                <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="font-bold">Total: ₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
