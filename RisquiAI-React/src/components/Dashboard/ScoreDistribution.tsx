import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ScoreDistribution = () => {
  const [bins, setBins] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    Papa.parse('/data/scored_perfumes.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        if (!res?.data) return;
        const scores = res.data
          .map((r: any) => Number(r.final_score))
          .filter((v: any) => !isNaN(v));

        const bucketCount = 10;
        const counts = Array(bucketCount).fill(0);
        scores.forEach((s: number) => {
          let idx = Math.floor(s * bucketCount);
          if (idx === bucketCount) idx = bucketCount - 1;
          counts[idx] += 1;
        });

        const out = counts.map((c, i) => ({ name: `${i}-${i + 1}`, count: c }));
        setBins(out);
      },
      error: (err: any) => console.error('ScoreDistribution parse error', err),
    });
  }, []);

  return (
    <div className="col-span-12 chart-panel mb-6">
      <h4 className="text-stone-800 font-bold mb-3">Score Distribution</h4>
      {bins.length > 0 ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bins} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#60a5fa" radius={[6,6,6,6]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-stone-500">Loading...</p>
      )}
    </div>
  );
};

export default ScoreDistribution;
