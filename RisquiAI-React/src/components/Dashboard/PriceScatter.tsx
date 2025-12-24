import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const PriceScatter = () => {
  const [data, setData] = useState<{ price: number; score: number; title: string }[]>([]);

  useEffect(() => {
    Papa.parse('/data/top_seller_perfumes.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        if (!res?.data) return;
        const cleaned = res.data
          .map((r: any) => ({ price: Number(r.price), score: Number(r.final_score) * 10, title: r.title }))
          .filter((r: any) => !isNaN(r.price) && !isNaN(r.score))
          .slice(0, 600);
        setData(cleaned);
      },
      error: (err: any) => console.error('PriceScatter parse error', err),
    });
  }, []);

  return (
    <div className="col-span-12 chart-panel mb-6">
      <h4 className="text-stone-800 font-bold mb-3">Price vs Risk Score</h4>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
            <XAxis type="number" dataKey="price" name="price" tick={{ fontSize: 12 }} />
            <YAxis type="number" dataKey="score" name="score" tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#34d399" />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-stone-500">Loading...</p>
      )}
    </div>
  );
};

export default PriceScatter;
