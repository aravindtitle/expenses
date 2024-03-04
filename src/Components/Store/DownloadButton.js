import React from "react";

const DownloadButton = ({ expenses }) => {
  const convertToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Amount,Description,Category\n" +
      expenses
        .map(
          (expense) =>
            `${expense.amount},${expense.description},${expense.category}`
        )
        .join("\n");
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return <button onClick={convertToCSV}>Download File</button>;
};

export default DownloadButton;
