"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const slides = [
  {
    id: 1,
    url: "https://rwvfilm.com/uploads/media/image/0001/03/348fc831e0fef3d1a46c98b2fd2985f0ce5a867e.jpg",
    caption: "Forest Path",
  },
  {
    id: 2,
    url: "https://rwvfilm.com/uploads/media/image/0001/03/be17f5d8f47dd9cf48c970d8d445d3b20741e87a.png",
    caption: "Mountain View",
  },
  {
    id: 3,
    url: "https://rwvfilm.com/uploads/media/image/0001/02/48078d7e84e6468f15fae7f3bbb8fe10048a2ab7.jpg",
    caption: "Beach Sunset",
  },
];

const HeroCarousel = () => {
  return (
    <div className="relative h-[300px] lg:h-[450px] w-full overflow-hidden bg-black ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full mx-auto flex items-center justify-center ">
              <Image
                src={slide.url}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover object-center"
                priority={slide.id === 1}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <Button
        variant="secondary"
        size="lg"
        className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 h-24 rounded-2xl transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 h-24 rounded-2xl transition-all duration-300"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>

      <div className="swiper-pagination-custom absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"></div>
    </div>
  );
};

export default HeroCarousel;
