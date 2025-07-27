import { razorpay } from "../utils/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, address } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Save pending order
    const userCart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    const newOrder = await Order.create({
      user: req.user.id,
      items: userCart.items,
      totalAmount: amount,
      address,
      status: "pending",
      paymentId: order.id,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      orderDBId: newOrder._id,
    });
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};
