import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';
const Hero = () => {
  return (
    <section id="hero-section" className='relative w-full min-h-screen'>
    <main className="flex lg:mt-20 flex-col lg:flex-row
    items-center justify-between
    min-h-[calc(90vh-6rem)]">

        <div data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className = "max-w-xl ml-[5%] z-10 mt-20">
            <div className='flex relative w-[95%] sm:w-[20rem]
            h-10 bg-gradient-to-r from-[#656565] to-[#e99b63]
            shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full text-lg font-semibold'>
                <div className='absolute inset-[3px] 
                bg-black rounded-full flex items-center
                justify-center gap-1'>
                    MUHAMMAD HASSAAN CS331
                </div>
            </div>

            <h1 className='text 3xl lg:text-6xl font-semibold tracking-wider my-8'>
            RisquiAI
            </h1>

            <p className='text-base sm:text-lg tracking-wider
            text-grey-400 max-w-[25re,] lg:max-w-[30rem]'>
                web-based AI-powered analytics system that predicts and visualizes the risk level of perfume products in the drop-shipping market
            </p>

            <div className='flex gap-4 mt-12'>
                <a className='border border-[#2a2a2a] py-2 sm:py-3 px-6
                sm:px-5 rounded-full sm:text-lg text-sm font-semibold 
                tracking-wider transition-all duration-300
                hover:bg-[#1a1a1a]' href='#about-section'>
                    About Project
                </a>

                <a className='border border-[#2a2a2a] py-2 sm:py-3 px-6
                sm:px-2 rounded-full sm:text-lg text-sm font-semibold
                tracking-wider transition-all duration-300
                hover:bg-[#1a1a1a] bg-orange-500 text-orange-100 
                hover:text-white' href='#dashboard-section'>
                    Continue To Dashboard
                </a>
            </div>
        </div>

        <Spline  data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"  
        className='absolute lg:top-0 top-[020%]
        bottom-0 lg:left-[25%] sm;lfet-[-2%] h-full z-50' scene="https://prod.spline.design/wvsw1NTD8rjF1rXH/scene.splinecode" />
    </main>
    </section>
  )
}

export default Hero