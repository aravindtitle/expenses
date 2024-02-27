import React, { useState, useEffect } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch expenses data from API or database
    const fetchExpenses = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch("your-api-url");
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

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
        {expenses.map((expense, index) => (
          <li key={index}>
            <div>Amount: {expense.amount}</div>
            <div>Description: {expense.description}</div>
            <div>Category: {expense.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
