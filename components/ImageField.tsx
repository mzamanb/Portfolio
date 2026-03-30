"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Link2, X, Loader2, ImageIcon } from "lucide-react";

export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [mode, setMode] = useState<"url" | "upload">(
    value && !value.startsWith("/uploads/") ? "url" : "upload"
  );
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          credentials: "include",
          body: form,
        });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        onChange(url);
      } catch {
        /* upload error handled silently — field stays unchanged */
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) handleUpload(file);
    },
    [handleUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {label}
        </label>
        <div className="flex rounded-md border border-border-subtle bg-bg text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1 rounded-l-md px-2.5 py-1 transition-all ${
              mode === "upload"
                ? "bg-accent/10 text-accent"
                : "text-text-muted hover:text-text"
            }`}
          >
            <Upload size={11} />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 rounded-r-md px-2.5 py-1 transition-all ${
              mode === "url"
                ? "bg-accent/10 text-accent"
                : "text-text-muted hover:text-text"
            }`}
          >
            <Link2 size={11} />
            URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.png"
          className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-5 text-center transition-all ${
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border-subtle bg-bg-card hover:border-text-muted"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <Loader2 size={20} className="animate-spin text-accent" />
          ) : (
            <Upload size={20} className="text-text-muted" />
          )}
          <p className="mt-2 text-xs text-text-muted">
            {uploading
              ? "Uploading..."
              : "Click to browse or drag & drop an image"}
          </p>
          <p className="mt-1 text-[10px] text-text-muted/60">
            PNG, JPG, GIF, WebP, AVIF, SVG
          </p>
        </div>
      )}

      {/* Preview + current value */}
      {value && (
        <div className="mt-2 flex items-start gap-3 rounded-lg border border-border-subtle bg-bg/50 p-2">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-bg-elevated">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (
                  e.target as HTMLImageElement
                ).parentElement!.querySelector("div")!.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 hidden items-center justify-center"
              style={{ display: "none" }}
            >
              <ImageIcon size={16} className="text-text-muted" />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p
              className="truncate text-xs text-text-muted"
              title={value}
            >
              {value}
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex w-fit items-center gap-1 text-[10px] text-text-muted hover:text-red-400"
            >
              <X size={10} />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
