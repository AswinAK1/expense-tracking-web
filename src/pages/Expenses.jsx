import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";
import { AddExpense } from "./AddExpense";

export function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const { theme } = useContext(ThemeContext);

  const loadExpenses = async () => {
    const res = await api.get("/expenses/monthly-expense?month=11&year=2025");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await api.delete(`/expenses/${id}`);
      loadExpenses();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className={`p-10 animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>

        <button
          onClick={() => {
            setOpenModal(true);
            setEditingExpense(null);
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Table */}
      <table className={`w-full rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <thead className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
          <tr>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr
              key={e._id}
              className={`text-center border-b ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-700/40"
                  : "border-gray-300 hover:bg-gray-200/40"
              } transition`}
            >
              <td className="p-3">{e.categoryId?.name}</td>
              <td className="p-3">₹{e.amount}</td>
              <td className="p-3">{new Date(e.date).toDateString()}</td>
              <td className="p-3">{e.description}</td>

              <td className="p-3 flex gap-3 justify-center">

                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditingExpense(e);
                    setOpenModal(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteExpense(e._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div
            className={`p-8 rounded-xl shadow-xl w-[90%] max-w-md relative ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <button
              onClick={() => {
                setOpenModal(false);
                setEditingExpense(null);
              }}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>

            <AddExpense
              editingData={editingExpense}
              onSuccess={() => {
                loadExpenses();
                setOpenModal(false);
                setEditingExpense(null);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
