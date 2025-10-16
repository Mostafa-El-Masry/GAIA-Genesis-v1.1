"use client";
import { useState, useEffect } from "react";

export default function FinancesPage() {
  // === State management ===
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    date: "",
    desc: "",
    amount: "",
    type: "expense",
    category: "",
  });

  // === Load saved transactions ===
  useEffect(() => {
    const saved = localStorage.getItem("gaia_finances");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // === Save transactions to localStorage ===
  useEffect(() => {
    localStorage.setItem("gaia_finances", JSON.stringify(transactions));
  }, [transactions]);

  // === Handle form input ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // === Add new transaction ===
  const addTransaction = () => {
    if (!form.desc || !form.amount) return;
    const newTrans = {
      ...form,
      id: Date.now(),
      amount: parseFloat(form.amount),
    };
    setTransactions((prev) => [newTrans, ...prev]);
    setForm({ date: "", desc: "", amount: "", type: "expense", category: "" });
  };

  // === Delete transaction ===
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // === Filtered transactions ===
  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  // === Summary calculations ===
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // === UI ===
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6">💰 Finances Tracker</h2>

      {/* Input Form */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={addTransaction}
          className="bg-gray-800 text-white rounded px-3 py-1 hover:bg-gray-700"
        >
          Add
        </button>
      </div>

      {/* Filter */}
      <div className="mb-3">
        <label className="mr-2 font-medium">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2 border">{t.date || "-"}</td>
                <td className="p-2 border">{t.desc}</td>
                <td className="p-2 border">{t.category}</td>
                <td className="p-2 border capitalize">{t.type}</td>
                <td
                  className={`p-2 border font-semibold ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {t.amount.toFixed(2)}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 p-3">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg p-4 border">
        <p className="text-green-600 font-semibold">
          Total Income: ${income.toFixed(2)}
        </p>
        <p className="text-red-600 font-semibold">
          Total Expenses: ${expenses.toFixed(2)}
        </p>
        <p className="text-blue-600 font-bold">
          Current Balance: ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
