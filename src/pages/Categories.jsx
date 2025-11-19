import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";
import { AddCategory } from "./AddCategory";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { theme } = useContext(ThemeContext);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className={`p-10 animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>

      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Your Categories
        </h1>

        <button
          onClick={() => {
            setEditingCategory(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl transition"
        >
          + Add Category
        </button>
      </div>

      <table className={`w-full rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <thead className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Limit</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr
              key={c._id}
              className={`text-center border-b ${
                theme === 'dark'
                  ? 'border-gray-700 hover:bg-gray-700/40'
                  : 'border-gray-300 hover:bg-gray-200/40'
              } transition`}
            >
              <td className="p-3">{c.name}</td>
              <td className="p-3">₹{c.monthlyLimit}</td>

              <td className="p-3 flex justify-center gap-3">

                {/* Edit */}
                <button
                  onClick={() => {
                    setEditingCategory(c);
                    setOpenModal(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteCategory(c._id)}
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
                setEditingCategory(null);
                setOpenModal(false);
              }}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>

            <AddCategory
              editingData={editingCategory}
              onSuccess={() => {
                load();
                setOpenModal(false);
                setEditingCategory(null);
              }}
            />
          </div>

        </div>
      )}

    </div>
  );
}
