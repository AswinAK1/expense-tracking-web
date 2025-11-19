import { useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";

export function AddCategory({ onSuccess }) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const userId = localStorage.getItem("userId");
  const { theme } = useContext(ThemeContext);

  const submit = async () => {
    await api.post("/categories", { userId, name, monthlyLimit: limit });

    setName("");
    setLimit("");

    if (onSuccess) onSuccess();
  };

  return (
    <div className={`animate-fadeIn ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className="text-2xl font-bold mb-4">
        Add Category
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Category Name"
          className={`w-full p-3 rounded-xl border focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              : "bg-gray-200 border-gray-300 text-black focus:ring-blue-500"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monthly Limit"
          className={`w-full p-3 rounded-xl border focus:ring-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              : "bg-gray-200 border-gray-300 text-black focus:ring-blue-500"
          }`}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <button
          onClick={submit}
          className={`w-full py-3 rounded-xl font-semibold hover:opacity-90 transition ${
            theme === "dark"
              ? "bg-blue-700 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          Add
        </button>

      </div>
    </div>
  );
}
