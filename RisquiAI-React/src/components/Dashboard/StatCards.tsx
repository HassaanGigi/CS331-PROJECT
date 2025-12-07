import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

export const StatCards = () => {
  return (
    <>
    <Card
    title="Perfume 1"
    RiskScore='0.9'
    pilltext='2.75%'
    trend='Up'
    period='Week'/>
    <Card
    title="Perfume 2"
    RiskScore='0.89'
    pilltext='3%'
    trend='Up'
    period='Week'/>
    <Card
    title="Perfume 3"
    RiskScore='0.84'
    pilltext='1.75%'
    trend='Up'
    period='Week'/>
    </>
  )
}
const Card = ({
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
  return <div className="p-4 col-span-4 rounded border
  border-stone-300">
    <div className='flex mb-6 items-start 
    justify-between'>
        <div>
        <h3 className='text-stone-500
        mb-2 text-sm'>{title}</h3>
        <p className='text-stone-700 text-3xl 
        font-bold'>{RiskScore}</p>
        </div>
        <span
        className={`
            text-xs flex items-center gap-1 font-medium px-2 py-1 rounded
            ${
            trend === "Up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
        `}
        >
            {trend==="Up" ? <FiTrendingUp /> : <FiTrendingDown />}
            {pilltext}
        </span>
    </div>
    <p className='text-xs text-stone-500'>
        {period}
    </p>
  </div>;
};
