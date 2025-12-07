import React from 'react'
import { FiCommand, FiSearch } from 'react-icons/fi';
import { useEffect,useState } from 'react'
import {CommandMenu} from "./CmdK";
export const Search = () => {
  const [open, setOpen] = useState(false)
  return (<>
    
  <div className='bg-orange-500/50 border border-orange-500/40 
rounded-xl flex items-center px-3 py-2 text-sm mb-4
backdrop-blur-md shadow-sm transition-all duration-200'>
    <FiSearch className='mr-2'/>
    <input 
    onFocus={(e) => {
        e.target.blur();
        setOpen(true);
    }}
    type="text"
    placeholder='Search'
    className='w-full bg-transparent
    placeholder:text-stone-400
    focus:outline-none'/>

    <span className='p-1 text-xs flex gap-0.5 items-centre
    shadow bg-stone-50 rounded absolute right-1.5 top-1/2
    -translate-y-1/2'>
     <FiCommand />K
    </span>
  </div>

  <CommandMenu open={open} setOpen={setOpen} />
  </> );
};
