import React from "react";
import Image from "next/image";

import wellness from "@assets/images/new-home/wellness.jpg";
import commitment from "@assets/images/new-home/commitment.jpg";

function Commitment() {
    return (
        <section className="py-20 lg:py-32 bg-[#fafafa] overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="uppercase tracking-[4px] text-sm text-[#7a9ba4]">
                        Our Philosophy
                    </span>

                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl text-customPrimary">
                        Wellness Crafted
                        <span className="block italic text-[#7a9ba4]">
                            With Purpose
                        </span>
                    </h2>
                </div>

                {/* Wellness Journey */}
                <div className="relative mb-24 lg:mb-40">

                    <div className="lg:w-[68%]">
                        <Image
                            src={wellness}
                            alt="Wellness Journey"
                            className="
                                w-full
                                h-[300px]
                                md:h-[450px]
                                lg:h-[650px]
                                object-cover
                                rounded-[30px]
                            "
                        />
                    </div>

                    <div
                        className="
                            mt-6
                            lg:mt-0
                            lg:absolute
                            lg:right-0
                            lg:top-1/2
                            lg:-translate-y-1/2
                            bg-white
                            shadow-xl
                            rounded-[30px]
                            p-8
                            md:p-10
                            lg:p-12
                            lg:w-[42%]
                        "
                    >
                        <span className="uppercase tracking-[4px] text-sm text-[#7a9ba4]">
                            Your Journey
                        </span>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl text-customPrimary mt-4 mb-6">
                            Your Wellness
                            <span className="block italic text-[#7a9ba4]">
                                Journey
                            </span>
                        </h3>

                        <p className="text-[#5c808a] leading-8 text-base md:text-lg">
                            At Mitvana, we believe wellness is a deeply personal
                            journey that begins from within. Inspired by the
                            timeless herbal wisdom of India, we create products
                            that nurture balance, confidence, and everyday
                            well-being.
                        </p>

                        <p className="text-[#5c808a] leading-8 text-base md:text-lg mt-5">
                            Every formulation is thoughtfully designed to help
                            you reconnect with nature and embrace a lifestyle
                            rooted in conscious self-care.
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-12 h-[1px] bg-customPrimary"></div>
                            <span className="uppercase tracking-[3px] text-sm text-customPrimary">
                                Ancient Wisdom
                            </span>
                        </div>
                    </div>
                </div>

                {/* Commitment */}
                <div className="relative">

                    <div className="lg:w-[68%] ml-auto">
                        <Image
                            src={commitment}
                            alt="Our Commitment"
                            className="
                                w-full
                                h-[300px]
                                md:h-[450px]
                                lg:h-[650px]
                                object-cover
                                rounded-[30px]
                            "
                        />
                    </div>

                    <div
                        className="
                            mt-6
                            lg:mt-0
                            lg:absolute
                            lg:left-0
                            lg:top-1/2
                            lg:-translate-y-1/2
                            bg-white
                            shadow-xl
                            rounded-[30px]
                            p-8
                            md:p-10
                            lg:p-12
                            lg:w-[42%]
                        "
                    >
                        <span className="uppercase tracking-[4px] text-sm text-[#7a9ba4]">
                            Our Promise
                        </span>

                        <h3 className="text-3xl md:text-4xl lg:text-5xl text-customPrimary mt-4 mb-6">
                            Our
                            <span className="block italic text-[#7a9ba4]">
                                Commitment
                            </span>
                        </h3>

                        <p className="text-[#5c808a] leading-8 text-base md:text-lg">
                            Research and quality form the foundation of
                            everything we create. We carefully examine natural
                            ingredients and combine them with dermatology-grade
                            standards to develop products that deliver visible
                            results.
                        </p>

                        <p className="text-[#5c808a] leading-8 text-base md:text-lg mt-5">
                            Every product undergoes rigorous testing and
                            evaluation before reaching you, ensuring the highest
                            standards of safety, efficacy, and trust.
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-12 h-[1px] bg-customPrimary"></div>
                            <span className="uppercase tracking-[3px] text-sm text-customPrimary">
                                Science Meets Nature
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Commitment;