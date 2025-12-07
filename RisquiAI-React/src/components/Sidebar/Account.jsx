import React from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Account = () => {
  return (
    <div className='border-b mb-4 mt-2
    pb-4 border-stone-300'>
        <button className='flex p-0.5 
        hover:bg-stone-200 rounded transition-colors
        relative gap-2 w-full items-centre'>
            
            <img 
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
            alt="avatar"
            className='size-8 rounded shrink-0 
            bg-orange-500 shadow'/>

            <div className='text-start'>
                <span className='text-sm
                font-semibold block'>
                    Hassaan Gigi
                </span>
                <span className='text-xs block'>
                    u2023432@giki.edu.pk
                </span>
            </div>

            <FiChevronDown className='absolute
            right-2 top-1/2 translate-y-[calc(-50%+4px)]
            text-xs' />
            <FiChevronUp className='absolute
            right-2 top-1/2 translate-y-[calc(-50%+4px)]
            text-xs' />
        </button>
    </div>
  )
}

export default Account