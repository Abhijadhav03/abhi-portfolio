"use client";
import Image from "next/image";
import noteforge from "@/assets/images/noteforge.png"
import twynkpage from "@/assets/images/twynkimage.jpg";
import foodfire from "@/assets/images/foodfire.png";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainimage from "@/assets/images/grain.jpg";

const portfolioProjects = [
  {
    company: "NOTE FORGE",
    year: "2025",
    title: "NOTE FORGE- Notes App for Devs",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://github.com/Abhijadhav03/noteforge",
    image: noteforge,
  },
  {
    company: "TWYNK",
    year: "2024",
    title: " TWYNK -Blogging Application",
    results: [
      { title: "Mern Stack, tailwind css , daisy ui" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://twynk.onrender.com/",
    image: twynkpage,
  },
  {
    company: " FOOD FIRE",
    year: "2024",
    title: "Food Delivery App",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://react-learning-puce.vercel.app/",
    image: foodfire,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="flex justify-center">
          <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-lime-200 via-lime-400 to-lime-700 bg-clip-text text-transparent">
            CURATED WORK
          </p>
        </div>
        <h2 className="font-instrument-serif text-3xl md:text-5xl lg:text-5xl text-center mt-6">
          Things I’ve Built
        </h2>
        <p className="text-center text-xl md:text-lg lg:text-xl sm:text-sm text-white/60 mt-4 max-width-md mx-auto">
          I bring thoughts to life through interactive digital solutions.
        </p>

        <div className="flex flex-col mt-10 md:mt-20 sm:mt-6 gap-20">
          {portfolioProjects.map((project, index) => (
           <div
  key={project.title}
  className="bg-gray-800 rounded-3xl relative overflow-hidden 
  after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-tr 
  after:from-emerald-800 after:via-gray-700 after:to-gray-900 after:opacity-40 
  hover:after:opacity-60 after:rounded-3xl after:pointer-events-none 
  transition-opacity px-8 pt-8 md:pt-12 md:px-10 "
>
  {/* GRAIN: Behind everything, very low opacity */}
  <div
    className="absolute inset-0 -z-20 opacity-10 pointer-events-none"
    style={{
      backgroundImage: `url(${grainimage.src})`,
      backgroundSize: "cover",
    }}
  />

  {/* CONTENT: Bring above overlays */}
  <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
    {/* TEXT CONTENT */}
    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
      <div className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-700 bg-clip-text text-transparent uppercase text-xs font-semibold tracking-wider gap-2 mb-2 p-2">
        <span>{project.company}</span>
        <span> • </span>
        <span>{project.year}</span>
      </div>

      <h3 className="font-instrument-serif text-3xl font-semibold p-2 md:mt-5 md:text-4xl">
        {project.title}
      </h3>

      <a href={project.link}>View Project</a>

      <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

      <ul className="flex flex-col gap-4 mt-4">
        {project.results.map((result) => (
          <li
            className="flex gap-2 text-sm md:text-base text-white/70"
            key={result.title}
          >
            <CheckCircleIcon className="inline-block size-3 md:size-6 text-lime-400" />
            <span>{result.title}</span>
          </li>
        ))}
      </ul>

      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <button className="bg-white text-gray-950 h-10 w-full md:w-auto px-8 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-4 lg:mb-8 hover:bg-gray-100 transition-colors">
          <span>View Live Project</span>
          <ArrowUpRightIcon className="size-4" />
        </button>
      </a>
    </div>

    {/* IMAGE */}
    <div className={`mt-8 lg:mt-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
      <Image
        src={project.image}
        alt={project.title}
        className="mt-8 -mb-4 w-full h-auto rounded-xl shadow-2xl lg:relative "
      />
    </div>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};  




// "use client";

// import Image from "next/image";
// import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
// import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
// import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
// import { grainimage } from '@/assets/images/grain.jpg';

// const portfolioProjects = [
//   {
//     company: "Acme Corp",
//     year: "2022",
//     title: "Dark Saas Landing Page",
//     results: [
//       { title: "Enhanced user experience by 40%" },
//       { title: "Improved site speed by 50%" },
//       { title: "Increased mobile traffic by 35%" },
//     ],
//     link: "https://youtu.be/4k7IdSLxh6w",
//     image: darkSaasLandingPage,
//   },
//   {
//     company: "Innovative Co",
//     year: "2021",
//     title: "Light Saas Landing Page",
//     results: [
//       { title: "Boosted sales by 20%" },
//       { title: "Expanded customer reach by 35%" },
//       { title: "Increased brand awareness by 15%" },
//     ],
//     link: "https://youtu.be/7hi5zwO75yc",
//     image: lightSaasLandingPage,
//   },
//   {
//     company: "Quantum Dynamics",
//     year: "2023",
//     title: "AI Startup Landing Page",
//     results: [
//       { title: "Enhanced user experience by 40%" },
//       { title: "Improved site speed by 50%" },
//       { title: "Increased mobile traffic by 35%" },
//     ],
//     link: "https://youtu.be/Z7I5uSRHMHg",
//     image: aiStartupLandingPage,
//   },
// ];

// export const ProjectsSection = () => {
//   return (
//     <section className="relative w-full py-10 px-4 sm:px-6 lg:px-8 text-white">
//       <div className="flex flex-col items-center text-center">
//         <h3 className="text-xs sm:text-sm tracking-[0.3em] mt-4 sm:mt-8 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-700 bg-clip-text text-transparent uppercase">
//           CURATED WORK
//         </h3>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-instrument-serif mt-3">
//           Things I’ve Built
//         </h1>
//         <h2 className="text-base sm:text-lg md:text-xl mt-4 text-white/70 max-w-2xl">
//           I bring thoughts to life through interactive digital solutions.
//         </h2>
//       </div>

//       <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
//         {portfolioProjects.map((project, index) => (
//           <div
//             key={index}
//             className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 backdrop-blur-xl hover:bg-gradient-to-tr from-emerald-800 via-gray-700 to-gray-900 p-6 rounded-3xl transition-colors"
//           >
//             <div className="relative w-full h-52 sm:h-56 md:h-60">
//               <Image
//                 src={project.image}
//                 alt={project.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div className="p-5 sm:p-6">
//               <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
//                 {project.title}
//               </h3>
//               <p className="text-sm text-white/60 mb-4">
//                 {project.company} • {project.year}
//               </p>
//               <ul className="space-y-1 mb-5">
//                 {project.results.map((result, idx) => (
//                   <li key={idx} className="text-sm text-white/70">
//                     • {result.title}
//                   </li>
//                 ))}
//               </ul>
//               <a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block text-sm font-medium text-lime-400 hover:text-lime-300 transition-colors"
//               >
//                 View Project →
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
