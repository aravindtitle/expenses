import React, { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send expense data to backend
    console.log("Expense submitted:", { amount, description, category });
    // Reset form fields
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        {/* Add more categories as needed */}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
