"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const containerStyles = "fixed left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:w-[82%] max-w-2xl bg-white/10 backdrop-blur-lg";

  return (
    <>
      <header
        className={`${containerStyles} top-4 z-50 flex justify-between items-center px-4 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500 ${
          menuOpen ? 'rounded-t-full border-x border-t border-white/20' : 'rounded-full border border-white/20'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo.src} alt="Company Logo" className="w-10 h-10 hover:scale-105 transition-transform duration-300" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2.5 items-center">
          <a href="#" className="nav-item text-base">Home</a>
          <a href="#" className="nav-item text-base">Projects</a>
          <a href="#" className="nav-item text-base">About</a>
          <a href="#" className="nav-item text-base">Blog</a>
          <a
            href="#"
            className="nav-item bg-white text-gray-900 hover:bg-white/20 hover:text-lime-300 text-base font-semibold"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="text-gray-400 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`${containerStyles} top-[4.75rem] z-40 rounded-b-2xl border-x border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] md:hidden animate-in fade-in duration-200`}
        >
          <div className="flex flex-col items-center gap-3 py-4 px-4">
            <a href="#" className="nav-item text-lg text-lime-200 w-full text-center" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#" className="nav-item text-lg w-full text-lime-200 text-center" onClick={() => setMenuOpen(false)}>
              Projects
            </a>
            <a href="#" className="nav-item text-lg text-lime-200 w-full text-center" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#" className="nav-item text-lg text-lime-200 w-full text-center" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
            <a
              href="#"
              className="nav-item bg-white text-gray-900 hover:bg-white/20 hover:text-lime-300 text-lg font-semibold w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

// "use client";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import Logo from "@/assets/images/logo.svg";
// import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
// import logo from "@/assets/images/logo.png";
// import SettingsPanel from "@/components/SettingsPanel";

// export const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header
//       className="fixed top-4 left-1/2 -translate-x-1/2 w-[82%] max-w-2xl z-50
//                  flex justify-between items-center px-4 py-2.5
//                  rounded-full border border-white/20
//                  bg-white/10 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)]
//                  transition-all duration-500"
//     >
//       {/* Logo */}
//       <a href="#" className="flex items-center">
//         <img src={logo.src} alt="Logo" className="w-10 h-10 hover:scale-105 transition-transform duration-300" />
//         {/* <img src="https://i.pinimg.com/736x/1a/79/db/1a79db0b4470f1b7c7295a38573852d1.jpg" alt="Logo" className="w-10 h-10 hover:scale-105 transition-transform duration-300" /> */}
//         {/* <Logo className="w-10 h-10 hover:scale-105 transition-transform duration-300" /> */}
//       </a>

//       {/* Desktop Nav */}
//       <nav className="hidden md:flex gap-2.5 items-center">
        
//         <a href="#" className="nav-item text-base">Home</a>
//         <a href="#" className="nav-item text-base">Projects</a>
//         <a href="#" className="nav-item text-base">About</a>
//         <a href="#" className="nav-item text-base">Blog</a>
//         <a
//           href="#"
//           className="nav-item bg-white text-gray-900 hover:bg-white/20 hover:text-lime-300 text-base font-semibold"
//         >
//           Contact
//         </a>

//       </nav>

//       {/* Mobile Menu Button & Theme Toggler */}
//       <div className="md:hidden flex items-center gap-2">
//         <button
//           className="text-white"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div
//           className="absolute top-14 left-0 w-full rounded-2xl border border-white/10
//              bg-gray-900/5 backdrop-blur-2xl
//              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
//              md:hidden animate-slideDown"
//         >
//           <div className="flex flex-col items-center gap-3 py-4">
//             <a href="#" className="nav-item text-sm">Home</a>
//             <a href="#" className="nav-item text-sm">Projects</a>
//             <a href="#" className="nav-item text-sm">About</a>
//             <a href="#" className="nav-item text-sm">Blog</a>
//             <a
//               href="#"
//               className="nav-item bg-white text-gray-900 hover:bg-white/20 hover:text-lime-300 text-sm font-semibold"
//             >
//               Contact
//             </a>
//           </div>
//         </div>
//       )}
      
//     </header>
//   );
// };


// export const Header = () => {
//   return (
//     <div className="flex justify-center items-center relative top-4">
//       <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/5 backdrop-blur-md shadow-md">
//         <a href="#" className="nav-item outline-none text-sm px-4 py-1.5">Home</a>
//         <a href="#" className="nav-item text-sm px-4 py-1.5">Projects</a>
//         <a href="#" className="nav-item text-sm px-4 py-1.5">About</a>
//         <a href="#" className="nav-item text-sm px-4 py-1.5">Blog</a>
//         <a
//           href="#"
//           className="nav-item bg-white text-gray-900 hover:bg-white/15 hover:text-lime-300 transition-colors duration-300 text-sm px-4 py-1.5 font-semibold"
//         >
//           Contact
//         </a>
//       </nav>
//     </div>
//   );
// };
