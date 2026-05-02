"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TileShowcaseSlider({ tiles }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      className="pb-12"
    >
      {tiles.map((tile) => (
        <SwiperSlide key={tile.id}>
          <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
            <figure className="relative h-60">
              <Image src={tile.image} alt={tile.title} fill className="object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{tile.title}</h3>
              <p className="text-sm text-base-content/70 line-clamp-2">{tile.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm rounded-full">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
