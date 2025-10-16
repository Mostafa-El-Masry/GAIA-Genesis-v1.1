import React from "react";
import "../styles/glacium.css";

export default function GlassCard({ children, className = "" }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}
