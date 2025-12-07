import React from 'react'
import Account from './Account';
import { Search } from './Search';
import Select from './Select';

const SideBar = () => {
  return (
    <section id="dashboard-sidebar">
    <div>
        <div className='w-64 min-w-64
        overflow-y-scroll 
        sticky top-4 h-[calc(100vh-1-32px)]
        '>
          <Account/>
          <Search/>
          <Select/>
        </div>
    </div>
    </section>
  )
}

export default SideBar