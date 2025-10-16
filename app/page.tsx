"use client";
import Link from "next/link";

export default function HomePage() {
  const modules = [
    {
      name: "Gallery",
      path: "/Gallery",
      icon: "🖼️",
      desc: "View and organize your local image collection.",
    },
    {
      name: "Health Tracker",
      path: "/Healthtracker",
      icon: "💉",
      desc: "Record glucose levels, insulin doses, and medical notes.",
    },
    {
      name: "Wealth Tracker",
      path: "/WealthTracker",
      icon: "💰",
      desc: "Manage income, expenses, and calculate balance.",
    },
    {
      name: "Apollo Archive",
      path: "/Apollo",
      icon: "🧠",
      desc: "Store knowledge, reflections, and GAIA’s internal logs.",
    },
    {
      name: "Timeline Viewer",
      path: "/Timeline",
      icon: "🕰️",
      desc: "Explore global and personal milestones across time.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">
        🌍 GAIA Genesis Dashboard
      </h1>
      <p className="text-center mb-10 text-gray-600">
        Welcome back, Creator.  
        From here, you can access every part of GAIA — her senses, her memory, and her mind.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Link
            key={m.name}
            href={m.path}
            className="border rounded-lg shadow-sm hover:shadow-md transition bg-white p-6 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-3">{m.icon}</div>
            <h2 className="text-xl font-semibold mb-1">{m.name}</h2>
            <p className="text-sm text-gray-600">{m.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        <p>GAIA Genesis v1.00 — Phase 1 Complete</p>
        <p>© 2025 Sasa</p>
      </div>
    </div>
  );
}
