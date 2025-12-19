// Select.tsx
import React from "react";

interface SelectProps {
  selectedTab: string;
  onTabClick: (tab: string) => void;
}

const Select: React.FC<SelectProps> = ({ selectedTab, onTabClick }) => {
  return (
    <div className="space-y-1">
      <Route
        selected={selectedTab === "Risk Assessment"}
        title="Risk Assessment"
        onClick={() => onTabClick("Risk Assessment")}
      />
      <Route
        selected={selectedTab === "Track Products"}
        title="Track Products"
        onClick={() => onTabClick("Track Products")}
      />
      <Route
        selected={selectedTab === "Categories"}
        title="Categories"
        onClick={() => onTabClick("Categories")}
      />
      <Route
        selected={selectedTab === "About Model"}
        title="About Model"
        onClick={() => onTabClick("About Model")}
      />
    </div>
  );
};

interface RouteProps {
  selected: boolean;
  title: string;
  onClick: () => void;
}

// Route is internal to this file, no need to export
const Route: React.FC<RouteProps> = ({ selected, title, onClick }) => {
  return (
    <button
      className={`
        flex items-center justify-start gap-2 w-full rounded px-2 py-1.5
        text-sm transition-[box-shadow,background-color,color]
        ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }
      `}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default Select;
