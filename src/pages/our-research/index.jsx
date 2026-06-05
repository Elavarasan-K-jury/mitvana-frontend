import HeaderCosmetics from "@src/components/HeaderCosmetics";
import React from "react";
import img1 from "@assets/images/research/0043.jpg";
import img2 from "@assets/images/research/0044.jpg";
import img3 from "@assets/images/footer-icons.png";
import img4 from "@assets/images/research/0046.jpg";
import img5 from "@assets/images/research/0047.jpg";
import img6 from "@assets/images/research/0048.jpg";
import img7 from "@assets/images/research/0049.jpg";
import img8 from "@assets/images/research/0050.png";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewFooter from "@src/components/new_footer";
import BelowFooter from "../below-footer";

function index() {
  return (
    <div>
      <HeaderCosmetics />

      <section className="relative py-24 md:py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f1] to-white" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="uppercase tracking-[0.3em] text-sm text-[#7f8c82]">
            Research & Innovation
          </span>

          <h1 className="text-5xl md:text-7xl font-light text-[#1b251f] mt-6 leading-tight">
            Science Inspired by Nature
          </h1>

          <p className="text-lg md:text-xl text-[#5b645f] mt-8 leading-relaxed max-w-3xl mx-auto">
            Combining Pharmacognosy and Cosmetology to create
            dermatology-grade personal care products backed by
            clinical research and rigorous testing.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <section className="pb-24">
          <div className="overflow-hidden rounded-[32px] shadow-2xl border border-[#edf0eb]">

            <iframe
              width="100%"
              height="650"
              src="https://www.youtube.com/embed/Q1vW06j_1U8?si=6mLv2nOCcOefSoCX"
              title="Research Video"
              allowFullScreen
              className="w-full"
            />

          </div>
        </section>
        <section className="py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="uppercase tracking-[0.3em] text-sm text-[#7f8c82]">
                Our Foundation
              </span>

              <h2 className="text-4xl md:text-5xl font-light text-[#1b251f] mt-4 mb-8">
                Where Nature Meets Science
              </h2>

              <p className="text-lg text-[#5b645f] leading-relaxed mb-12">
                Research jargon can often feel overwhelming. At Matxin Labs,
                we believe scientific innovation should be understandable,
                transparent and accessible.
              </p>

              <div className="grid gap-6">
                <div className="p-6 rounded-3xl border border-[#e8ece8] bg-white shadow-sm hover:shadow-xl transition-all">

                  <CircleCheck
                    size={32}
                    className="mb-4 text-[#4d6754]"
                  />

                  <h4 className="text-xl font-semibold mb-3">
                    Pharmacognosy
                  </h4>

                  <p className="text-[#5b645f]">
                    Understanding the biological and chemical properties of
                    natural compounds derived from plants and natural sources.
                  </p>

                </div>

                <div className="p-6 rounded-3xl border border-[#e8ece8] bg-white shadow-sm hover:shadow-xl transition-all">

                  <CircleCheck
                    size={32}
                    className="mb-4 text-[#4d6754]"
                  />

                  <h4 className="text-xl font-semibold mb-3">
                    Cosmetology
                  </h4>

                  <p className="text-[#5b645f]">
                    The science behind effective skincare, haircare and bodycare
                    treatments designed for modern lifestyles.
                  </p>

                </div>
              </div>
            </div>
            <div>

              <Image
                src={img1}
                alt="Research"
                className="
          w-full
          rounded-[32px]
          shadow-2xl
          object-cover
          hover:scale-[1.02]
          transition-all
          duration-500
        "
              />

            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border rounded-3xl p-10 text-center">

              <h3 className="text-5xl font-light text-[#1b251f]">
                100%
              </h3>

              <p className="mt-4 text-[#5b645f]">
                Clinically Tested Formulations
              </p>

            </div>

            <div className="bg-white border rounded-3xl p-10 text-center">

              <h3 className="text-5xl font-light text-[#1b251f]">
                2
              </h3>

              <p className="mt-4 text-[#5b645f]">
                Core Scientific Disciplines
              </p>

            </div>

            <div className="bg-white border rounded-3xl p-10 text-center">

              <h3 className="text-5xl font-light text-[#1b251f]">
                ∞
              </h3>

              <p className="mt-4 text-[#5b645f]">
                Commitment To Innovation
              </p>

            </div>
          </div>

        </section>
        <section className="py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <Image
                src={img2}
                alt="Quality"
                className="
          hidden lg:block
          rounded-[32px]
          shadow-2xl
        "
              />

            </div>

            <div>

              <span className="uppercase tracking-[0.3em] text-sm text-[#7f8c82]">
                Quality Standards
              </span>

              <h2 className="text-4xl md:text-5xl font-light mt-4 mb-8 text-[#1b251f]">
                Research Driven Manufacturing
              </h2>

              <p className="text-lg text-[#5b645f] leading-relaxed mb-10">
                Every formulation undergoes extensive research,
                clinical evaluation and quality assurance before
                reaching our customers.
              </p>

              <div className="bg-[#f8f6f1] rounded-[32px] p-6 md:p-10 border">

                <Image
                  src={img3}
                  alt="Process"
                  className="hidden md:block"
                />

                <Image
                  src={img8}
                  alt="Process"
                  className="md:hidden"
                />

              </div>

            </div>

          </div>

        </section>
        <section className="py-24">

          <div className="text-center mb-16">

            <span className="uppercase tracking-[0.3em] text-sm text-[#7f8c82]">
              Behind The Research
            </span>

            <h2 className="text-4xl md:text-5xl font-light mt-4 text-[#1b251f]">
              Inside Our Innovation Journey
            </h2>

          </div>

          <div className="columns-1 md:columns-2 gap-8 space-y-8">

            {[img4, img5, img6, img7].map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[28px] shadow-xl break-inside-avoid"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index}`}
                  className="
            w-full
            hover:scale-105
            transition-all
            duration-700
          "
                />
              </div>
            ))}

          </div>

        </section>
      </div>

      <section className="py-24">

        <div
          className="
      bg-[#1b251f]
      rounded-[40px]
      text-center
      px-8
      py-20
      text-white
    "
        >

          <h2 className="text-4xl md:text-6xl font-light">
            Driven By Research.
            <br />
            Inspired By Nature.
          </h2>

          <p className="max-w-2xl mx-auto mt-8 text-lg opacity-80">
            Every formulation begins with scientific curiosity and
            ends with a commitment to healthier, more effective
            personal care.
          </p>

          <button
            className="
        mt-10
        px-14
        py-3
        bg-white
        text-[#1b251f]
        rounded-full
        font-medium
        hover:scale-105
        transition-all
      "
          >
            Explore Products
          </button>

        </div>

      </section>
      <FooterCosmetics />
      {/* <BelowFooter /> */}
    </div>
  );
}

export default index;
