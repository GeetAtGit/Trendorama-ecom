import Cart from "../models/Cart.js";

// ✅ GET /api/cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
    res.json(cart);
  } catch (err) {
    console.error("❌ Get Cart Error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  } 
};

// ✅ POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error("❌ Add to Cart Error:", err);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

// ✅ PUT /api/cart/:itemId  (for updating quantity)
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    console.log("🛒 Updating item:", itemId, "to quantity:", quantity);

    // ✅ Update or remove
    for (let i = 0; i < cart.items.length; i++) {
      const subId = cart.items[i]._id.toString();
      const prodId = cart.items[i].product.toString();

      if (subId === itemId || prodId === itemId) {
        if (quantity <= 0) {
          console.log(`🗑 Removing item ${itemId} because quantity = ${quantity}`);
          cart.items.splice(i, 1);
        } else {
          cart.items[i].quantity = quantity;
        }
        break;
      }
    }

    // ✅ Hard cleanup for any ghost items
    cart.items = cart.items.filter(i => i.quantity > 0);

    cart.markModified("items");
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    console.error("❌ Update Cart Item Error:", err.stack);
    res.status(500).json({
      message: "Failed to update cart item",
      error: err.message,
    });
  }
};


// ✅ DELETE /api/cart/:itemId  (for removing item)
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log("🛒 DELETE requested:", itemId);

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (!Array.isArray(cart.items)) {
      return res.status(500).json({ message: "Cart items is not an array" });
    }

    console.log("📌 Items before:", JSON.stringify(cart.items, null, 2));

    const before = cart.items.length;

    // ✅ Use filter instead of .id().remove()
    cart.items = cart.items.filter(
      i => i._id?.toString() !== itemId && i.product.toString() !== itemId
    );

    console.log(`✅ Removed ${before - cart.items.length} items`);

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    console.error("❌ Remove Cart Item Error:", err);
    res.status(500).json({
      message: "Failed to remove item",
      error: err.message,
      stack: err.stack
    });
  }
};
