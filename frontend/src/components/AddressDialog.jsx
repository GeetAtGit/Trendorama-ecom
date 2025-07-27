import { useState, useEffect } from "react";

export default function AddressDialog({ open, onClose, onSave, initialData, mode = "add" }) {
  const [address, setAddress] = useState({
    name: "",
    addressLine: "",
    city: "",
    pin: "",
    state: "",
  });

  useEffect(() => {
    if (initialData) setAddress(initialData);
  }, [initialData]);

  if (!open) return null;

  const handleSave = () => {
    onSave(address);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg space-y-3">
        <h2 className="text-lg font-bold">{mode === "edit" ? "Edit Address" : "Add Address"}</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Floor / Street"
          className="w-full border p-2 rounded"
          value={address.addressLine}
          onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full border p-2 rounded"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="PIN"
          className="w-full border p-2 rounded"
          value={address.pin}
          onChange={(e) => setAddress({ ...address, pin: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          className="w-full border p-2 rounded"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />

        <div className="flex justify-end space-x-2 mt-3">
          <button
            className="px-3 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={handleSave}
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
