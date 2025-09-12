import AspectDashboard from '@/components/sections/aspect-dashboard';
import AspectHero from '@/components/sections/aspect-hero';
import AspectSeparator from '@/components/sections/aspect-separator';
import AspectWorldMap from '@/components/sections/aspect-world-map';

export default function Home() {
  return (
    <>
      <AspectHero />
      <AspectWorldMap />
      <AspectDashboard />
      <AspectSeparator />
    </>
  );
}
