import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import slide1 from "@assets/images/home-bags/bg1.png";
import slide2 from "@assets/images/home-bags/bg2.png";
import slide3 from "@assets/images/home-bags/bg3.jpg";

import "flickity/css/flickity.css";

const HomeSection = () => {
  const flickityRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const FlickityClass = require("flickity");

      flickityRef.current = new FlickityClass(".slideshow", {
        wrapAround: true,
        autoPlay: 4500,
        pauseAutoPlayOnHover: true,
        prevNextButtons: false,
        pageDots: true,
        draggable: true,
        cellAlign: "left",
        imagesLoaded: true,
        touchVerticalScroll: false,
      });
    }

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  const slides = [
    {
      id: 1,
      pic: slide1,
      title: "Mitvana's Intimate Wash",
      subtitle: "with Neem & Chamomile",
    },
    {
      id: 2,
      pic: slide2,
      title: "Mitvana's Vitalizing Hair Oil",
      subtitle: "with Amla & Centella",
    },
    {
      id: 3,
      pic: slide3,
      title: "Mitvana's Derma Face Wash",
      subtitle: "with Neem & Turmeric",
    },
  ];

  return (
    <section className="home-banner-section w-full overflow-hidden">
      <div className="slideshow w-full">
        {slides.map((item) => (
          <div
            key={item.id}
            className="slide-item relative w-full h-[370px] sm:h-[450px] md:h-[650px] lg:h-[720px] flex items-center"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.pic}
                alt={item.title}
                fill
                priority
                sizes="100vw"
                className="object-cover md:object-center object-[70%_center]"
              />
            </div>

            {/* Soft Elegant Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/30 to-black/20" />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-[320px] sm:max-w-md lg:max-w-2xl mx-auto lg:mx-0 text-center">
                {/* NEW PRODUCT - Elegant Style */}
                <div className="mb-3 sm:mb-4">
                  <span className="inline-flex items-center gap-2 text-white/90 uppercase tracking-[3px] text-sm font-medium">
                    <span className="block w-6 h-px bg-white/60"></span>
                    NEW PRODUCT
                    <span className="block w-6 h-px bg-white/60"></span>
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-white font-bold leading-tight drop-shadow-xl mb-3 text-[24px] sm:text-[32px] md:text-5xl lg:text-6xl">
                  {item.title}
                </h1>

                {/* Subtitle */}
                <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light mb-8 sm:mb-10">
                  {item.subtitle}
                </p>

                {/* Shop Now Button - Matching Screenshot Style */}
                <Link
                  href="/shop"
                  className="inline-block bg-white text-black font-semibold uppercase tracking-wide px-8 py-3 rounded-full text-sm sm:text-base"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .home-banner-section {
          width: 100%;
        }

        .slideshow {
          width: 100%;
        }

        .slide-item {
          width: 100%;
          position: relative;
        }

        /* Flickity Dots */
        .flickity-page-dots {
          bottom: 30px !important;
          z-index: 30;
        }

        .flickity-page-dots .dot {
          width: 9px;
          height: 9px;
          background: #ffffff;
          opacity: 0.7;
        }

        .flickity-page-dots .dot.is-selected {
          opacity: 1;
          transform: scale(1.4);
        }

        /* Mobile Optimizations */
        @media (max-width: 640px) {
          .slide-item h1 {
            font-size: 29px !important;
            line-height: 1.15 !important;
          }

          .slide-item p {
            font-size: 16px !important;
          }
        }

        @media (max-width: 380px) {
          .slide-item h1 {
            font-size: 26px !important;
          }
        }
          @media (max-width: 767px) {
  .slide-item {
    height: 370px !important;
  }

  .slide-item .container {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .flickity-page-dots {
    bottom: 10px !important;
  }
}
      `}</style>
    </section>
  );
};

export default HomeSection;