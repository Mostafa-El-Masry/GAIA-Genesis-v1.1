import fs from "fs/promises";
import path from "path";

const root = path.resolve(process.cwd());
const mediaDir = path.join(root, "public", "media");
const imagesDir = path.join(mediaDir, "images");
const videosDir = path.join(mediaDir, "videos");
const previewsDir = path.join(mediaDir, "previews");

const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
const videoExts = [".mp4", ".webm", ".mov"];

function makeSrc(p) {
  // return path relative to public (start with /media/...) using POSIX separators
  const rel = path.relative(path.join(root, "public"), p).split(path.sep).join("/");
  return "/" + rel;
}

function makeTitle(p) {
  const base = normaliseBase(p);
  const withoutThumb = base.replace(/_thumb_\d+$/i, "");
  const cleaned = withoutThumb.replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || base || path.basename(p);
}

async function listFiles(dir) {
  try {
    const names = await fs.readdir(dir);
    return names.map((n) => path.join(dir, n));
  } catch (e) {
    return [];
  }
}

function normaliseBase(file) {
  return path.basename(file, path.extname(file));
}

async function main() {
  const images = [];
  const videos = [];

  const previewFiles = await listFiles(previewsDir);
  const previewFrames = new Map();

  for (const f of previewFiles) {
    const ext = path.extname(f).toLowerCase();
    if (!imageExts.includes(ext)) continue;
    const basename = path.basename(f, ext);
    const match = basename.match(/^(.*)_thumb_(\d+)$/);
    if (!match) continue;
    const [, base, indexStr] = match;
    const index = Number.parseInt(indexStr, 10);
    if (Number.isNaN(index)) continue;
    const entry = previewFrames.get(base) || { frames: [] };
    entry.frames.push({ index, src: makeSrc(f), ext });
    previewFrames.set(base, entry);
  }

  const previewMeta = new Map();
  for (const [base, entry] of previewFrames.entries()) {
    if (!entry.frames.length) continue;
    entry.frames.sort((a, b) => a.index - b.index);
    const ext = entry.frames[0].ext;
    const contiguous = entry.frames.every((frame, idx) => frame.index === idx + 1);
    previewMeta.set(base, {
      poster: entry.frames[0].src,
      pattern: `/media/previews/{base}_thumb_{i3}${ext}`,
      count: contiguous ? entry.frames.length : undefined,
    });
  }

  const imageFiles = await listFiles(imagesDir);
  for (const f of imageFiles) {
    const ext = path.extname(f).toLowerCase();
    if (imageExts.includes(ext)) {
      images.push({ src: makeSrc(f), title: makeTitle(f) });
    } else if (videoExts.includes(ext)) {
      // some users put mp4 in images folder by mistake
      const base = normaliseBase(f);
      const meta = previewMeta.get(base);
      const video = { src: makeSrc(f), title: makeTitle(f) };
      if (meta) {
        video.poster = meta.poster;
        video.preview = {
          pattern: meta.pattern,
        };
        if (meta.count) video.preview.count = meta.count;
      }
      videos.push(video);
    }
  }

  const videoFiles = await listFiles(videosDir);
  for (const f of videoFiles) {
    const ext = path.extname(f).toLowerCase();
    if (videoExts.includes(ext)) {
      const base = normaliseBase(f);
      const meta = previewMeta.get(base);
      const video = { src: makeSrc(f), title: makeTitle(f) };
      if (meta) {
        video.poster = meta.poster;
        video.preview = {
          pattern: meta.pattern,
        };
        if (meta.count) video.preview.count = meta.count;
      }
      videos.push(video);
    }
    else if (imageExts.includes(ext))
      images.push({ src: makeSrc(f), title: path.basename(f) });
  }

  const manifest = { images, videos };
  const out = path.join(mediaDir, "manifest.json");
  await fs.writeFile(out, JSON.stringify(manifest, null, 2), "utf8");
  console.log(
    "Wrote",
    out,
    "with",
    images.length,
    "images and",
    videos.length,
    "videos"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
