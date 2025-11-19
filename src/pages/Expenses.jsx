import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";
import { AddExpense } from "./AddExpense";

export function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(ThemeContext);

  const loadExpenses = async () => {
    const res = await api.get("/expenses/monthly-expense?month=11&year=2025");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className={`p-10 animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>

      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>

        <button
          onClick={() => setOpenModal(true)}
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
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className={`text-center border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/40' : 'border-gray-300 hover:bg-gray-200/40'} transition`}>
              <td className="p-3">{e.categoryId?.name}</td>
              <td className="p-3">₹{e.amount}</td>
              <td className="p-3">{new Date(e.date).toDateString()}</td>
              <td className="p-3">{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Expense Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div
            className={`p-8 rounded-xl shadow-xl w-[90%] max-w-md relative ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
          >
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>

            <AddExpense
              onSuccess={() => {
                loadExpenses();
                setOpenModal(false);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
