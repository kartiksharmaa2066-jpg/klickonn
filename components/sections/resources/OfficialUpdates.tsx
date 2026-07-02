"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Loader2,
  Globe,
  Calendar,
  Building2,
} from "lucide-react";

type OfficialUpdate = {
  id: number;
  sourceId: number;
  title: string;
  summary: string | null;
  sourceUrl: string;
  publishedAt: string | null;
  category: string;
  createdAt: string | null;
};

const categoryColors: Record<string, string> = {
  Investment: "bg-secondary/10 text-secondary",
  Travel: "bg-info/10 text-info",
  Finance: "bg-success/10 text-success",
  Insurance: "bg-accent/10 text-accent",
  "Tax Planning": "bg-primary/10 text-primary",
  General: "bg-muted-surface text-text-secondary",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

export function OfficialUpdates() {
  const [updates, setUpdates] = useState<OfficialUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  const fetchUpdates = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const url =
        category !== "All"
          ? `/api/resources/official-updates?category=${encodeURIComponent(category)}`
          : "/api/resources/official-updates";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setUpdates(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpdates(filterCategory);
  }, [filterCategory, fetchUpdates]);

  const allCategories = [
    "All",
    ...Array.from(new Set(updates.map((u) => u.category))),
  ];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getSourceDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterCategory === cat
                ? "bg-primary text-white"
                : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Updates Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
      ) : updates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-4 bg-surface rounded-2xl border border-border-custom"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-surface">
            <Globe className="h-8 w-8 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            No Official Updates Yet
          </h3>
          <p className="text-sm text-text-secondary text-center max-w-md">
            Official updates from regulatory bodies and government sources will
            appear here once configured in the admin dashboard.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {updates.map((update, idx) => (
            <motion.div
              key={update.id}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-surface rounded-xl border border-border-custom overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Source & Category */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      categoryColors[update.category] || categoryColors.General
                    }`}
                  >
                    {update.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Building2 className="h-3 w-3" />
                    {getSourceDomain(update.sourceUrl)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-3">
                  {update.title}
                </h3>

                {/* Summary */}
                {update.summary && (
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {update.summary}
                  </p>
                )}

                {/* Date */}
                {update.publishedAt && (
                  <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-auto">
                    <Calendar className="h-3 w-3" />
                    {formatDate(update.publishedAt)}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="px-5 py-3 border-t border-border-custom/50">
                <a
                  href={update.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors"
                >
                  View on Official Site
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
