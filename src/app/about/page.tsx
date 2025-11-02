// app/about/page.tsx

import { HyperText } from '@/components/ui/hyper-text';
import { Header } from './../../sections/Header';
import { Footer } from '@/sections/Footer';
export default function AboutPage() {
  return (
    <>
     <Header/>
      <div className='max-w-full flex items-center justify-center text-white/50 h-96'><HyperText>Coming soon !</HyperText></div>
      <Footer />
    </>
  );
}