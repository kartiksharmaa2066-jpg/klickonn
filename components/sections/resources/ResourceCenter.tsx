"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Globe } from "lucide-react";
import { LatestArticles } from "./LatestArticles";
import { OfficialUpdates } from "./OfficialUpdates";

type Tab = "guides" | "updates";

const tabs = [
  { id: "guides" as Tab, label: "Our Guides", icon: BookOpen },
  { id: "updates" as Tab, label: "Official Updates", icon: Globe },
];

export function ResourceCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("guides");

  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
            Resource Center
          </h2>

          {/* Tab Switcher */}
          <div className="flex items-center bg-surface border border-border-custom rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="resource-tab-bg"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "guides" ? (
            <motion.div
              key="guides"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <LatestArticles />
            </motion.div>
          ) : (
            <motion.div
              key="updates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OfficialUpdates />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
