import React from 'react'

export const OtherPerfumes = () => {
  return (
    <div className='col-span-12 p-4 rounded border border-stone-300'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='flex items-center gap-1.5 font-medium text-stone-800'>
          Other Perfumes Risk Scores and Trends
        </h3>
        <button className='text-sm text-orange-300 hover:underline'>
          See all
        </button>
      </div>

      <table className='w-full table-auto'>
        <TableHead />

        <tbody>
          <TableRow 
            title="Oud Royale"
            RiskScore="86"
            pilltext="High Risk"
            trend="Up"
            period="Last 7 days"
          />

          <TableRow 
            title="Amber Noir"
            RiskScore="42"
            pilltext="Moderate"
            trend="Down"
            period="Last 24h"
          />

          <TableRow 
            title="Silver Mist"
            RiskScore="25"
            pilltext="Low"
            trend="Down"
            period="Last 30 days"
          />

          <TableRow 
            title="Velvet Smoke"
            RiskScore="67"
            pilltext="Rising"
            trend="Up"
            period="Weekly"
          />

          <TableRow 
            title="Cedar Breeze"
            RiskScore="15"
            pilltext="Very Low"
            trend="Down"
            period="Hourly"
          />
        </tbody>
      </table>
    </div>
  )
}

const TableHead = () => {
  return (
    <thead>
      <tr className='text-sm font-normal text-stone-500'>
        <th className='text-start p-1.5'>Perfume Name</th>
        <th className='text-start p-1.5'>Risk Score</th>
        <th className='text-start p-1.5'>Category</th>
        <th className='text-start p-1.5'>Trend</th>
        <th className='text-start p-1.5'>Period</th>
        <th className='w-8'></th>
      </tr>
    </thead>
  );
}

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
      <td className='p-1.5'>{title}</td>
      <td className='p-1.5 font-semibold'>{RiskScore}</td>

      <td className='p-1.5'>
        <span className='px-2 py-1 rounded text-xs bg-stone-200 text-stone-700'>
          {pilltext}
        </span>
      </td>

      <td className='p-1.5'>
        <span className={`px-2 py-1 rounded text-xs font-medium 
          ${trend === "Up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {trend}
        </span>
      </td>

      <td className='p-1.5 text-stone-500'>{period}</td>

      <td className='p-1.5'>
        <button className='text-xs text-orange-300 hover:underline'>
          View
        </button>
      </td>
    </tr>
  );
}
