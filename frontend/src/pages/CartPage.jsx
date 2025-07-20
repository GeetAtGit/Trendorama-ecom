import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart } = useCart();

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
                  updateCartItem(item._id, Math.max(item.quantity - 1, 1))
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

      <div className="text-right font-bold text-xl">Total: ₹{total}</div>
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
}
