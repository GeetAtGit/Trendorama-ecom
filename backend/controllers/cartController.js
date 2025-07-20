import Cart from "../models/Cart.js";

// GET /api/cart
export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
  res.json(cart);
};

// POST /api/cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};

// PUT /api/cart/:itemId
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ error: "Item not found" });
  item.quantity = quantity;
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};

// DELETE /api/cart/:itemId
export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items.id(itemId).remove();
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
};
