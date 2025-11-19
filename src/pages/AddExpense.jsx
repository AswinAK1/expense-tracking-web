import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";

export function AddExpense() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryId: "", amount: "", description: "" });
  const { theme } = useContext(ThemeContext);

  const loadCategories = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/categories");
      setCategories(res.data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please log in to add an expense.");
    if (!form.categoryId || !form.amount || !form.description)
      return alert("Please fill out all fields.");

    try {
      await api.post("/expenses", { ...form, amount: Number(form.amount), userId });
      alert("Expense added!");
      setForm({ categoryId: "", amount: "", description: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div className={`p-10 max-w-lg mx-auto animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <h1 className="text-3xl font-bold mb-6">Add Expense</h1>

      <select
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 focus:ring-blue-500' : 'bg-gray-200 border-gray-300 focus:ring-blue-500'}`}
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 focus:ring-blue-500' : 'bg-gray-200 border-gray-300 focus:ring-blue-500'}`}
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        type="text"
        placeholder="Description"
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 focus:ring-blue-500' : 'bg-gray-200 border-gray-300 focus:ring-blue-500'}`}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Add Expense
      </button>
    </div>
  );
}