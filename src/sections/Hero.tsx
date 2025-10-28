"use client";

import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import handwave from "@/assets/images/hand_wave.png";
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import memojiImage from "@/assets/images/memoji-computer.png";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col justify-center items-center text-center py-32 text-white">
      <div className="container flex flex-col items-center gap-8 max-w-3xl mx-auto">
        {/* Profile Image & Availability Badge - No gap */}
        <div className="flex flex-col items-center">
          {/* <Image
            src={memojiImage}
            alt="Memoji at Computer"
            className="w-20 h-20 md:w-40 md:h-40 drop-shadow-xl"
            priority
          /> */}
          <Status
            className="gap-3 rounded-full px-4 py-1 text-sm bg-lime-400/5 border border-white/20 text-white/80 backdrop-blur-md"
            status="online"
            variant="outline"
          >
            <StatusIndicator />
            <span>Available for opportunities</span>
          </Status>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-instrument-serif text font-semibold/70 tracking-tight leading-tight text-white">
          Hey there, I'm Abhishek <Image src={handwave} alt="Hand Wave" className="inline-block w-10 h-10 mb-1 animate-wave-smooth origin-bottom-right" />
        </h1>

        {/* Subtext */}
        <p className="text-white/70 max-w-xl text-base md:text-lg">
         A Frontend Engineer and coffee enthusiast ☕.
I build modern web experiences that feel natural, fast, and delightful.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 bg-white hover:bg-lime-600 text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
            <span>Explore My Work</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-lime-400/10 text-white border border-white/20 hover:bg-lime-600/10 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
          >
            <span>📄</span>
            <span>Resume / CV</span>
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
};







// "use client";

// import Image from "next/image";
// import ArrowDown from "@/assets/icons/arrow-down.svg";
// import handwave from "@/assets/images/hand_wave.png";
// import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
// import memojiImage from "@/assets/images/memoji-computer.png";
// import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

// export const HeroSection = () => {
//   return (
//     <section className="relative w-full flex flex-col justify-center items-center text-center py-32 text-white">
//       <div className="container flex flex-col items-center gap-8 max-w-3xl mx-auto">
//         {/* Profile Image */}
//         <Image
//           src={memojiImage}
//           alt="Memoji at Computer"
//           className="w-20 h-20 md:w-40 md:h-40 drop-shadow-xl "
//           priority
//         />
//         {/* Availability Badge */}
//         <Status
//           className="  gap-3 rounded-full px-4 py-1 text-sm bg-lime-400/5 border border-white/20 text-white/80 backdrop-blur-md"
//           status="online"
//           variant="outline"
//         >
//           <StatusIndicator />
//           <span>Available for opportunities</span>
//         </Status>

//         {/* Headline */}
//         <h1 className="text-4xl md:text-5xl font-instrument-serif text font-semibold/70 tracking-tight leading-tight text-white">
//           Hey there, I’m Abhishek <Image src={handwave} alt="Hand Wave" className="inline-block w-10 h-10 mb-1 animate-wave-smooth origin-bottom-right" />
//         </h1>

//         {/* Subtext */}
//         <p className="text-white/70 max-w-xl  text-base md:text-lg">
//          A Frontend Engineer and coffee enthusiast ☕.
// I build modern web experiences that feel natural, fast, and delightful.
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mt-4">
//           <button className="flex items-center gap-2 bg-lime-400/90 hover:bg-lime-600  text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
//             <span>View My Work</span>
//             <ArrowDown className="w-4 h-4" />
//           </button>

//           <HoverBorderGradient
//             containerClassName="rounded-full"
//             as="button"
//             className="bg-lime-400/10 text-white border border-white/20 hover:bg-lime-600/10 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
//           >
//             <span>📄</span>
//             <span>Resume / CV</span>
//           </HoverBorderGradient>
//         </div>
//       </div>
//     </section>
//   );
// };






















//   "use client";
// import Image from 'next/image';
// import memojiImage from '@/assets/images/memoji-computer.png';
// import Arrowdown from "@/assets/icons/arrow-down.svg";


// export const HeroSection = () => {
//   return (
//     <div className='py-32 '>
//       <div className='container flex flex-col items-center text-center max-w-3xl mx-auto gap-8'>
//         <div className='flex flex-col items-center'>
//         <Image
//           src={memojiImage}
//           alt="Memoji at Computer"
//           className='size-[50px] md:size-[200px] mx-auto mb-6'
//           />
//         <div>
//           <div>
//            {/* dot */}
//         </div>
//           <div>
//          Available for new projects  🚀
//           </div>
//         </div>
//         </div> 
//         <h1>Building Exceptional Digital Experiences</h1>
//         <p>I'm a passionate software engineer specializing in crafting high-quality web applications with beautiful UI and robust performance.</p>
//         <div>
//           <button> <span>View My Work</span>
//           <Arrowdown className="w-4 h-4" />
//           </button>
//           <button> <span>Resume / CV</span>
//           📄
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };












// import Image from "next/image";
// import ArrowDown from "@/assets/icons/arrow-down.svg";
// import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
// import memojiImage from "@/assets/images/memoji-computer.png";
// import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";


// export const HeroSection = () => {
//   return (
//     <section className="relative w-full flex justify-center items-center flex-col text-center py-32 bg-gray-900 text-white">
//       <div className="container flex flex-col items-center gap-8 max-w-3xl mx-auto">
//         {/* Profile Image */}
//         <Image
//           src={memojiImage}
//           alt="Memoji at Computer"
//           className="hero-memoji w-20 h-20 md:w-40 md:h-40 drop-shadow-xl"
//           priority
//         />

//         {/* Availability Badge */}
//         <Status
//           className="gap-3 rounded-full px-4 py-1 text-sm bg-lime-400/5 border border-white/20 text-white/80 backdrop-blur-md"
//           status="online"
//           variant="outline"
//         >
//           <StatusIndicator />
//           <span>Available for new projects</span>
//         </Status>

//         {/* Headline */}
//         <h1 className="text-3xl md:text-5xl font-instrument-serif font-bold text-white tracking-tight leading-tight">
//           Building Exceptional Digital Experiences
//         </h1>

//         {/* Subtext */}
//         <p className="text-white/70 max-w-xl text-base md:text-lg">
//           I'm a passionate software engineer specializing in crafting
//           high-quality web applications with beautiful UI and robust performance.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-4 mt-4">
//           <button className="flex items-center gap-2 bg-lime-400/90 hover:bg-lime-400 text-gray-900 font-semibold px-5 py-2.5 rounded-full transition-all duration-300">
//             <span>View My Work</span>
//             <ArrowDown className="w-4 h-4" />
//           </button>

//           <HoverBorderGradient
//             containerClassName="rounded-full"
//             as="button"
//             className="bg-transparent text-white border border-white/20 hover:bg-white/10 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
//           >
//             <span>📄</span>
//             <span>Resume / CV</span>
//           </HoverBorderGradient>
//         </div>
//       </div>

//       {/* Logo Cloud Section */}
     
//     </section>
//   );
// };




// src/sections/Hero.jsx
// "use client";
// import Image from 'next/image';
// import memojiImage from '@/assets/images/memoji-computer.png';
// import { motion } from "framer-motion";
//import { HeroSection } from '@/sections/Hero';

// export const HeroSection = () => {
//   return (
//     <section className="relative w-full flex justify-center items-center flex-col pt-32 md:pt-36">
//       <motion.div
//         className="container text-center flex flex-col items-center"
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Image
//           src={memojiImage}
//           alt="Memoji at Computer"
//           className="hero-memoji w-56 md:w-72 mb-6"
//           priority
//         />
//         <div className="text-white/80 text-lg font-medium">
//           <span className="text-lime-300 font-semibold">Available</span> for new projects 🚀
//         </div>
//       </motion.div>
//     </section>
//   );
// };
