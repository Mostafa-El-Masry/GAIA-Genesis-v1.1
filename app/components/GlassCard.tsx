"use client";
import React from "react";
import Link from "next/link";
import "../styles/glacium.css";

interface GlassCardProps {
  title: string;
  value: string;
  link?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, value, link }) => {
  const content = (
    <div
      className="glass"
      style={{
        padding: "1.5rem",
        minHeight: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "1.1rem", opacity: 0.85 }}>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
        {value}
      </p>
    </div>
  );
  return link ? (
    <Link href={link} style={{ textDecoration: "none", color: "inherit" }}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default GlassCard;
