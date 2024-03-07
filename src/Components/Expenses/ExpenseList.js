import React, { useState, useEffect, useReducer } from "react";
import { themeReducer } from "../Store/ThemeReducer";
import DownloadButton from "../Store/DownloadButton";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editingExpense, setEditingExpense] = useState(null);
  const [theme, dispatchTheme] = useReducer(themeReducer, "light");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://crudcrud.com/api/fdacd626e5b34b77b3d4efde1a81d902/expenses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = expenses.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
      );
      setTotalExpenses(total);
    };

    calculateTotalExpenses();
  }, [expenses]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/bf4464860dca47d69843d7015be8d57b/expenses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      console.log("Expense successfully deleted");
      // Update expenses list after deletion
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense); // Set the expense to be edited
  };

  const handleEditSubmit = async (updatedExpense) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/bf4464860dca47d69843d7015be8d57b/expenses/${updatedExpense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense");
      }
      console.log("Expense successfully updated");
      // Update expenses list after editing
      setExpenses(
        expenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        )
      );
      setEditingExpense(null); // Reset the editing state
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  const toggleTheme = () => {
    dispatchTheme({ type: "TOGGLE_THEME" });
  };

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <h2>Expense List</h2>
      <p>Total Expenses: {totalExpenses} Rupees</p>
      {totalExpenses > 10000 && <button>Activate Premium</button>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <div>Amount: {expense.amount}</div>
            <div>Description: {expense.description}</div>
            <div>Category: {expense.category}</div>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
            <button onClick={() => handleEdit(expense)}>Edit</button>{" "}
            {/* Edit button */}
          </li>
        ))}
      </ul>
      {editingExpense && (
        <ExpenseEditForm
          expense={editingExpense}
          onEditSubmit={handleEditSubmit}
        />
      )}

      {/* Toggle Theme Button */}
      <button onClick={toggleTheme}>Toggle Theme</button>

      {/* Download Button */}
      <DownloadButton expenses={expenses} />
    </div>
  );
};

const ExpenseEditForm = ({ expense, onEditSubmit }) => {
  const [updatedExpense, setUpdatedExpense] = useState({
    _id: expense._id,
    amount: expense.amount,
    description: expense.description,
    category: expense.category,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditSubmit(updatedExpense);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedExpense({ ...updatedExpense, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Amount:</label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={updatedExpense.amount}
        onChange={handleChange}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={updatedExpense.description}
        onChange={handleChange}
      />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={updatedExpense.category}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExpenseList;
