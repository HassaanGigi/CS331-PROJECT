import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between 
    items-center py-4 px-4 lg:px-20">
        
        <h1 data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="text 3xl md:text-4xl
        lg:text-5x1 font-light m-0">
            RisquiAI
        </h1>

        {/*Navigation*/}
        <nav className='hidden md:flex items-center
        gap-12'>
            <a data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"className='text-base tracking-wider
            transition-color hover:text-gray-300
            z-50' href="#hero-section">
                Home
            </a>

            <a data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" className='text-base tracking-wider
            transition-color hover:text-gray-300
            z-50' href="#dashboard-section">
                Dashboard
            </a>

            <a data-aos="fade-down"
            ata-aos-easing="linear"
            data-aos-duration="1500" className='text-base tracking-wider
            transition-color hover:text-gray-300
            z-50' href="#about-section">
                About
            </a>
        </nav>
    </header>
  )
}

export default Header