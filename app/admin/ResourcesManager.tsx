"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/ui/confirm-dialog";
import {
  Plus,
  Trash2,
  RefreshCw,
  FileText,
  Eye,
  EyeOff,
  Pencil,
  Inbox,
  Loader2,
  Download,
  Search,
  Image as ImageIcon,
  Calendar,
  Clock,
  LayoutGrid,
  List,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";
import { ResourceForm } from "./ResourceForm";

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

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Investment: { bg: "bg-secondary/10", text: "text-secondary", dot: "bg-secondary" },
  Travel: { bg: "bg-info/10", text: "text-info", dot: "bg-info" },
  Finance: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  "Visa Guide": { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  Insurance: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  "Tax Planning": { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  Retirement: { bg: "bg-secondary/10", text: "text-secondary", dot: "bg-secondary" },
  General: { bg: "bg-muted-surface", text: "text-text-secondary", dot: "bg-text-muted" },
};

export function ResourcesManager() {
  const { confirm } = useConfirm();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    lastSync: {
      status: string;
      filesAdded: number;
      filesUpdated: number;
      filesDeleted: number;
      createdAt: string;
    } | null;
    driveFileCount: number;
  } | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources?all=true");
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      }
    } catch (err) {
      console.error("Failed to fetch resources:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSyncStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/resources/sync");
      if (res.ok) {
        const data = await res.json();
        setSyncStatus(data);
      }
    } catch {
      // Sync status not available
    }
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/resources/sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `Sync complete: ${data.filesAdded} added, ${data.filesUpdated} updated, ${data.filesDeleted} unpublished`
        );
        fetchResources();
        fetchSyncStatus();
      } else {
        toast.error(data.error || "Sync failed");
      }
    } catch {
      toast.error("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchResources();
    fetchSyncStatus();
  }, [fetchResources, fetchSyncStatus]);

  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "Delete Resource",
      message: "Are you sure you want to delete this resource? This action cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/resources/delete?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setResources((prev) => prev.filter((r) => r.id !== id));
        toast.success("Resource deleted successfully");
      } else {
        toast.error("Failed to delete resource");
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublished = async (resource: Resource) => {
    const res = await fetch("/api/resources/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: resource.id, published: !resource.published }),
    });
    if (res.ok) {
      setResources((prev) =>
        prev.map((r) => (r.id === resource.id ? { ...r, published: !r.published } : r))
      );
      toast.success(resource.published ? "Resource unpublished" : "Resource published");
    } else {
      toast.error("Failed to update resource");
    }
  };

  const handleToggleFeatured = async (resource: Resource) => {
    const res = await fetch("/api/resources/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: resource.id, featured: !resource.featured }),
    });
    if (res.ok) {
      setResources((prev) =>
        prev.map((r) => (r.id === resource.id ? { ...r, featured: !r.featured } : r))
      );
      toast.success(resource.featured ? "Removed from Featured" : "Added to Featured");
    } else {
      toast.error("Failed to update resource");
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingResource(null);
    fetchResources();
  };

  const allCategories = useMemo(
    () => ["All", ...Array.from(new Set(resources.map((r) => r.category)))],
    [resources]
  );

  const filtered = useMemo(
    () =>
      resources.filter((r) => {
        const matchSearch =
          search === "" ||
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filterCategory === "All" || r.category === filterCategory;
        const matchStatus =
          filterStatus === "all" ||
          (filterStatus === "published" && r.published) ||
          (filterStatus === "draft" && !r.published);
        return matchSearch && matchCategory && matchStatus;
      }),
    [resources, search, filterCategory, filterStatus]
  );

  const publishedCount = useMemo(() => resources.filter((r) => r.published).length, [resources]);
  const draftCount = useMemo(() => resources.filter((r) => !r.published).length, [resources]);

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border-custom">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <FileText className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-text-primary">{resources.length}</p>
            <p className="text-[11px] text-text-muted font-medium">Total Resources</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border-custom">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-success/10">
            <Eye className="h-4.5 w-4.5 text-success" />
          </div>
          <div>
            <p className="text-xl font-bold text-text-primary">{publishedCount}</p>
            <p className="text-[11px] text-text-muted font-medium">Published</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border-custom">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-warning/10">
            <EyeOff className="h-4.5 w-4.5 text-warning" />
          </div>
          <div>
            <p className="text-xl font-bold text-text-primary">{draftCount}</p>
            <p className="text-[11px] text-text-muted font-medium">Drafts</p>
          </div>
        </div>
      </div>

      {/* Sync Status Bar */}
      {syncStatus && (
        <div className="flex items-center justify-between px-4 py-3 mb-6 rounded-xl bg-surface border border-border-custom">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {syncStatus.lastSync?.status === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : syncStatus.lastSync?.status === "error" ? (
                <AlertCircle className="h-4 w-4 text-error" />
              ) : (
                <Cloud className="h-4 w-4 text-text-muted" />
              )}
              <span className="text-sm font-medium text-text-primary">
                Google Drive Sync
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{syncStatus.driveFileCount} files in Drive</span>
              {syncStatus.lastSync && (
                <>
                  <span className="text-border-custom">|</span>
                  <span>
                    Last sync:{" "}
                    {new Date(syncStatus.lastSync.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {syncStatus.lastSync.filesAdded > 0 && (
                    <span className="text-success">+{syncStatus.lastSync.filesAdded} added</span>
                  )}
                  {syncStatus.lastSync.filesUpdated > 0 && (
                    <span className="text-info">{syncStatus.lastSync.filesUpdated} updated</span>
                  )}
                  {syncStatus.lastSync.filesDeleted > 0 && (
                    <span className="text-warning">{syncStatus.lastSync.filesDeleted} unpublished</span>
                  )}
                </>
              )}
              {!syncStatus.lastSync && <span>No syncs yet</span>}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <Cloud className="h-4 w-4 mr-1.5" />
            )}
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg bg-surface border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-border-custom text-sm text-text-primary outline-none focus:border-primary transition-colors"
          >
            {allCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
            className="px-3 py-2 rounded-lg bg-surface border border-border-custom text-sm text-text-primary outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface border border-border-custom rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-text-muted hover:text-text-primary"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-text-muted hover:text-text-primary"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={fetchResources} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={() => { setEditingResource(null); setShowForm(true); }}>
            <Plus className="h-4 w-4 mr-1.5" /> New Resource
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading && resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-text-secondary">Loading resources...</p>
        </div>
      ) : resources.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-4"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-surface">
            <Inbox className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">No Resources Yet</h3>
          <p className="text-sm text-text-secondary text-center max-w-md">
            Create your first resource to share insights and guides with your visitors.
          </p>
          <Button onClick={() => { setEditingResource(null); setShowForm(true); }}>
            <Plus className="h-4 w-4 mr-1.5" /> Create Resource
          </Button>
        </motion.div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Search className="h-8 w-8 text-text-muted" />
          <p className="text-sm text-text-secondary">No resources match your filters</p>
          <button
            onClick={() => { setSearch(""); setFilterCategory("All"); setFilterStatus("all"); }}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((resource, idx) => {
            const colors = categoryColors[resource.category] || categoryColors.General;
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
                className="bg-surface rounded-xl border border-border-custom overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-muted-surface">
                  {resource.imageUrl ? (
                    <>
                      <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-text-muted/20" />
                    </div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
                      {resource.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {resource.featured && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-warning text-white">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      resource.published ? "bg-success text-white" : "bg-text-muted/80 text-white"
                    }`}>
                      {resource.published ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-bold text-text-primary leading-snug line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted mt-auto pt-1">
                    {resource.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {resource.readTime}
                      </span>
                    )}
                    {resource.createdAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(resource.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 py-3 border-t border-border-custom/50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublished(resource)}
                      className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-text-primary transition-colors"
                      title={resource.published ? "Unpublish" : "Publish"}
                    >
                      {resource.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(resource)}
                      className={`p-1.5 rounded-md hover:bg-muted-surface transition-colors ${
                        resource.featured ? "text-warning" : "text-text-muted hover:text-warning"
                      }`}
                      title={resource.featured ? "Remove from Featured" : "Mark as Featured"}
                    >
                      <Star className={`h-3.5 w-3.5 ${resource.featured ? "fill-warning" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleEdit(resource)}
                      className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    {resource.pdfUrl && (
                      <a
                        href={resource.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-secondary transition-colors"
                        title="View PDF"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    disabled={deleting === resource.id}
                    className="p-1.5 rounded-md hover:bg-error/10 text-text-muted hover:text-error transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === resource.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-2">
          {filtered.map((resource, idx) => {
            const colors = categoryColors[resource.category] || categoryColors.General;
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="flex items-center gap-4 px-4 py-3 bg-surface rounded-xl border border-border-custom hover:shadow-sm transition-all group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted-surface shrink-0">
                  {resource.imageUrl ? (
                    <img src={resource.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-text-muted/30" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-text-primary truncate">{resource.title}</h3>
                    {resource.featured && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-warning/10 text-warning shrink-0">
                        Featured
                      </span>
                    )}
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                      resource.published ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {resource.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span className={`px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} font-semibold`}>
                      {resource.category}
                    </span>
                    {resource.readTime && <span>{resource.readTime}</span>}
                    {resource.createdAt && (
                      <span>{new Date(resource.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleTogglePublished(resource)}
                    className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-text-primary transition-colors"
                    title={resource.published ? "Unpublish" : "Publish"}
                  >
                    {resource.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(resource)}
                    className={`p-1.5 rounded-md hover:bg-muted-surface transition-colors ${
                      resource.featured ? "text-warning" : "text-text-muted hover:text-warning"
                    }`}
                    title={resource.featured ? "Remove from Featured" : "Mark as Featured"}
                  >
                    <Star className={`h-3.5 w-3.5 ${resource.featured ? "fill-warning" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleEdit(resource)}
                    className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {resource.pdfUrl && (
                    <a
                      href={resource.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted-surface text-text-muted hover:text-secondary transition-colors"
                      title="View PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(resource.id)}
                    disabled={deleting === resource.id}
                    className="p-1.5 rounded-md hover:bg-error/10 text-text-muted hover:text-error transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === resource.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ResourceForm
            resource={editingResource}
            onClose={() => { setShowForm(false); setEditingResource(null); }}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
