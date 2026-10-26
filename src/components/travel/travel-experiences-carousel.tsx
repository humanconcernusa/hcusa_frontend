"use client";

import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function TravelExperiencesCarousel({ children }: { children: ReactNode[] }) {
  return (
    <div className="-mr-[max(1rem,calc((100vw-100%)/2))] overflow-hidden md:hidden">
      <Swiper slidesPerView={1.15} spaceBetween={16} className="!overflow-visible !pr-4">
        {children.map((child, index) => (
          <SwiperSlide key={index} className="!h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
