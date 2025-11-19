import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";

export function Expenses() {
  const [expenses, setExpenses] = useState([]);
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
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

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
    </div>
  );
}