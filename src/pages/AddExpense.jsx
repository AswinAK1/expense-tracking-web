import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AddExpense() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    description: "",
  });

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
    if (!userId) {
      return alert("Please log in to add an expense.");
    }
    if (!form.categoryId || !form.amount || !form.description) {
      return alert("Please fill out all fields.");
    }

    try {
      await api.post("/expenses", {
        ...form,
        amount: Number(form.amount),
        userId: userId,
      });
      alert("Expense added!");
      setForm({
        categoryId: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add expense", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="p-10 text-white max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Expense</h1>

      <select
        className="w-full p-3 bg-gray-700 rounded mb-4"
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

      <input
        type="number"
        placeholder="Amount"
        className="w-full p-3 bg-gray-700 rounded mb-4"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Description"
        className="w-full p-3 bg-gray-700 rounded mb-4"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="w-full bg-blue-500 py-3 rounded font-semibold"
      >
        Add Expense
      </button>
    </div>
  );
}