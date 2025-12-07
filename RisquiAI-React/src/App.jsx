import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard/Dashboard";
import SideBar from "./components/Sidebar/SideBar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
    AOS.init({ duration: 1500, once: true });

    const hero = document.getElementById("hero-section");
    const dashboard = document.getElementById("dashboard-section");
    const about = document.getElementById("about-section");

    // 1) When HERO exits → scroll to Dashboard
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          dashboard?.scrollIntoView({ behavior: "smooth" });
        }
      },
      { threshold: 0.1 }
    );

    // 2) When DASHBOARD exits downward → scroll to About
    const dashObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Only trigger when scrolling down, not up
          about?.scrollIntoView({ behavior: "smooth" });
        }
      },
      { threshold: 0.1 }
    );

    if (hero) heroObserver.observe(hero);
    if (dashboard) dashObserver.observe(dashboard);

    return () => {
      heroObserver.disconnect();
      dashObserver.disconnect();
    };
  }, []);

  
  return (
    <main className="relative w-full min-h-screen overflow-x-auto bg-black">
      {/*Gradient image */}
      <img className="absolute top-0 right-0 
      opacity-60 -z-0" src="/gradient.png" 
      alt="Gradient-img"/>

      {/* Blur */}
      <div
        className="absolute top-[18%] right-[-20%] w-[80rem] h-0 
                  shadow-[0_0_900px_20px_#e99b63] 
                  -rotate-[40deg] z-0"
      />

      <Header/>
      <Hero/>
   <div className="w-full flex justify-center">
          <div className="flex w-full max-w-7xl gap-6 px-6 py-10"
           data-aos="fade-up">
            <SideBar />
            <Dashboard className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-full" />
          </div>
        </div>
    </main>
  )   
}
