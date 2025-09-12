import AspectDashboard from '@/components/sections/aspect-dashboard';
import AspectHero from '@/components/sections/aspect-hero';
import AspectLogos from '@/components/sections/aspect-logos';
import AspectSeparator from '@/components/sections/aspect-separator';
import { AspectTabs } from '@/components/sections/aspect-tabs';
import AspectTestimonials from '@/components/sections/aspect-testimonials';
import AspectWorldMap from '@/components/sections/aspect-world-map';

export default function Home() {
  return (
    <>
      <AspectHero />
      <AspectWorldMap />
      <AspectLogos />
      <AspectTabs />
      <AspectTestimonials />
      <AspectDashboard />
      <AspectSeparator />
    </>
  );
}
