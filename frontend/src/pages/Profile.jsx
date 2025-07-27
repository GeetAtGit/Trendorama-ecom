import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5050/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => {
      console.error("Profile fetch error:", err);
      if (err.response?.status === 401) logout();
    })
    .finally(() => setLoading(false));
  }, [token, logout]);

  const handleSave = async () => {
  try {
    const res = await axios.put("http://localhost:5050/api/users/profile", profile, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProfile(res.data); // ✅ Use saved user from backend
    alert("Profile updated successfully");
  } catch (err) {
    console.error("Profile update error:", err);
  }
};


  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            value={profile.email}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            value={profile.role}
            disabled
          />
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}
