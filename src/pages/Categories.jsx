import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";


export function Categories() {
  const [categories, setCategories] = useState([]);
  const { theme } = useContext(ThemeContext);
  

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={`p-10 animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Your Categories</h1>

      <table className={`w-full rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <thead className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
          <tr className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <th className="p-3">Name</th>
            <th className="p-3">Limit</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className={`text-center border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/40' : 'border-gray-300 hover:bg-gray-200/40'} transition`}>
              <td className="p-3">{c.name}</td>
              <td className="p-3">₹{c.monthlyLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}