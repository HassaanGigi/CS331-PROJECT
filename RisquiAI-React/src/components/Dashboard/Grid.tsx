import React from 'react'
import { StatCards } from './StatCards';
import { ActivityGraph } from './ActivityGraph';
import { GeoGraph } from './GeoGraph';
import { OtherPerfumes } from './OtherPerfumes';
import { Top5 } from './Top5';

export const Grid = () => {
  return (
    <div className="px-4 grid gap-2 grid-cols-12">

      <section id="risk-assessment" className="col-span-12">
        <StatCards />
      </section>

      <section id="track-products" className="col-span-12">
        <Top5/>
      </section>

      <section id="about-model" className="col-span-12">
        <OtherPerfumes />
      </section>

    </div>
  );
};
