import React from 'react'
import { StatCards } from './StatCards';
import { ActivityGraph } from './ActivityGraph';
import { GeoGraph } from './GeoGraph';
import { OtherPerfumes } from './OtherPerfumes';
import { Top5 } from './Top5';
import BrandPerformance from './BrandPerformance';
import ScoreDistribution from './ScoreDistribution';
import GenderBreakdown from './GenderBreakdown';
import PriceScatter from './PriceScatter';

export const Grid = () => {
  return (
    <div className="px-4 grid gap-2 grid-cols-12">

      <section id="risk-assessment" className="col-span-12">
        <StatCards />
      </section>

      <section id="track-products" className="col-span-12">
        <Top5/>
      </section>
      <section id="gender-breakdown" className="col-span-12">
        <GenderBreakdown />
      </section>

      <section id="price-vs-score" className="col-span-12">
        <PriceScatter />
      </section>

      <section id="score-distribution" className="col-span-12">
        <ScoreDistribution />
      </section>

      <section id="about-model" className="col-span-12">
        <OtherPerfumes />
      </section>

    </div>
  );
};
