import React, { useState, useEffect } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://crudcrud.com/api/9f993efc18c847afb146660d8cad35eb/expenses"
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/5b0f32236bb8476281a0778b34ea06df/expenses/${id}`,
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
    setEditingExpense(expense);
  };

  const handleEditSubmit = async (updatedExpense) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/5aa35e9789924bb7931b239ad25ee072/expenses/${updatedExpense._id}`,
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
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <div>Amount: {expense.amount}</div>
            <div>Description: {expense.description}</div>
            <div>Category: {expense.category}</div>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingExpense && (
        <ExpenseEditForm
          expense={editingExpense}
          onEditSubmit={handleEditSubmit}
        />
      )}
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
