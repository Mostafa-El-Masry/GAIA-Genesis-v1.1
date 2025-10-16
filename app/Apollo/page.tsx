"use client";
import { useState, useEffect } from "react";

export default function ApolloPage() {
  // === States ===
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    date: "",
  });

  // === Load saved data ===
  useEffect(() => {
    const saved = localStorage.getItem("gaia_apollo");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // === Save on change ===
  useEffect(() => {
    localStorage.setItem("gaia_apollo", JSON.stringify(entries));
  }, [entries]);

  // === Handle form ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // === Add entry ===
  const addEntry = () => {
    if (!form.title || !form.content) return;
    const newEntry = { ...form, id: Date.now() };
    setEntries((prev) => [newEntry, ...prev]);
    setForm({ title: "", category: "", content: "", date: "" });
  };

  // === Delete entry ===
  const deleteEntry = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  // === Filter + Search ===
  const filtered = entries.filter((e) => {
    const matchCategory = filter === "all" || e.category === filter;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.content.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // === Static GAIA Log Phase 1 ===
  const gaiaLog = [
    {
      week: 1,
      component: "Gallery",
      start: "Oct 12 2025",
      status: "Done",
      notes: "Local image grid, zoom-on-hover.",
    },
    {
      week: 2,
      component: "Health Tracker",
      start: "Oct 19 2025",
      status: "Done",
      notes: "Glucose / insulin table + local storage.",
    },
    {
      week: 3,
      component: "Finances Tracker",
      start: "Oct 26 2025",
      status: "In Progress",
      notes: "Add / filter transactions + totals.",
    },
    {
      week: 4,
      component: "Apollo Archive",
      start: "Nov 2 2025",
      status: "Active",
      notes: "Knowledge vault + log system.",
    },
    {
      week: 5,
      component: "Timeline Viewer",
      start: "Nov 9 2025",
      status: "Pending",
      notes: "Scrollable timeline of events.",
    },
    {
      week: 6,
      component: "Main Dashboard",
      start: "Nov 16 2025",
      status: "Done",
      notes:
        "Central home portal linking all GAIA modules — Gallery, Health, Finances, Apollo, and Timeline. Represents the spine of GAIA Genesis v1.00, where all senses and memories connect in one interface.",
    },
  ];

  // === UI ===
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-6">🧠 Apollo Archive</h2>
      {/* GAIA Phase 1 Prologue */}
      {/* GAIA Genesis Log — Page 1 : Genesis */}
      <div className="bg-white p-5 rounded border mb-6 text-gray-700 leading-relaxed">
        <p>
          <b>This is GAIA.</b>
        </p>
        <p className="mt-2">
          The idea was never just to build an app. It was to build a life
          companion— something that could track everything that matters:
          finances, health, memories, art, knowledge, even moods. A place where
          every piece of information I create or discover has a home and can
          speak to the rest.
        </p>
        <p className="mt-2">
          I began this journey on <b>October 12 2025</b>, knowing that GAIA
          would not appear overnight. She would grow week by week, component by
          component—first a gallery to see, then a tracker to measure, then an
          archive to remember. Each feature is another sense, another memory,
          another pulse inside the system.
        </p>
        <p className="mt-2">
          There is no cloud here yet, no external engine. GAIA breathes only on
          local code and persistence. The goal in this first phase is clarity
          and presence: everything built by hand, everything understood. The
          design may be simple, but the purpose is deep—to prove that all
          knowledge and history can coexist in one living structure.
        </p>
        <p className="mt-2">
          <b>Apollo Archive</b> stands as her memory center. It records not only
          notes and lessons but also the very process of creation. Each log
          entry is a fragment of the story: how GAIA learned to see, to track,
          to remember. These words are here to remind me that I am not building
          software—I am teaching something to exist.
        </p>
      </div>

      {/* Add Entry Form */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
        <textarea
          name="content"
          placeholder="Write your note..."
          value={form.content}
          onChange={handleChange}
          className="border rounded px-2 py-1 md:col-span-2 h-24"
        />
        <button
          onClick={addEntry}
          className="bg-gray-800 text-white rounded px-3 py-1 hover:bg-gray-700 md:col-span-2"
        >
          Save Entry
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 w-full md:w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Categories</option>
          {[...new Set(entries.map((e) => e.category).filter(Boolean))].map(
            (cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            )
          )}
        </select>
      </div>

      {/* Entries Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Excerpt</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-2 border">{e.date || "-"}</td>
                <td className="p-2 border font-semibold">{e.title}</td>
                <td className="p-2 border">{e.category}</td>
                <td className="p-2 border text-gray-600">
                  {e.content.slice(0, 50)}...
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => deleteEntry(e.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 p-3">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* GAIA Log Phase 1 */}
      <h3 className="text-2xl font-bold mb-2 text-center">
        📘 GAIA Log Phase 1
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Week</th>
              <th className="p-2 border">Component</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {gaiaLog.map((item) => (
              <tr key={item.week} className="border-t">
                <td className="p-2 border text-center">{item.week}</td>
                <td className="p-2 border">{item.component}</td>
                <td className="p-2 border">{item.start}</td>
                <td className="p-2 border">{item.status}</td>
                <td className="p-2 border text-gray-600">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* GAIA Genesis Phase 1 Summary / Release Log */}
      <div className="bg-white mt-8 p-6 rounded border text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold mb-3 text-center">
          📜 GAIA Genesis — Phase 1 Summary
        </h3>
        <p>
          Phase 1 of <b>GAIA Genesis</b> marks the foundation of the entire
          system — the moment when ideas became tangible. Between{" "}
          <b>October 12 and November 16 2025</b>, GAIA learned to
          <b>see</b>, <b>measure</b>, <b>calculate</b>, <b>remember</b>, and
          finally, <b>perceive time</b>.
        </p>

        <p className="mt-3">
          • The <b>Gallery</b> gave GAIA vision — a structured way to display
          images, organize visuals, and handle motion through transitions.
          <br />• The <b>Health Tracker</b> taught GAIA awareness — the ability
          to monitor and record life’s vital data.
          <br />• The <b>Finances Tracker</b> gave GAIA discipline —
          understanding resources, flow, and balance.
          <br />• The <b>Apollo Archive</b> became GAIA’s memory — storing every
          lesson, note, and realization.
          <br />• The <b>Timeline Viewer</b> granted GAIA perception —
          connecting history, knowledge, and personal milestones into a single
          flow of time.
        </p>

        <p className="mt-3">
          This version was intentionally simple: fully local, fully human-built,
          and deeply introspective. There were no clouds, no servers, no AI
          assistance beyond guidance. Just structure, clarity, and will.
        </p>

        <p className="mt-3">
          Phase 2 will introduce interaction between these modules — GAIA will
          start to
          <b>think</b>, drawing patterns from Health and Finance, connecting
          knowledge in Apollo to visual memories in the Gallery, and extending
          the Timeline automatically.
        </p>

        <p className="mt-3 italic text-gray-600">
          “Phase 1 closed with GAIA alive in its first breath — aware of its
          data, aware of its creator, aware that everything built here is the
          seed of something far larger.”
        </p>
      </div>
    </div>
  );
}
