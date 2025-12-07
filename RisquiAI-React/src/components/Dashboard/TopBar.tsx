import React from 'react'

const TopBar = () => {
  return (
    <div className='border-b px-4 mb-4 mt-2
    pb-4 border-stone-200'>
        <div className='flex items-center
        justify-between p-0.5'>
            <span className='text-lg font-bold color-black
            block text-stone-800'>Good Morning,<span  className="text-orange-700">Gigi!</span>
              </span>
            <span className='text-xs block
            text-stone-500'>{new Date().toLocaleDateString()}</span>
        </div>
            <span className='text-xs block
            text-stone-500'>RisquiAI Dashboard</span>
    </div>
  )
}

export default TopBar