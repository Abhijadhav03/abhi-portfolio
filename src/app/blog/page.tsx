import { Header } from './../../sections/Header';
import { Footer } from '@/sections/Footer';
import BlogPage  from '@/sections/blog';
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