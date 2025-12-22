// Select.tsx
import React, { useState } from "react";

const Select = () => {
  const [selectedTab, setSelectedTab] = useState("Risk Assessment");

  const scrollToSection = (id: string, tabName: string) => {
    setSelectedTab(tabName);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="space-y-1">
      <Route
        selected={selectedTab === "Risk Assessment"}
        title="Top Risk Scores"
        onClick={() => scrollToSection("risk-assessment", "Risk Assessment")}
      />

      <Route
        selected={selectedTab === "Track Products"}
        title="Gender Based Scores"
        onClick={() => scrollToSection("track-products", "Track Products")}
      />

      <Route
        selected={selectedTab === "Categories"}
        title="Categories"
        onClick={() => scrollToSection("categories", "Categories")}
      />

      <Route
        selected={selectedTab === "About Model"}
        title="Complete Table"
        onClick={() => scrollToSection("about-model", "About Model")}
      />
    </div>
  );
};

interface RouteProps {
  selected: boolean;
  title: string;
  onClick: () => void;
}

const Route: React.FC<RouteProps> = ({ selected, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-start gap-2 w-full rounded px-2 py-1.5
        text-sm transition-[box-shadow,background-color,color]
        ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }
      `}
    >
      <span>{title}</span>
    </button>
  );
};

export default Select;
