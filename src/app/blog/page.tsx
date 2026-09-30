import dynamic from "next/dynamic";

const Header = dynamic(() => import("./../../sections/Header").then((m) => m.Header));
const Footer = dynamic(() => import("@/sections/Footer").then((m) => m.Footer));
const BlogPage = dynamic(() => import("@/sections/blog"));
export default function AboutPage() {
  return (
    <>
     <Header/>
      {/* <div className='max-w-full flex items-center justify-center text-white/50 h-96'><HyperText>Coming soon !</HyperText></div> */}
      <BlogPage />
      <Footer />
    </>
  );
}