import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#60a5fa', '#fb7185', '#fbbf24', '#34d399', '#a78bfa', '#f97316'];

export const GenderBreakdown = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    Papa.parse('/data/top_seller_perfumes.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        if (!res?.data) return;
        const counts: Record<string, number> = {};
        res.data.forEach((r: any) => {
          const g = (r.gender || 'unknown').toString().toLowerCase();
          counts[g] = (counts[g] || 0) + 1;
        });
        const out = Object.entries(counts).map(([k, v]) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), value: v }));
        setData(out);
      },
      error: (err: any) => console.error('GenderBreakdown parse error', err),
    });
  }, []);

  return (
    <div className="col-span-12 chart-panel mb-6">
      <h4 className="text-stone-800 font-bold mb-3">Gender Breakdown</h4>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-stone-500">Loading...</p>
      )}
    </div>
  );
};

export default GenderBreakdown;
