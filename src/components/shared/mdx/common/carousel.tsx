'use client';

import type React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function CarouselMDX({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="w-full max-lg:px-10">
      <Carousel className="w-full" plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index as React.Key}>{item}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
