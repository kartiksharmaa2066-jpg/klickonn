"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/ui/confirm-dialog";
import {
  LogOut,
  Phone,
  User,
  MessageSquare,
  Calendar,
  Trash2,
  RefreshCw,
  Inbox,
  ArrowLeft,
  FolderOpen,
  Globe,
} from "lucide-react";
import { LoginPage } from "./LoginPage";
import { ResourcesManager } from "./ResourcesManager";
import { SourcesManager } from "./SourcesManager";

type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string | null;
};

type Tab = "submissions" | "resources" | "sources";

export default function AdminPage() {
  const { confirm } = useConfirm();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchSubmissions();
  }, [authenticated, fetchSubmissions]);

  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "Delete Submission",
      message: "Are you sure you want to delete this submission? This action cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
    });
    if (!ok) return;

    const res = await fetch(`/api/submissions/delete?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast.success("Submission deleted successfully");
    } else {
      toast.error("Failed to delete submission");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setSubmissions([]);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
            <div className="w-px h-6 bg-border-custom" />
            <h1 className="text-lg font-extrabold text-text-primary">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 bg-muted-surface/60 rounded-xl p-1 w-fit border border-border-custom">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "submissions"
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Submissions
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
              {submissions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "resources"
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <FolderOpen className="h-4 w-4" />
            Resources
          </button>
          <button
            onClick={() => setActiveTab("sources")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "sources"
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Globe className="h-4 w-4" />
            Sources
          </button>
        </div>

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-text-primary">Submissions</h2>
                <span className="text-xs text-text-muted bg-muted-surface px-2 py-0.5 rounded-md">
                  {submissions.length} total
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {loading && submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-text-secondary">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-surface">
                  <Inbox className="h-8 w-8 text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">No Submissions Yet</h3>
                <p className="text-sm text-text-secondary text-center max-w-md">
                  Contact form submissions will appear here once visitors start sending messages.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {submissions.map((submission, idx) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="bg-surface rounded-xl border border-border-custom p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text-primary">{submission.name}</h3>
                          <p className="text-xs text-text-muted">{submission.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="p-1.5 rounded-lg hover:bg-error/10 text-text-muted hover:text-error transition-colors"
                        title="Delete submission"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2.5 mb-4">
                      {submission.phone && (
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <Phone className="h-3.5 w-3.5 text-text-muted shrink-0" />
                          {submission.phone}
                        </div>
                      )}
                      {submission.subject && (
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <MessageSquare className="h-3.5 w-3.5 text-text-muted shrink-0" />
                          <span className="capitalize">{submission.subject}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Calendar className="h-3.5 w-3.5 text-text-muted shrink-0" />
                        {submission.createdAt
                          ? new Date(submission.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted-surface/50 border border-border-custom/50">
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-4">
                        {submission.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && <ResourcesManager />}

        {/* Sources Tab */}
        {activeTab === "sources" && <SourcesManager />}
      </main>
    </div>
  );
}
