import { HeroSection } from '@/sections/Hero';
import { Header } from './../sections/Header';
import { Footer } from '@/sections/Footer';
// import OnekoCat from '@/components/onekocat';
// import CatToggle from '@/components/CatToggle';
export default function Home() {
  return (
   <div className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800">
      <Header />
      
      
      {/* Main content */}
      <HeroSection />

      {/* Footer Section */}
      <Footer />
     {/* <CatToggle /> */}
     {/* <OnekoCat/> */}
    </div>

  );
}
