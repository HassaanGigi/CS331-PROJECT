import React from 'react'
import { Features } from './Features'
import { Limitations } from './Limitations'
import { MadeWith } from './MadeWith'

export const AboutGrid = () => {
  return (
    <div className='px-4 grid gap-6 grid-cols-12'>
        <MadeWith/>
        <Features/>
        <Limitations/>
    </div>
  )
}
