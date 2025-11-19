import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await api.get("/expenses/monthly-expense?month=11&year=2025");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className="text-center border-b border-gray-700">
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
