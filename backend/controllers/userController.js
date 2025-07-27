import User from "../models/User.js";

// ✅ GET /api/users/profile
export const getProfile = async (req, res) => {
  try {
    console.log("📥 Fetching profile for ID:", req.user?.id);

    const user = await User.findById(req.user?.id).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ Profile Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

// ✅ PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const newName = req.body.name?.trim();
    console.log("🔑 Updating user ID:", req.user.id);
    console.log("🔑 New name requested:", newName);

    if (!newName) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    // ✅ Force update directly in DB
    const result = await User.updateOne(
      { _id: req.user.id },
      { $set: { name: newName } }
    );

    console.log("✅ Mongo Update Result:", result);

    // ✅ Fetch updated user
    const updatedUser = await User.findById(req.user.id).select("name email role");
    console.log("✅ Updated user:", updatedUser);

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Profile Update Error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
