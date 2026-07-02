"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/ui/confirm-dialog";
import {
  Plus,
  Trash2,
  RefreshCw,
  Globe,
  Rss,
  ToggleLeft,
  ToggleRight,
  Loader2,
  ExternalLink,
  Clock,
} from "lucide-react";

type Source = {
  id: number;
  name: string;
  url: string;
  type: string;
  category: string;
  enabled: boolean;
  lastFetchedAt: string | null;
  createdAt: string | null;
};

const categoryOptions = [
  "Investment",
  "Travel",
  "Finance",
  "Insurance",
  "Tax Planning",
  "General",
];

export function SourcesManager() {
  const { confirm } = useConfirm();
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshingUpdates, setRefreshingUpdates] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    type: "rss",
    category: "General",
  });
  const [saving, setSaving] = useState(false);

  const fetchSources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources/sources");
      if (res.ok) {
        const data = await res.json();
        setSources(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const handleAdd = async () => {
    if (!form.name || !form.url) {
      toast.error("Name and URL are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/resources/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Source added");
        setShowForm(false);
        setForm({ name: "", url: "", type: "rss", category: "General" });
        fetchSources();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add source");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (source: Source) => {
    const res = await fetch("/api/resources/sources", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: source.id, enabled: !source.enabled }),
    });
    if (res.ok) {
      setSources((prev) =>
        prev.map((s) =>
          s.id === source.id ? { ...s, enabled: !s.enabled } : s
        )
      );
      toast.success(source.enabled ? "Source disabled" : "Source enabled");
    }
  };

  const handleDelete = async (source: Source) => {
    const ok = await confirm({
      title: "Delete Source",
      message: `Delete "${source.name}"? This will not remove already-fetched updates.`,
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    const res = await fetch(`/api/resources/sources?id=${source.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSources((prev) => prev.filter((s) => s.id !== source.id));
      toast.success("Source deleted");
    }
  };

  const handleRefreshUpdates = async () => {
    setRefreshingUpdates(true);
    try {
      const res = await fetch("/api/resources/official-updates", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `Refresh complete: ${data.added} new, ${data.skipped} skipped`
        );
        fetchSources();
      } else {
        toast.error(data.error || "Refresh failed");
      }
    } finally {
      setRefreshingUpdates(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-text-primary">
            Official Sources
          </h2>
          <span className="text-xs text-text-muted bg-muted-surface px-2 py-0.5 rounded-md">
            {sources.length} total
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshUpdates}
            disabled={refreshingUpdates}
          >
            {refreshingUpdates ? (
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1.5" />
            )}
            Fetch Updates
          </Button>
          <Button variant="outline" size="sm" onClick={fetchSources} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-1.5" /> Add Source
          </Button>
        </div>
      </div>

      {/* Add Source Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 bg-surface rounded-xl border border-border-custom"
        >
          <h3 className="text-sm font-bold text-text-primary mb-4">
            Add New Source
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. SEBI Updates"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                RSS Feed URL
              </label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://example.com/feed.xml"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border-custom text-sm text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border-custom text-sm text-text-primary outline-none focus:border-primary"
              >
                <option value="rss">RSS Feed</option>
                <option value="api">API</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border-custom text-sm text-text-primary outline-none focus:border-primary"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button size="sm" onClick={handleAdd} disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-1.5" />
              )}
              Add Source
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Sources List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
      ) : sources.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-4"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-surface">
            <Globe className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            No Sources Configured
          </h3>
          <p className="text-sm text-text-secondary text-center max-w-md">
            Add official RSS feeds or API sources to automatically fetch updates
            from regulatory bodies and government agencies.
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1.5" /> Add First Source
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source, idx) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.35 }}
              className={`bg-surface rounded-xl border p-5 shadow-sm hover:shadow-md transition-all ${
                source.enabled
                  ? "border-border-custom"
                  : "border-border-custom opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                      source.type === "rss"
                        ? "bg-warning/10 text-warning"
                        : "bg-info/10 text-info"
                    }`}
                  >
                    {source.type === "rss" ? (
                      <Rss className="h-4 w-4" />
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">
                      {source.name}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase text-text-muted">
                      {source.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(source)}
                  className="text-text-muted hover:text-primary transition-colors"
                  title={source.enabled ? "Disable" : "Enable"}
                >
                  {source.enabled ? (
                    <ToggleRight className="h-5 w-5 text-success" />
                  ) : (
                    <ToggleLeft className="h-5 w-5" />
                  )}
                </button>
              </div>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-text-muted hover:text-secondary transition-colors mb-3 break-all"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="truncate">{source.url}</span>
              </a>

              <div className="flex items-center justify-between pt-3 border-t border-border-custom/50">
                <div className="flex items-center gap-1 text-[11px] text-text-muted">
                  <Clock className="h-3 w-3" />
                  {source.lastFetchedAt
                    ? `Fetched ${new Date(source.lastFetchedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
                    : "Never fetched"}
                </div>
                <button
                  onClick={() => handleDelete(source)}
                  className="p-1.5 rounded-md hover:bg-error/10 text-text-muted hover:text-error transition-colors"
                  title="Delete source"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
