"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Loader2,
  Star,
  Briefcase,
  BookOpen,
  Plane,
  Shield,
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
  createdAt: string | null;
};

const categoryColors: Record<string, string> = {
  Investment: "bg-secondary/10 text-secondary",
  Travel: "bg-info/10 text-info",
  Finance: "bg-success/10 text-success",
  "Visa Guide": "bg-warning/10 text-warning",
  Insurance: "bg-accent/10 text-accent",
  "Tax Planning": "bg-primary/10 text-primary",
  Retirement: "bg-secondary/10 text-secondary",
  General: "bg-muted-surface text-text-secondary",
};

const categoryIconBg: Record<string, string> = {
  Investment: "bg-secondary/10 text-secondary",
  Travel: "bg-info/10 text-info",
  Finance: "bg-success/10 text-success",
  "Visa Guide": "bg-warning/10 text-warning",
  Insurance: "bg-accent/10 text-accent",
  "Tax Planning": "bg-primary/10 text-primary",
  Retirement: "bg-secondary/10 text-secondary",
  General: "bg-muted-surface text-text-secondary",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const placeholderResources = [
  {
    id: 0,
    title: "Investment Planning Guide",
    description: "A complete guide to plan your investments wisely and build long-term wealth.",
    category: "Investment",
    icon: Briefcase,
    iconBg: "bg-secondary/10 text-secondary",
    pdfUrl: null,
  },
  {
    id: 1,
    title: "Mutual Fund Basics",
    description: "Understand mutual funds, SIPs, and how they help grow your savings.",
    category: "Investment",
    icon: BookOpen,
    iconBg: "bg-success/10 text-success",
    pdfUrl: null,
  },
  {
    id: 2,
    title: "Travel Checklist",
    description: "Your ultimate checklist for a hassle-free and well-planned trip.",
    category: "Travel",
    icon: Plane,
    iconBg: "bg-info/10 text-info",
    pdfUrl: null,
  },
  {
    id: 3,
    title: "Visa Documentation Guide",
    description: "Step-by-step guide to preparing and organizing your visa documents.",
    category: "Visa Guide",
    icon: FileText,
    iconBg: "bg-warning/10 text-warning",
    pdfUrl: null,
  },
  {
    id: 4,
    title: "Retirement Planning Guide",
    description: "Plan your retirement early and secure your financial future with confidence.",
    category: "Retirement",
    icon: Shield,
    iconBg: "bg-accent/10 text-accent",
    pdfUrl: null,
  },
];

export function LatestArticles() {
  const [articles, setArticles] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<Resource[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fetchFeatured = useCallback(async () => {
    setFeaturedLoading(true);
    try {
      const res = await fetch("/api/resources?featured=true");
      if (res.ok) {
        const data = await res.json();
        setFeatured(data);
      }
    } catch {
      // silent
    } finally {
      setFeaturedLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content — Articles */}
        <div className="lg:col-span-8">

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4 bg-surface rounded-2xl border border-border-custom"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-surface">
                  <FileText className="h-8 w-8 text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">No Articles Yet</h3>
                <p className="text-sm text-text-secondary text-center max-w-md">
                  Check back soon — we&apos;re working on creating valuable resources for you.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group bg-surface rounded-xl border border-border-custom overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
                  >
                    {/* Article Image */}
                    <div className="relative h-44 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          width={400}
                          height={200}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted-surface flex items-center justify-center">
                          <FileText className="h-12 w-12 text-text-muted/30" />
                        </div>
                      )}
                      {/* Category Badge */}
                      <span
                        className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          categoryColors[article.category] || categoryColors.General
                        }`}
                      >
                        {article.category}
                      </span>
                    </div>
                    {/* Article Content */}
                    <div className="p-5 flex flex-col gap-2.5 flex-1">
                      <h3 className="text-base font-bold text-text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-text-muted mt-auto">
                        {article.readTime && (
                          <>
                            <span>{article.readTime}</span>
                            <span className="w-1 h-1 rounded-full bg-text-muted" />
                          </>
                        )}
                        <span>
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — Popular Resources */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-warning fill-warning" />
                <h3 className="text-xl font-extrabold text-text-primary tracking-tight">
                  Popular Resources
                </h3>
              </div>
              {featuredLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {(featured.length > 0 ? featured : placeholderResources).map((resource, idx) => {
                    const isPlaceholder = featured.length === 0;
                    const iconBg = isPlaceholder
                      ? (resource as (typeof placeholderResources)[number]).iconBg
                      : categoryIconBg[resource.category] || categoryIconBg.General;
                    const Icon = isPlaceholder
                      ? (resource as (typeof placeholderResources)[number]).icon
                      : FileText;
                    return (
                      <motion.div
                        key={resource.id}
                        custom={idx}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border-custom hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted-surface shrink-0">
                          {!isPlaceholder && (resource as Resource).imageUrl ? (
                            <Image
                              src={(resource as Resource).imageUrl!}
                              alt=""
                              width={44}
                              height={44}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${iconBg}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors line-clamp-1">
                            {resource.title}
                          </h4>
                          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                            {resource.description}
                          </p>
                          {resource.pdfUrl ? (
                            <a
                              href={resource.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-semibold text-secondary mt-1 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="h-3 w-3" /> Download PDF
                            </a>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold text-text-muted mt-1">
                              <Download className="h-3 w-3" /> View Resource
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
  );
}
