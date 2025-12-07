import React from 'react';
import TopBar from './TopBar';
import { Grid } from './Grid';

const Dashboard = () => {
  return (
    <section
      id="dashboard-section"
      className="w-full min-h-screen opacity-0.2"
    >
      <div
        className=" bg-white/95 rounded-lg pb-4 
        shadow"
      >
        <TopBar/>
        <Grid/>

      </div>
    </section>
  )
}

export default Dashboard
