"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  X,
  Upload,
  FileText,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  Trash2,
  Eye,
  Star,
} from "lucide-react";

type Resource = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  pdfUrl: string | null;
  readTime: string | null;
  published: boolean;
  featured: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

const categories = [
  "Investment",
  "Travel",
  "Finance",
  "Visa Guide",
  "Insurance",
  "Tax Planning",
  "Retirement",
  "General",
];

type Props = {
  resource?: Resource | null;
  onClose: () => void;
  onSaved: () => void;
};

export function ResourceForm({ resource, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(resource?.title || "");
  const [category, setCategory] = useState(resource?.category || categories[0]);
  const [description, setDescription] = useState(resource?.description || "");
  const [content, setContent] = useState(resource?.content || "");
  const [readTime, setReadTime] = useState(resource?.readTime || "");
  const [published, setPublished] = useState(resource?.published ?? false);
  const [featured, setFeatured] = useState(resource?.featured ?? false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(resource?.imageUrl || "");
  const [pdfUrl, setPdfUrl] = useState(resource?.pdfUrl || "");
  const [imagePreview, setImagePreview] = useState(resource?.imageUrl || "");
  const [pdfName, setPdfName] = useState(
    resource?.pdfUrl ? resource.pdfUrl.split("/").pop() || "Attached PDF" : ""
  );

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [imageError, setImageError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image must be under 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError("");
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setPdfError("PDF must be under 10MB");
        return;
      }
      setPdfFile(file);
      setPdfName(file.name);
      setPdfError("");
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let finalImageUrl = imageUrl;
      let finalPdfUrl = pdfUrl;

      if (imageFile) {
        setUploadingImage(true);
        setImageError("");
        try {
          const url = await uploadFile(imageFile, "resources/images");
          if (url) finalImageUrl = url;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Image upload failed";
          setImageError(msg);
          throw new Error(`Image upload failed: ${msg}`);
        } finally {
          setUploadingImage(false);
        }
      }

      if (pdfFile) {
        setUploadingPdf(true);
        setPdfError("");
        try {
          const url = await uploadFile(pdfFile, "resources/pdfs");
          if (url) finalPdfUrl = url;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "PDF upload failed";
          setPdfError(msg);
          throw new Error(`PDF upload failed: ${msg}`);
        } finally {
          setUploadingPdf(false);
        }
      }

      const payload: Record<string, unknown> = {
        title,
        category,
        description,
        content: content || null,
        imageUrl: finalImageUrl || null,
        pdfUrl: finalPdfUrl || null,
        readTime: readTime || null,
        published,
        featured,
      };

      if (resource) {
        payload.id = resource.id;
      }

      const apiUrl = resource ? "/api/resources/update" : "/api/resources/create";
      const res = await fetch(apiUrl, {
        method: resource ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save resource");
      }

      onSaved();
    } catch (err: unknown) {
      if (!error) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    } finally {
      setSaving(false);
      setUploadingImage(false);
      setUploadingPdf(false);
    }
  };

  const isUploading = uploadingImage || uploadingPdf;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-10 sm:pt-16 px-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="bg-surface rounded-2xl border border-border-custom shadow-2xl w-full max-w-2xl mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-custom">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              {resource ? "Edit Resource" : "Create Resource"}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              {resource ? "Update the resource details below" : "Fill in the details to publish a new resource"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted-surface text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. SIP vs Lump Sum: Which is Better?"
              className="w-full px-4 py-2.5 rounded-lg bg-muted-surface border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category + Read Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-muted-surface border border-border-custom text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-primary">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full px-4 py-2.5 rounded-lg bg-muted-surface border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="Brief summary of the article..."
              className="w-full px-4 py-2.5 rounded-lg bg-muted-surface border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Full Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Full article content..."
              className="w-full px-4 py-2.5 rounded-lg bg-muted-surface border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">Cover Image</label>
            {imagePreview ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border-custom group">
                <img src={imagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-text-primary text-xs font-semibold cursor-pointer hover:bg-white transition-colors">
                    <Upload className="h-3.5 w-3.5" /> Replace
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); setImageFile(null); setImageUrl(""); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error/90 text-white text-xs font-semibold hover:bg-error transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <label className="flex items-center justify-center gap-3 px-6 py-8 rounded-xl border-2 border-dashed border-border-custom bg-muted-surface/30 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted-surface">
                  <ImageIcon className="h-5 w-5 text-text-muted" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">Click to upload image</p>
                  <p className="text-xs text-text-muted">JPG, PNG, WebP up to 5MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
            {imageError && (
              <div className="flex items-center gap-1.5 text-xs text-error mt-1">
                <AlertCircle className="h-3.5 w-3.5" /> {imageError}
              </div>
            )}
          </div>

          {/* PDF */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-primary">PDF Attachment</label>
            {pdfName ? (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted-surface/50 border border-border-custom">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 shrink-0">
                  <FileText className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{pdfName}</p>
                  <p className="text-xs text-text-muted">PDF document</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {pdfUrl && (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-surface text-text-muted hover:text-primary transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                  )}
                  <label className="p-1.5 rounded-md hover:bg-surface text-text-muted hover:text-primary transition-colors cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={() => { setPdfFile(null); setPdfUrl(""); setPdfName(""); }}
                    className="p-1.5 rounded-md hover:bg-error/10 text-text-muted hover:text-error transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {uploadingPdf && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
              </div>
            ) : (
              <label className="flex items-center justify-center gap-3 px-6 py-6 rounded-xl border-2 border-dashed border-border-custom bg-muted-surface/30 hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted-surface">
                  <FileText className="h-5 w-5 text-text-muted" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">Click to upload PDF</p>
                  <p className="text-xs text-text-muted">PDF documents up to 10MB</p>
                </div>
                <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" />
              </label>
            )}
            {pdfError && (
              <div className="flex items-center gap-1.5 text-xs text-error mt-1">
                <AlertCircle className="h-3.5 w-3.5" /> {pdfError}
              </div>
            )}
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted-surface/30 border border-border-custom/50">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                published ? "bg-success" : "bg-border-custom"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  published ? "translate-x-5" : ""
                }`}
              />
            </button>
            <div>
              <span className="text-sm text-text-primary font-medium">
                {published ? "Published" : "Save as Draft"}
              </span>
              <p className="text-xs text-text-muted">
                {published ? "Visible on the resources page" : "Only visible in admin dashboard"}
              </p>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted-surface/30 border border-border-custom/50">
            <button
              type="button"
              onClick={() => setFeatured(!featured)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                featured ? "bg-warning" : "bg-border-custom"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  featured ? "translate-x-5" : ""
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <Star className={`h-4 w-4 ${featured ? "text-warning fill-warning" : "text-text-muted"}`} />
              <div>
                <span className="text-sm text-text-primary font-medium">
                  {featured ? "Featured" : "Mark as Featured"}
                </span>
                <p className="text-xs text-text-muted">
                  {featured ? "Appears in Popular Resources sidebar" : "Show in Popular Resources sidebar"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-custom">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving || isUploading} className="min-w-[140px]">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                  {isUploading ? "Uploading..." : "Saving..."}
                </>
              ) : resource ? (
                "Update Resource"
              ) : (
                "Create Resource"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
