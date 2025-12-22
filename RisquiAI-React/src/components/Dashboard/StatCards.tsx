import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface Perfume {
  title: string;
  final_score: string;
}

export const StatCards = () => {
  const [topPerfumes, setTopPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    Papa.parse("/data/top_seller_perfumes.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        console.log("PapaParse results:", results);

        // Trim header keys and values to be safe
        const cleaned = results.data
          .map((row: any) => {
            const newRow: any = {};
            Object.keys(row).forEach((k) => {
              newRow[k.trim()] = typeof row[k] === "string" ? row[k].trim() : row[k];
            });
            return newRow;
          })
          .filter(
            (row: any) =>
              row.title && row.final_score && !isNaN(Number(row.final_score))
          )
          .sort((a: any, b: any) => Number(b.final_score) - Number(a.final_score))
          .slice(0, 3); // Top 3 only

        console.log("Top 3 perfumes:", cleaned);
        setTopPerfumes(cleaned);
      },
      error: (parseError: any) => {
        console.error("PapaParse failed:", parseError);
      },
    });
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      {topPerfumes.map((perfume, idx) => (
        <Card
          key={idx}
          title={perfume.title}
          RiskScore={(Number(perfume.final_score) * 10).toFixed(2)}
          pilltext="Top Perfume"
          trend="Up"
        />
      ))}
    </div>
  );
};
const Card = ({
  title,
  RiskScore,
  pilltext,
  trend,
}: {
  title: string;
  RiskScore: string;
  pilltext: string;
  trend: "Up" | "Down";
}) => {
  return (
    <div className="p-4 col-span-4 rounded border border-stone-300 relative">
      {/* Top-right pill */}
      <span
        className={`absolute top-4 right-4 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
          trend === "Up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {trend === "Up" ? <FiTrendingUp /> : <FiTrendingDown />}
        {pilltext}
      </span>

      <div className="flex flex-col items-start">
        {/* RiskScore on top */}
        <p className="text-stone-700 text-3xl font-bold mb-2">{RiskScore}</p>
        {/* Title below */}
        <h3 className="text-stone-500 text-sm font-medium break-words">{title}</h3>
      </div>
    </div>
  );
};
