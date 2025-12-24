import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const BrandPerformance = () => {
  const [data, setData] = useState<{ brand: string; final_score: number }[]>([]);

  useEffect(() => {
    Papa.parse('/data/brand_performance.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        if (!res?.data) return;
        const cleaned = res.data
          .map((r: any) => ({ brand: r.brand, final_score: Number(r.final_score) }))
          .filter((r: any) => r.brand && !isNaN(r.final_score))
          .sort((a: any, b: any) => b.final_score - a.final_score)
          .slice(0, 12);
        setData(cleaned);
      },
      error: (err: any) => console.error('BrandPerformance parse error', err),
    });
  }, []);

  return (
    <div className="col-span-12 chart-panel mb-6">
      <h4 className="text-stone-800 font-bold mb-3">Top Brands Performance</h4>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="horizontal" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
            <XAxis dataKey="brand" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => (v * 10).toFixed(0)} />
            <Tooltip formatter={(v: number) => (v * 10).toFixed(2)} />
            <Bar dataKey="final_score" fill="#f97316" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-stone-500">Loading...</p>
      )}
    </div>
  );
};

export default BrandPerformance;
