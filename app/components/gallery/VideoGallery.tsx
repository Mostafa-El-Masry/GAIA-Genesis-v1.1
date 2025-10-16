"use client";
import React, { useEffect, useMemo, useState } from "react";
import "../../styles/gallery.css";
import { VideoItem } from "../../hooks/useMediaManifest";
import { useHoverPreview } from "../../hooks/useHoverPreview";

export default function VideoGallery({ items }: { items: VideoItem[] }) {
  const [current, setCurrent] = useState<VideoItem | null>(items[0] || null);

  useEffect(() => {
    if (!current && items.length) setCurrent(items[0]);
  }, [items, current]);

  return (
    <section className="gallery-container">
      <div className="video-player glass">
        {current ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            controls
            preload="metadata"
          />
        ) : (
          <div style={{ padding: "2rem" }}>No video selected</div>
        )}
      </div>

      <div className="gallery-grid">
        {items.map((v, i) => (
          <VideoCard key={v.src + i} item={v} onSelect={() => setCurrent(v)} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ item, onSelect }: { item: VideoItem; onSelect: () => void }) {
  const { frames, current, start, stop, hasFrames } = useHoverPreview({
    videoSrc: item.src,
    count: item.preview?.count,
    pattern: item.preview?.pattern,
    intervalMs: 140,
    maxProbe: 12,
  });

  return (
    <div
      className="gallery-card"
      onMouseEnter={start}
      onMouseLeave={stop}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onSelect(); }}
    >
      {/* Poster or first frame */}
      {(!hasFrames && item.poster) ? (
        <img src={item.poster} alt={item.title || "Poster"} />
      ) : hasFrames && current ? (
        <div className="preview-overlay" style={{ display: "block" }}>
          <img src={current} alt={item.title || "Preview"} />
        </div>
      ) : (
        <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>Loading preview…</span>
        </div>
      )}
      <div className="label">{item.title || item.src.split("/").pop()}</div>
    </div>
  );
}