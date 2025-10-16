"use client";
import { useState, useEffect } from "react";

export default function HealthTracker() {
  // one piece of state for each field
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [glucose, setGlucose] = useState("");
  const [insulin, setInsulin] = useState("");
  const [notes, setNotes] = useState("");
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterType, setFilterType] = useState("all");

  function handleAdd() {
    // create one record object
    const newRecord = {
      id: Date.now(), // unique number (timestamp)
      date,
      time,
      glucose,
      insulin,
      notes,
    };

    // add it to the array
    setRecords([...records, newRecord]);

    // clear the form fields
    setDate("");
    setTime("");
    setGlucose("");
    setInsulin("");
    setNotes("");
  }

  useEffect(() => {
    // Only save if there’s at least one record
    if (records.length > 0) {
      localStorage.setItem("healthRecords", JSON.stringify(records));
    }
  }, [records]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("healthRecords");
      if (saved) {
        setRecords(JSON.parse(saved));
      }
    }
  }, []);

  // calculate summary stats
  const glucoseValues = records.map((r) => Number(r.glucose)); // get only glucose numbers

  const average =
    glucoseValues.length > 0
      ? (
          glucoseValues.reduce((a, b) => a + b, 0) / glucoseValues.length
        ).toFixed(1)
      : 0;

  const highest = glucoseValues.length > 0 ? Math.max(...glucoseValues) : 0;
  const lowest = glucoseValues.length > 0 ? Math.min(...glucoseValues) : 0;

  // calculate insulin stats
  const insulinValues = records.map((r) => Number(r.insulin));
  const avgInsulin =
    insulinValues.length > 0
      ? (
          insulinValues.reduce((a, b) => a + b, 0) / insulinValues.length
        ).toFixed(1)
      : 0;

  const highestInsulin =
    insulinValues.length > 0 ? Math.max(...insulinValues) : 0;
  const lowestInsulin =
    insulinValues.length > 0 ? Math.min(...insulinValues) : 0;

  function handleDelete(id) {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
  }

  function handleEdit(id) {
    const recordToEdit = records.find((r) => r.id === id);

    // populate form fields
    setDate(recordToEdit.date);
    setTime(recordToEdit.time);
    setGlucose(recordToEdit.glucose);
    setInsulin(recordToEdit.insulin);
    setNotes(recordToEdit.notes);

    // store which record we’re editing
    setEditingId(id);
  }
  function handleUpdate() {
    const updatedRecords = records.map((r) =>
      r.id === editingId ? { ...r, date, time, glucose, insulin, notes } : r
    );

    setRecords(updatedRecords);
    setEditingId(null);
    setDate("");
    setTime("");
    setGlucose("");
    setInsulin("");
    setNotes("");
  }

  let displayedRecords = [...records].filter((r) => {
    const g = Number(r.glucose);
    if (filterType === "high") return g >= 180;
    if (filterType === "low") return g <= 70;
    if (filterType === "normal") return g > 70 && g < 180;
    return true; // "all"
  });

  if (sortBy === "date-desc") {
    displayedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "date-asc") {
    displayedRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === "glucose-high") {
    displayedRecords.sort((a, b) => Number(b.glucose) - Number(a.glucose));
  } else if (sortBy === "glucose-low") {
    displayedRecords.sort((a, b) => Number(a.glucose) - Number(b.glucose));
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl mx-auto font-bold text-center mb-6">
        🩺 Health Tracker
      </h2>

      {/* Date */}
      <label className="block mb-2 text-sm font-medium">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-4 border rounded px-2 py-1"
      />

      {/* Time */}
      <label className="block mb-2 text-sm font-medium">Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full mb-4 border rounded px-2 py-1"
      />

      {/* Glucose */}
      <label className="block mb-2 text-sm font-medium">Glucose (mg/dL)</label>
      <input
        type="number"
        value={glucose}
        onChange={(e) => setGlucose(e.target.value)}
        className="w-full mb-4 border rounded px-2 py-1"
      />

      {/* Insulin */}
      <label className="block mb-2 text-sm font-medium">Insulin Units</label>
      <input
        type="number"
        value={insulin}
        onChange={(e) => setInsulin(e.target.value)}
        className="w-full mb-4 border rounded px-2 py-1"
      />

      {/* Notes */}
      <label className="block mb-2 text-sm font-medium">Notes</label>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Before breakfast, after lunch..."
        className="w-full mb-4 border rounded px-2 py-1"
      />
      <div className="mt-6 bg-white p-3 rounded border text-sm">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Glucose:</strong> {glucose}
        </p>
        <p>
          <strong>Insulin:</strong> {insulin}
        </p>
        <p>
          <strong>Notes:</strong> {notes}
        </p>
      </div>
      <button
        onClick={editingId ? handleUpdate : handleAdd}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
      >
        {editingId ? "💾 Update Reading" : "➕ Add Reading"}
      </button>

      <button
        onClick={() => {
          setRecords([]);
          localStorage.removeItem("healthRecords");
        }}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 transition mt-2"
      >
        🗑️ Clear All
      </button>

      {records.length > 0 && (
        <div className="mt-6  ">
          <h3 className="text-lg font-semibold mb-2">📋 Readings</h3>
          <p className="text-gray-500 text-sm mb-2">
            Total Readings: {records.length}
          </p>
          {records.length > 0 && (
            <div className="bg-white rounded p-4 mb-4 shadow">
              <h3 className="text-lg font-semibold mb-2">
                📊 Summary For Glucose
              </h3>
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="text-gray-500 text-sm">Average</p>
                  <p className="text-xl font-bold">{average}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Highest</p>
                  <p className="text-xl font-bold text-red-600">{highest}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Lowest</p>
                  <p className="text-xl font-bold text-green-600">{lowest}</p>
                </div>
              </div>
            </div>
          )}
          {records.length > 0 && (
            <div className="bg-white rounded p-4 mb-4 shadow">
              <h3 className="text-lg font-semibold mb-2">
                📊 Summary For Insulin
              </h3>
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="text-gray-500 text-sm">Average</p>
                  <p className="text-xl font-bold">{avgInsulin}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Highest</p>
                  <p className="text-xl font-bold text-red-600">
                    {highestInsulin}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Lowest</p>
                  <p className="text-xl font-bold text-green-600">
                    {lowestInsulin}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row justify-evenly">
            <div className="flex justify-end mb-3">
              <label className="text-sm text-gray-600 mr-2">Filter:</label>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">Show All</option>
                <option value="high">High (≥180)</option>
                <option value="low">Low (≤70)</option>
                <option value="normal">Normal (70–180)</option>
              </select>
            </div>

            {records.length > 0 && (
              <div className="flex justify-end mb-3">
                <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="glucose-high">Glucose (High → Low)</option>
                  <option value="glucose-low">Glucose (Low → High)</option>
                </select>
              </div>
            )}
          </div>
          <table className="w-full max-w-2xl border text-sm bg-white rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Glucose</th>
                <th className="p-2 border">Insulin</th>
                <th className="p-2 border">Notes</th>
                <th className="p-2 border">Edit</th>
                <th className="p-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayedRecords
                .slice()
                .reverse()
                .map((r, i) => (
                  <tr
                    key={r.id}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-2 border">{r.date}</td>
                    <td className="p-2 border">{r.time}</td>
                    <td
                      className={`p-2 border ${
                        Number(r.glucose) > 180
                          ? "bg-red-100"
                          : Number(r.glucose) < 70
                          ? "bg-green-100"
                          : ""
                      }`}
                    >
                      {r.glucose}
                    </td>

                    <td className="p-2 border">
                      {r.insulin}
                      <small className="text-gray-400">units</small>
                    </td>
                    <td className="p-2 border">{r.notes}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleEdit(r.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
