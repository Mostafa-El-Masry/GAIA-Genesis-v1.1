import React from "react";
import "./glacium.css";

export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
}
