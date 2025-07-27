import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("items.product");
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = await Order.create({
    user: req.user.id,
    items,
    totalAmount,
    status: "Paid"
  });
  res.status(201).json(order);
};
