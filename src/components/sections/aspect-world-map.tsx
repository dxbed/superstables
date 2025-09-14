import { Button } from '@/components/ui/button';

import { WorldMap } from '../ui/world-map';

const AspectWorldMap = () => {
  return (
    <section
      id="aspect-dashboard"
      className="bg-obsidian relative overflow-hidden"
    >
      <div className="relative w-full border border-transparent px-0">
        <div className="relative min-h-96 w-full overflow-x-auto overflow-y-hidden">
          <div className="absolute right-0 bottom-0 left-0 z-20 flex flex-col items-center pb-8">
            <div className="flex max-w-lg flex-col items-center justify-center px-5">
              <p className="text-foreground mb-4 text-center text-2xl lg:text-4xl">
                <span className="text-[#cbff00]">Stablecoins</span> ↔ EUR & USD. Worldwide.
              </p>
              <Button
                aria-label="Get started"
                size="sm"
                className="bg-[#cbff00] text-black transition-colors hover:bg-[#cbff00]/90"
              >
                Start My Free Trial
              </Button>
            </div>
          </div>
          <div className="z-10 h-full w-auto overflow-hidden lg:h-auto lg:w-full">
            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  },
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  },
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 },
                  end: { lat: -15.7975, lng: -47.8919 },
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 },
                  end: { lat: 38.7223, lng: -9.1393 },
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 },
                  end: { lat: 28.6139, lng: 77.209 },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 43.1332, lng: 131.9113 },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: -1.2921, lng: 36.8219 },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AspectWorldMap;
