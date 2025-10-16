"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/gallery.css";
import { ImageItem } from "../../hooks/useMediaManifest";

type View = "slideshow" | "grid";

export default function ImageGallery({ items }: { items: ImageItem[] }) {
  const [view, setView] = useState<View>("slideshow");
  const [index, setIndex] = useState(0);

  const count = items.length;
  const current = items[index]?.src;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const first = useCallback(() => setIndex(0), []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (view !== "slideshow") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key.toLowerCase() === "home") first();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, first, view]);

  // Auto-advance every 5s in slideshow
  useEffect(() => {
    if (view !== "slideshow") return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [view, next]);

  const grid = useMemo(() => (
    <div className="gallery-grid">
      {items.map((img, i) => (
        <div className="gallery-card" key={img.src + i} onClick={() => { setIndex(i); setView("slideshow"); }}>
          <img src={img.src} alt={img.title || `Image ${i+1}`} />
          <div className="label">{img.title || `Image ${i+1}`}</div>
        </div>
      ))}
    </div>
  ), [items]);

  return (
    <section className="gallery-container">
      <div className="gallery-toolbar">
        <div className="view-toggle">
          <button className={view === "slideshow" ? "active" : ""} onClick={() => setView("slideshow")}>Slideshow</button>
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Grid (5 cols)</button>
        </div>
      </div>

      {view === "slideshow" ? (
        <div className="slideshow">
          <div className="slideshow-view glass">
            {current && <img src={current} alt={items[index]?.title || `Slide ${index+1}`} />}
          </div>
          <div className="slideshow-controls">
            <button onClick={first}>First</button>
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
            <span style={{ marginLeft: "auto" }}>{index + 1} / {count}</span>
          </div>
        </div>
      ) : grid}
    </section>
  );
}