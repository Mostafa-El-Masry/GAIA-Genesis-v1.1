"use client";
import React, { useEffect, useState } from "react";
import "../styles/glacium.css";
import GlassCard from "../components/GlassCard";

interface Finance {
  type: string;
  amount: number;
  category: string;
}
interface Health {
  glucose: number;
  insulin: number;
  date: string;
}

const DashboardPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [avgGlucose, setAvgGlucose] = useState<number>(0);
  const [apolloNotes, setApolloNotes] = useState<number>(0);
  const [galleryItems, setGalleryItems] = useState<number>(0);

  useEffect(() => {
    // Finance summary
    const finances: Finance[] = JSON.parse(
      localStorage.getItem("gaia_finances") || "[]"
    );
    const income = finances
      .filter((f) => f.type === "income")
      .reduce((a, b) => a + b.amount, 0);
    const expense = finances
      .filter((f) => f.type === "expense")
      .reduce((a, b) => a + b.amount, 0);
    setBalance(income - expense);

    // Health average glucose
    const records: Health[] = JSON.parse(
      localStorage.getItem("healthRecords") || "[]"
    );
    if (records.length > 0) {
      const avg = records.reduce((a, b) => a + b.glucose, 0) / records.length;
      setAvgGlucose(Math.round(avg));
    }

    // Apollo note count
    const notes = JSON.parse(localStorage.getItem("gaia_apollo") || "[]");
    setApolloNotes(notes.length);

    // Gallery count
    const gallery = JSON.parse(localStorage.getItem("gallery_meta") || "[]");
    setGalleryItems(gallery.length);
  }, []);

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
      }}
    >
      <GlassCard
        title="Finance Balance"
        value={`$${balance.toLocaleString()}`}
        link="/wealth"
      />
      <GlassCard
        title="Avg Glucose"
        value={`${avgGlucose} mg/dL`}
        link="/health"
      />
      <GlassCard
        title="Apollo Notes"
        value={`${apolloNotes} entries`}
        link="/apollo"
      />
      <GlassCard
        title="Gallery Items"
        value={`${galleryItems}`}
        link="/gallery"
      />
    </main>
  );
};

export default DashboardPage;
