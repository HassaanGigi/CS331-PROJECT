import React from 'react'
import { StatCards } from './StatCards';
import { ActivityGraph } from './ActivityGraph';
import { GeoGraph } from './GeoGraph';
import { OtherPerfumes } from './OtherPerfumes';
export const Grid = () => {
  return (
    <div
    className='px-4 grid gap-2 grid-cols-12
    '>
      <StatCards/>
    <ActivityGraph/>
    <GeoGraph/>
    <OtherPerfumes/>
    </div>
    
  )
}
