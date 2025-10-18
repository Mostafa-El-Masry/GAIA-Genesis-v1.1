"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "../../styles/gallery.css";
import { VideoItem } from "../../hooks/useMediaManifest";
import { useHoverPreview } from "../../hooks/useHoverPreview";

type VideoWithViews = VideoItem & { views: number };

const STORAGE_KEY = "video:viewCounts";
const FILTER_KEY = "video:activeFilter";
const POSITION_KEY = "video:positions";
const VOLUME_KEY = "video:volume";
const LAST_VIDEO_KEY = "video:lastSelected";

function loadViewCounts(): Record<string, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

function saveViewCounts(counts: Record<string, number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch (e) {}
}

function incrementViews(videoSrc: string) {
  const counts = loadViewCounts();
  counts[videoSrc] = (counts[videoSrc] || 0) + 1;
  saveViewCounts(counts);
  return counts[videoSrc];
}

function loadPositions(): Record<string, number> {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function savePositions(pos: Record<string, number>) {
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(pos));
  } catch (e) {}
}

function loadVolume(): number {
  try {
    const raw = localStorage.getItem(VOLUME_KEY);
    return raw ? Number(raw) : 1;
  } catch (e) {
    return 1;
  }
}

function saveVolume(v: number) {
  try {
    localStorage.setItem(VOLUME_KEY, String(v));
  } catch (e) {}
}

function saveLastSelected(src?: string) {
  try {
    if (!src) localStorage.removeItem(LAST_VIDEO_KEY);
    else localStorage.setItem(LAST_VIDEO_KEY, src);
  } catch (e) {}
}

export default function VideoGallery({ items }: { items: VideoItem[] }) {
  const [current, setCurrent] = useState<VideoItem | null>(items[0] || null);
  const [selectedStar, setSelectedStar] = useState<string>("");
  const [showMostViewed, setShowMostViewed] = useState(false);
  const [viewCounts, setViewCounts] =
    useState<Record<string, number>>(loadViewCounts);

  const playerRef = useRef<HTMLDivElement | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const positionsRef = useRef<Record<string, number>>(loadPositions());
  const [volume, setVolume] = useState<number>(loadVolume());

  // Load saved filters
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FILTER_KEY);
      if (saved) {
        const filters = JSON.parse(saved);
        setSelectedStar(filters.star || "");
        setShowMostViewed(!!filters.mostViewed);
      }
    } catch (e) {}
  }, []);

  // Restore last selected video and volume
  useEffect(() => {
    try {
      const last = localStorage.getItem(LAST_VIDEO_KEY);
      if (last) {
        const found = items.find((it) => it.src === last);
        if (found) setCurrent(found);
      }
    } catch (e) {}
  }, [items]);

  // Save filters
  useEffect(() => {
    try {
      localStorage.setItem(
        FILTER_KEY,
        JSON.stringify({
          star: selectedStar,
          mostViewed: showMostViewed,
        })
      );
    } catch (e) {}
  }, [selectedStar, showMostViewed]);

  // Extract unique names/stars from video titles
  const stars = useMemo(() => {
    const names = new Set<string>();
    items.forEach((item) => {
      const name = item.title?.split(" - ")[0] || "";
      if (name) names.add(name);
    });
    return Array.from(names).sort();
  }, [items]);

  // Filter and sort videos
  const filteredItems = useMemo(() => {
    let filtered = items.map((item) => ({
      ...item,
      views: viewCounts[item.src] || 0,
    }));

    // Apply star filter if selected
    if (selectedStar) {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().startsWith(selectedStar.toLowerCase())
      );
    }

    // Sort by views if most viewed is active
    if (showMostViewed) {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [items, selectedStar, showMostViewed, viewCounts]);

  useEffect(() => {
    if (!current && filteredItems.length) setCurrent(filteredItems[0]);
  }, [filteredItems, current]);

  // Save playback position and volume when the video element updates
  useEffect(() => {
    const el = videoElRef.current;
    if (!el || !current) return undefined;

    const onTime = () => {
      try {
        positionsRef.current[current.src] = el.currentTime;
        // throttle saving to storage; for simplicity save on every timeupdate
        savePositions(positionsRef.current);
      } catch (e) {}
    };

    const onVolume = () => {
      try {
        const v = el.volume;
        setVolume(v);
        saveVolume(v);
      } catch (e) {}
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("volumechange", onVolume);

    return () => {
      try {
        el.removeEventListener("timeupdate", onTime);
        el.removeEventListener("volumechange", onVolume);
      } catch (e) {}
    };
  }, [current, volume]);

  // Update current video when filters change
  useEffect(() => {
    if (filteredItems.length === 0) {
      setCurrent(null);
    } else if (!filteredItems.includes(current as VideoWithViews)) {
      setCurrent(filteredItems[0]);
    }
  }, [filteredItems, current]);

  // Track video views
  const onVideoSelect = (video: VideoItem) => {
    // Increment views first so the saved counts are available when we flush state
    const newCount = incrementViews(video.src);

    // Use flushSync so the DOM update (mounting the <video>) happens synchronously
    // and calling play() is treated as a user gesture by the browser.
    flushSync(() => {
      setCurrent(video);
      setViewCounts((prev) => ({ ...prev, [video.src]: newCount }));
    });

    const attemptPlayAndScroll = () => {
      if (playerRef.current) {
        playerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      const v = videoElRef.current;
      if (v) {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
        return true;
      }
      return false;
    };

    // Try immediately (should succeed because of flushSync). If not present yet,
    // try again on the next animation frame.
    if (!attemptPlayAndScroll()) {
      requestAnimationFrame(() => {
        attemptPlayAndScroll();
      });
    }

    // persist last selected
    saveLastSelected(video.src);
  };

  return (
    <section className="gallery-container">
      {/* Filter bar */}
      <div className="gallery-toolbar">
        <div className="filters-container">
          <div className="select-wrapper">
            <select
              value={selectedStar}
              onChange={(e) => setSelectedStar(e.target.value)}
              className="star-select"
              aria-label="Filter videos by star"
            >
              <option value="">Select Star</option>
              {stars.map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
            {selectedStar && (
              <button
                className="clear-filter"
                onClick={() => setSelectedStar("")}
                aria-label="Clear star filter"
              >
                ×
              </button>
            )}
          </div>

          <button
            className={"view-toggle-btn" + (showMostViewed ? " active" : "")}
            onClick={() => setShowMostViewed(!showMostViewed)}
          >
            Most Viewed
          </button>
        </div>
      </div>

      <div className="video-player glass" ref={playerRef}>
        {current ? (
          <>
            <video
              key={current.src}
              ref={(el) => {
                videoElRef.current = el;
                // restore volume and position when video element mounts
                if (el) {
                  try {
                    el.volume = volume;
                    const pos = positionsRef.current[current.src];
                    if (
                      typeof pos === "number" &&
                      !Number.isNaN(pos) &&
                      pos > 0
                    ) {
                      // set currentTime if available
                      // Some browsers may throw if metadata not loaded yet; guard with try/catch
                      try {
                        el.currentTime = pos;
                      } catch (e) {
                        // if metadata not ready, wait for loadedmetadata
                        const onMeta = () => {
                          try {
                            el.currentTime = pos;
                          } catch (ee) {}
                          el.removeEventListener("loadedmetadata", onMeta);
                        };
                        el.addEventListener("loadedmetadata", onMeta);
                      }
                    }
                  } catch (e) {}
                }
              }}
              src={encodeURI(current.src)}
              poster={current.poster ? encodeURI(current.poster) : undefined}
              controls
              preload="metadata"
            />
            {/* Attach listeners to save time updates and volume changes */}
            {/* Using a small wrapper effect via ref assignment above; attach events globally */}
            <div className="video-info">
              <div className="video-title">{current.title}</div>
              <div className="video-views">
                {viewCounts[current.src] || 0} views
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "2rem" }}>No video selected</div>
        )}
      </div>

      <div className="gallery-grid">
        {filteredItems.map((v, i) => (
          <VideoCard
            key={v.src + i}
            item={v}
            views={v.views}
            onSelect={() => onVideoSelect(v)}
          />
        ))}
      </div>
    </section>
  );
}

function VideoCard({
  item,
  views,
  onSelect,
}: {
  item: VideoItem;
  views: number;
  onSelect: () => void;
}) {
  const { frames, current, start, stop, hasFrames } = useHoverPreview({
    videoSrc: item.src,
    count: item.preview?.count,
    pattern: item.preview?.pattern,
    intervalMs: 1000,
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
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect();
      }}
    >
      {/* Poster or first frame */}
      {!hasFrames && item.poster ? (
        <img src={encodeURI(item.poster)} alt={item.title || "Poster"} />
      ) : hasFrames && current ? (
        <div className="preview-overlay" style={{ display: "block" }}>
          <img src={encodeURI(current)} alt={item.title || "Preview"} />
        </div>
      ) : (
        <div
          style={{
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Loading preview…</span>
        </div>
      )}
      <div className="label">
        <div>{item.title || item.src.split("/").pop()}</div>
        <div className="views-count">{views} views</div>
      </div>
    </div>
  );
}
