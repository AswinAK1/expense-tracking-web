import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
