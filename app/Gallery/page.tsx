"use client";
import React, { useMemo } from "react";
import "../styles/gallery.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaManifest } from "../hooks/useMediaManifest";
import ImageGallery from "./components/ImageGallery";
import VideoGallery from "./components/VideoGallery";

export default function GalleryPage() {
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type") || "ImageGallery";
  const { images, videos, loadedFromManifest } = useMediaManifest();

  const setType = (next: "ImageGallery" | "VideoGallery") => {
    // Use the current pathname to avoid casing/path issues
    const path = window.location.pathname || "/Gallery";
    router.push(`${path}?type=${next}`);
  };

  return (
    <main className="gallery-container">
      <header className="gallery-toolbar">
        <div className="tab">
          <button
            className={type === "ImageGallery" ? "active" : ""}
            onClick={() => setType("ImageGallery")}
          >
            Images
          </button>
          <button
            className={type === "VideoGallery" ? "active" : ""}
            onClick={() => setType("VideoGallery")}
          >
            Videos
          </button>
        </div>
      </header>

      {type === "ImageGallery" ? (
        <ImageGallery items={images} />
      ) : (
        <VideoGallery items={videos} />
      )}
    </main>
  );
}
