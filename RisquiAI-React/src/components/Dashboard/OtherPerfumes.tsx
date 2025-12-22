import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface BrandData {
  brand: string;
  final_score: number;
}

export const OtherPerfumes = () => {
  const [brands, setBrands] = useState<BrandData[]>([]);

  useEffect(() => {
    Papa.parse("/data/top_seller_perfumes.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        if (!results?.data) return;

        // Filter valid rows and map to typed BrandData
        const cleaned: BrandData[] = results.data
          .filter(
            (row: any) =>
              row.brand &&
              row.final_score &&
              !isNaN(Number(row.final_score))
          )
          .map((row: any) => ({
            brand: row.brand,
            final_score: Number(row.final_score),
          }));

        // Pick highest final_score per brand
        const brandMap: Record<string, number> = {};
        cleaned.forEach((item: BrandData) => {
          if (!brandMap[item.brand] || item.final_score > brandMap[item.brand]) {
            brandMap[item.brand] = item.final_score;
          }
        });

        // Convert to array and sort top 10 brands
        const brandArray: BrandData[] = Object.entries(brandMap)
          .map(([brand, final_score]) => ({ brand, final_score }))
          .sort((a, b) => b.final_score - a.final_score)
          .slice(0, 10);

        setBrands(brandArray);
      },
      error: (err: any) => console.error("CSV parse error:", err),
    });
  }, []);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-800">
          Top Brands Risk Scores
        </h3>
        <button className="text-sm text-orange-300 hover:underline">
          See all
        </button>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {brands.map((brand, idx) => (
            <TableRow
              key={idx}
              title={brand.brand}
              RiskScore={(brand.final_score * 10).toFixed(0)}
              pilltext="Top Brand"
              trend="Up"
              period="This Week"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Brand</th>
        <th className="text-start p-1.5">Risk Score</th>
        <th className="text-start p-1.5">Category</th>
        <th className="text-start p-1.5">Trend</th>
        <th className="text-start p-1.5">Period</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  title,
  RiskScore,
  pilltext,
  trend,
  period,
}: {
  title: string;
  RiskScore: string;
  pilltext: string;
  trend: "Up" | "Down";
  period: string;
}) => {
  return (
    <tr className="border-t border-stone-300 text-sm text-stone-500">
      <td className="p-1.5">{title}</td>
      <td className="p-1.5 font-semibold">{RiskScore}</td>
      <td className="p-1.5">
        <span className="px-2 py-1 rounded text-xs bg-stone-200 text-stone-700">
          {pilltext}
        </span>
      </td>
      <td className="p-1.5">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            trend === "Up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {trend}
        </span>
      </td>
      <td className="p-1.5 text-stone-500">{period}</td>
      <td className="p-1.5">
        <button className="text-xs text-orange-300 hover:underline">View</button>
      </td>
    </tr>
  );
};
