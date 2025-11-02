"use client";
import React, { useState } from "react";
import { Edit, Trash2, Plus, X, AlertTriangle } from "lucide-react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Ujjwal Bharadwaj",
      phone: "9696531218",
      altPhone: "9876543210",
      email: "ujjwalbharadwaj56@gmail.com",
      pincode: "131001",
      flat: "Rishihood University Gate No 2",
      street: "Sonipat",
      city: "Sonipat",
      state: "Haryana",
      isDefault: true,
    },
    {
      id: 2,
      name: "Ravi Kumar",
      phone: "9876543210",
      altPhone: "",
      email: "ravi@example.com",
      pincode: "110001",
      flat: "A-12, Green Park",
      street: "South Delhi",
      city: "New Delhi",
      state: "Delhi",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    pincode: "",
    flat: "",
    street: "",
    city: "",
    state: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  // -------- VALIDATION -------- //
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (formData.altPhone && !/^[6-9]\d{9}$/.test(formData.altPhone))
      newErrors.altPhone = "Enter a valid alternative number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    if (!formData.flat.trim()) newErrors.flat = "Flat/building name is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------- CRUD HANDLERS -------- //
  const handleDeleteConfirmed = () => {
    setAddresses(addresses.filter((a) => a.id !== confirmDelete));
    setConfirmDelete(null);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setErrors({});
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setFormData({
      name: "",
      phone: "",
      altPhone: "",
      email: "",
      pincode: "",
      flat: "",
      street: "",
      city: "",
      state: "",
      isDefault: false,
    });
    setErrors({});
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAddresses((prev) => {
      let updated = [...prev];
      if (formData.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }

      if (editingAddress) {
        updated = updated.map((a) =>
          a.id === editingAddress.id ? { ...formData, id: a.id } : a
        );
      } else {
        updated.push({ ...formData, id: Date.now() });
      }
      return updated;
    });

    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 relative">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-6 bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-light text-gray-900">My Addresses</h1>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Existing Addresses */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-lg font-medium text-gray-900">{addr.name}</p>
                  <p className="text-sm text-gray-600">
                    {addr.flat}, {addr.street && `${addr.street},`} {addr.city},{" "}
                    {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    📞 +91 {addr.phone}
                    {addr.altPhone && ` | Alt: ${addr.altPhone}`}
                  </p>
                  <p className="text-sm text-gray-600">{addr.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(addr.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              {addr.isDefault && (
                <span className="text-xs text-green-600 font-medium">
                  Default Address
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        </div>
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[95%] max-w-md h-[65vh] rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form
              id="addressForm"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            >
              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Contact Information
                </h3>
                {[
                  { name: "name", label: "Full name*", type: "text" },
                  { name: "phone", label: "Phone number*", type: "tel" },
                  { name: "altPhone", label: "Alternative phone number", type: "tel" },
                  { name: "email", label: "Email ID*", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      inputMode={field.type === "tel" ? "numeric" : "text"}
                      pattern={field.type === "tel" ? "[0-9]*" : undefined}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-black ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                    />
                    {errors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  Address Information
                </h3>
                <button
                  type="button"
                  className="w-full border border-gray-400 rounded-lg py-2 text-sm font-medium mb-2 hover:bg-gray-50"
                >
                  Use my location
                </button>

                {[
                  { name: "pincode", label: "Pincode*", type: "text" },
                  { name: "flat", label: "Flat no / building name*", type: "text" },
                  { name: "street", label: "Locality / Area / Street", type: "text" },
                  { name: "city", label: "City*", type: "text" },
                  { name: "state", label: "State*", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-black ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                    />
                    {errors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                {/* Default Checkbox */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    checked={formData.isDefault}
                    onChange={(e) =>
                      setFormData({ ...formData, isDefault: e.target.checked })
                    }
                    className="h-4 w-4 text-black border-gray-300 rounded"
                  />
                  <label
                    htmlFor="defaultAddress"
                    className="text-sm text-gray-700 font-medium"
                  >
                    Set as Default Address
                  </label>
                </div>
              </section>
            </form>

            {/* Footer */}
            <div className="border-t bg-white p-4">
              <button
                type="submit"
                form="addressForm"
                className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Save my address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete this address?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. Are you sure you want to delete it?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
