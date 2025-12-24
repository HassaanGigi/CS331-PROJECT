import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FiBarChart2 } from "react-icons/fi";

interface PerfumeData {
  title: string;
  gender: string;
  final_score: string;
}

export const Top5 = () => {
  const [menData, setMenData] = useState<{ name: string; score: number }[]>([]);
  const [womenData, setWomenData] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    Papa.parse("/data/top_seller_perfumes.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        if (!results?.data) return;

        const cleaned: PerfumeData[] = results.data.filter(
          (row: any) =>
            row.title &&
            row.gender &&
            row.final_score &&
            !isNaN(Number(row.final_score))
        );

        const menTop5 = cleaned
          .filter((row) => row.gender.toLowerCase() === "men")
          .sort((a, b) => Number(b.final_score) - Number(a.final_score))
          .slice(0, 5)
          .map((row) => ({ name: row.title, score: Number(row.final_score) * 10 }));

        const womenTop5 = cleaned
          .filter((row) => row.gender.toLowerCase() === "women")
          .sort((a, b) => Number(b.final_score) - Number(a.final_score))
          .slice(0, 5)
          .map((row) => ({ name: row.title, score: Number(row.final_score) * 10 }));

        setMenData(menTop5);
        setWomenData(womenTop5);
      },
      error: (err: any) => console.error("CSV parse error:", err),
    });
  }, []);

  const renderChart = (data: { name: string; score: number }[], label: string) => (
    <div className="w-full p-6 rounded border border-stone-900 mb-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center mb-4 gap-2 font-bold text-stone-800 justify-center">
          <FiBarChart2 /> {label}
        </div>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 150, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
              <XAxis type="number" domain={[0, 10]} />
              <XAxis
                type="number"
                domain={[0, "dataMax"]}
                tick={{ fill: "#475569", fontSize: 12 }}
                tickFormatter={(v) => (typeof v === "number" ? v.toFixed(0) : v)}
              />
              <YAxis dataKey="name" type="category" width={220} />
              <YAxis
                dataKey="name"
                type="category"
                width={220}
                tick={{ fill: "#0f172a", fontSize: 13 }}
              />
              <Tooltip formatter={(value: number) => value.toFixed(2)} />
              <Legend />
              <Bar
                dataKey="score"
                fill={label.toLowerCase().includes("men") ? "#0ea5e9" : "#fb7185"}
                radius={[8, 8, 8, 8]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-stone-500 text-center">Loading data...</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="col-span-12 space-y-8">
      {renderChart(menData, "Top 5 Men Perfumes")}
      {renderChart(womenData, "Top 5 Women Perfumes")}
    </div>
  );
};
