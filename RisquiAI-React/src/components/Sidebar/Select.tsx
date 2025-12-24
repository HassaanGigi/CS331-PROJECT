// Select.tsx
import React, { useState } from "react";

type TabKey =
  | "Top Risk Scores"
  | "Top Products"
  | "Gender Breakdown"
  | "Price vs Score"
  | "Score Distribution"
  | "Brand Performance";

const Select: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("Top Risk Scores");

  const scrollToSection = (id: string, tabName: TabKey) => {
    setSelectedTab(tabName);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-1">
      <Route
        selected={selectedTab === "Top Risk Scores"}
        title="Top Risk Scores"
        onClick={() => scrollToSection("risk-assessment", "Top Risk Scores")}
      />

      <Route
        selected={selectedTab === "Top Products"}
        title="Top Products"
        onClick={() => scrollToSection("track-products", "Top Products")}
      />

      <Route
        selected={selectedTab === "Gender Breakdown"}
        title="Gender Breakdown"
        onClick={() => scrollToSection("gender-breakdown", "Gender Breakdown")}
      />

      <Route
        selected={selectedTab === "Price vs Score"}
        title="Price vs Score"
        onClick={() => scrollToSection("price-vs-score", "Price vs Score")}
      />

      <Route
        selected={selectedTab === "Score Distribution"}
        title="Score Distribution"
        onClick={() => scrollToSection("score-distribution", "Score Distribution")}
      />

      <Route
        selected={selectedTab === "Brand Performance"}
        title="Brand Performance"
        onClick={() => scrollToSection("brand-performance", "Brand Performance")}
      />
    </div>
  );
};

interface RouteProps {
  selected: boolean;
  title: TabKey;
  onClick: () => void;
}

const Route: React.FC<RouteProps> = ({ selected, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      role="button"
      aria-pressed={selected}
      className={`flex items-center justify-start gap-2 w-full rounded px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${
        selected
          ? "bg-white text-stone-900 shadow"
          : "hover:bg-stone-100 bg-transparent text-stone-600"
      }`}
    >
      <span className="truncate">{title}</span>
    </button>
  );
};

export default Select;
