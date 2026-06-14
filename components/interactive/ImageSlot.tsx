"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ImageSlotProps {
  /** Persistence key — each slot needs a distinct id. */
  id: string;
  placeholder?: string;
  /** Real image shown by default (e.g. a case-study cover). */
  defaultSrc?: string;
  /** If set, the frame links here (e.g. /case-study/slug). */
  href?: string;
}

const STORAGE_PREFIX = "zb_image_slot:";
const ACCEPT = ["image/png", "image/jpeg", "image/webp", "image/avif"];
const MAX_DIM = 1200;

/**
 * Project frame. Shows a real default image (and links to the case study when
 * `href` is set), while still letting you drag/drop your own screenshot to
 * override it. The override persists in localStorage; "Clear" reverts to the
 * default. Faithful to the handoff's <image-slot> drop behaviour.
 */
export default function ImageSlot({
  id,
  placeholder = "Drop an image",
  defaultSrc,
  href,
}: ImageSlotProps) {
  const [override, setOverride] = useState<string | null>(null);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const storageKey = STORAGE_PREFIX + id;
  const src = override ?? defaultSrc ?? null;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setOverride(saved);
    } catch {
      /* localStorage unavailable */
    }
  }, [storageKey]);

  const ingest = useCallback(
    async (file: File) => {
      if (!ACCEPT.includes(file.type)) return;
      const dataUrl = await downscale(file);
      if (!dataUrl) return;
      setOverride(dataUrl);
      try {
        localStorage.setItem(storageKey, dataUrl);
      } catch {
        /* quota / unavailable — keep it in memory only */
      }
    },
    [storageKey],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragover(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void ingest(file);
    },
    [ingest],
  );

  const onAction = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (override) {
        // revert to the default image
        setOverride(null);
        try {
          localStorage.removeItem(storageKey);
        } catch {
          /* ignore */
        }
      } else {
        inputRef.current?.click();
      }
    },
    [override, storageKey],
  );

  // Whole-frame click opens the file picker only when there's nothing to link
  // to and no image yet (pure upload mode).
  const frameClickUploads = !href && !src;

  return (
    <div
      className={dragover ? "image-slot dragover" : "image-slot"}
      onClick={frameClickUploads ? () => inputRef.current?.click() : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        setDragover(true);
      }}
      onDragLeave={() => setDragover(false)}
      onDrop={onDrop}
      role={frameClickUploads ? "button" : undefined}
      aria-label={placeholder}
    >
      {src ? (
        href ? (
          <a href={href} aria-label={placeholder}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" />
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" />
        )
      ) : (
        <span className="image-slot-hint">{placeholder}</span>
      )}

      {src ? (
        <button type="button" className="image-slot-clear" onClick={onAction}>
          {override ? "Clear" : "Replace"}
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void ingest(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/** Re-encode the dropped image to a capped-size WebP data URL. */
async function downscale(file: File): Promise<string | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    return canvas.toDataURL("image/webp", 0.85);
  } catch {
    return null;
  }
}
