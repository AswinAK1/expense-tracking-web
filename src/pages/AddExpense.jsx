import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";

export function AddExpense({ onSuccess, editingData }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryId: "", amount: "", description: ""  });
  const { theme } = useContext(ThemeContext);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Prefill when editing
  useEffect(() => {
    if (editingData) {
      setForm({
        categoryId: editingData.categoryId?._id || "",
        amount: editingData.amount,
        description: editingData.description
      });
    }
  }, [editingData]);

  const submit = async () => {
    if (!form.categoryId || !form.amount || !form.description)
      return alert("Please fill all fields.");

    try {
      if (editingData) {
        // UPDATE
        await api.put(`/expenses/${editingData._id}`, {
          ...form,
          amount: Number(form.amount),
        });
      } else {
        // CREATE
        await api.post("/expenses", {
          ...form,
          amount: Number(form.amount),
        });
      }

      setForm({ categoryId: "", amount: "", description: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to save expense.");
    }
  };

  return (
    <div className={`animate-fadeIn ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"}`}>
      
      <h1 className="text-2xl font-bold mb-4">
        {editingData ? "Edit Expense" : "Add Expense"}
      </h1>

      {/* Category */}
      <select
        className={`w-full p-3 rounded-xl border mb-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-200 border-gray-300 text-black"
        }`}
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className={`w-full p-3 rounded-xl border mb-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-200 border-gray-300 text-black"
        }`}
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Description"
        className={`w-full p-3 rounded-xl border mb-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-200 border-gray-300 text-black"
        }`}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Save Button */}
      <button
        onClick={submit}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          theme === "dark"
            ? "bg-blue-700 text-white hover:bg-blue-600"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        {editingData ? "Update Expense" : "Add Expense"}
      </button>
    </div>
  );
}
