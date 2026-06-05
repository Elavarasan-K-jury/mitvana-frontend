import HeaderCosmetics from '@src/components/HeaderCosmetics'
import React from 'react'
import img1 from '@assets/images/story/img1.jpg'
import certified from '@assets/images/story/certified.png'
import customers from '@assets/images/story/customers3.svg'
import global from '@assets/images/story/global3.svg'
import Image from 'next/image'
import FooterCosmetics from '@src/components/FooterCosmetics'
import heroImg from "@assets/images/story/img2.jpg";
import CountUp from "react-countup";

function OurStory() {
    return (
        <div>
            <HeaderCosmetics />

            {/* Hero Section - Enhanced */}
            <section className="relative min-h-[90vh] overflow-hidden">

                {/* Background Image with subtle zoom animation */}
                <Image
                    src={heroImg}
                    alt="Mitvana Wellness"
                    fill
                    priority
                    className="object-cover scale-105 animate-zoom-slow"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#193A43]/90 via-[#193A43]/60 to-[#193A43]/20" />

                {/* Subtle pattern overlay for texture */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        backgroundRepeat: "repeat"
                    }}
                />
                <div className="absolute inset-0 flex items-center">
                    <div className="container">

                        <div className="max-w-3xl text-white">
                            {/* Animated entry badge */}
                            <div className="animate-fade-up [animation-delay:200ms]">
                                <span className="inline-flex items-center gap-2 uppercase tracking-[6px] text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    Since 2011
                                </span>
                            </div>

                            {/* Animated heading */}
                            <h1 className="text-5xl lg:text-7xl font-semibold mt-6 leading-tight animate-fade-up [animation-delay:400ms]">
                                Rooted In Nature,
                                <br />
                                <span className="relative inline-block">
                                    Inspired By Wellness
                                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 400 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 4C66.6667 0.666667 133.333 0.666667 200 4C266.667 7.33333 333.333 7.33333 400 4" stroke="#6d8355" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>

                            {/* Animated description */}
                            <p className="mt-6 text-lg text-white/90 max-w-xl animate-fade-up [animation-delay:600ms]">
                                Harnessing the wisdom of ancient herbs and modern science to
                                create personal care that nurtures every wellness journey.
                            </p>

                            {/* Animated CTA button */}
                            <a href="/shop" className="inline-block mt-8 animate-fade-up [animation-delay:800ms] group">
                                <button className="px-10 py-4 rounded-full bg-white text-[#193A43] font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 group-hover:gap-3">
                                    Explore Products
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </a>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20 animate-fade-up [animation-delay:1000ms]">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm">100% Natural</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm">Cruelty Free</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm">Made in India</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-scroll-down" />
                    </div>
                </div>
            </section>

            {/* Add these animations to your global CSS or Tailwind config */}
            <style jsx>{`
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes zoom-slow {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.08);
                    }
                }
                
                @keyframes scroll-down {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                }
                
                .animate-fade-up {
                    animation: fade-up 0.8s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-zoom-slow {
                    animation: zoom-slow 12s ease-out forwards;
                }
                
                .animate-scroll-down {
                    animation: scroll-down 1.5s ease-in-out infinite;
                }
                
                [animation-delay="200ms"] {
                    animation-delay: 200ms;
                }
                [animation-delay="400ms"] {
                    animation-delay: 400ms;
                }
                [animation-delay="600ms"] {
                    animation-delay: 600ms;
                }
                [animation-delay="800ms"] {
                    animation-delay: 800ms;
                }
                [animation-delay="1000ms"] {
                    animation-delay: 1000ms;
                }
            `}</style>


            <section className="py-24 bg-[#faf8f2]">
                <div className="container max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div>
                            <Image
                                src={img1}
                                alt="Founder"
                                className="rounded-3xl shadow-xl"
                            />
                        </div>

                        <div>
                            <span className="uppercase tracking-[5px] text-[#6d8355]">
                                Founder
                            </span>

                            <h2 className="text-4xl font-semibold mt-3 mb-6 text-customPrimary">
                                Dr. S.K Mitra
                            </h2>

                            <p className="leading-8 text-gray-700">
                                Established in 2011 in Bangalore, India by Dr. S.K Mitra,
                                our motivation and inspiration has always been to make herbal
                                personal care accessible, effective and trusted.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-[#193A43] py-24 text-white overflow-hidden">
                <div className="container">

                    <div className="text-center mb-16">
                        <span className="uppercase tracking-[5px] text-white/60 text-sm">
                            Our Impact
                        </span>

                        <h2 className="text-4xl md:text-5xl font-semibold mt-4">
                            Trusted Across The Globe
                        </h2>

                        <p className="text-white/70 mt-4 max-w-2xl mx-auto">
                            Building wellness journeys through trusted herbal care and
                            thousands of happy customers worldwide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Customers */}
                        <div
                            className="text-center rounded-3xl p-10 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                        >
                            <div className="h-[90px] flex items-center justify-center mb-6">
                                <Image
                                    src={customers}
                                    alt="Customers"
                                    width={80}
                                    height={80}
                                    className="object-contain invert"
                                />
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold text-[#F6E8B1]">
                                <CountUp end={500} duration={3} suffix="K+" />
                            </h2>

                            <p className="mt-4 text-lg text-white/80">
                                Happy Customers
                            </p>
                        </div>

                        {/* Countries */}
                        <div
                            className="text-center rounded-3xl p-10 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                        >
                            <div className="h-[90px] flex items-center justify-center mb-6">
                                <Image
                                    src={global}
                                    alt="Countries"
                                    width={80}
                                    height={80}
                                    className="object-contain invert"
                                />
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold text-[#F6E8B1]">
                                <CountUp end={22} duration={3} suffix="+" />
                            </h2>

                            <p className="mt-4 text-lg text-white/80">
                                Countries Served
                            </p>
                        </div>

                        {/* Products */}
                        <div
                            className="text-center rounded-3xl p-10 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                        >
                            <div className="h-[90px] flex items-center justify-center mb-6">
                                <Image
                                    src={certified}
                                    alt="Products"
                                    width={80}
                                    height={80}
                                    className="object-contain invert"
                                />
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold text-[#F6E8B1]">
                                <CountUp end={63} duration={3} suffix="+" />
                            </h2>

                            <p className="mt-4 text-lg text-white/80">
                                Premium Products
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-24 lg:py-32 bg-white">
                <div className="container">

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        <div>

                            <span className="uppercase tracking-[5px] text-[#6d8355] text-sm font-medium">
                                Who We Are
                            </span>

                            <h2 className="text-4xl md:text-5xl font-semibold text-customPrimary mt-4 mb-8 leading-tight">
                                Wellness Is Personal
                            </h2>

                            <p className="leading-8 text-gray-600 text-lg">
                                Wellness is a journey, and we believe it is one of the most
                                personal experiences beginning with our inner selves.
                            </p>

                            <p className="leading-8 text-gray-600 mt-6">
                                At Mitvana, we're harnessing the unique herbal knowledge of
                                ancient India to become your trusted companion in this journey.
                                We create products that blend traditional wisdom with modern
                                scientific innovation.
                            </p>

                            <p className="leading-8 text-gray-600 mt-6">
                                More than a personal care brand, we aim to inspire a lifestyle
                                that is honest, effective and deeply connected to nature.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-8">

                                <span className="px-4 py-2 rounded-full bg-[#fbf4df] text-[#193A43] text-sm font-medium">
                                    🌿 Herbal Science
                                </span>

                                <span className="px-4 py-2 rounded-full bg-[#fbf4df] text-[#193A43] text-sm font-medium">
                                    🧪 Research Backed
                                </span>

                                <span className="px-4 py-2 rounded-full bg-[#fbf4df] text-[#193A43] text-sm font-medium">
                                    ❤️ Customer First
                                </span>

                            </div>

                        </div>

                        <div className="relative">

                            <div className="rounded-[32px] overflow-hidden shadow-2xl">
                                <Image
                                    src={heroImg}
                                    alt="Mitvana Wellness"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl shadow-xl p-6">
                                <h3 className="text-4xl font-bold text-[#193A43]">
                                    500K+
                                </h3>
                                <p className="text-gray-500">
                                    Happy Customers
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
            <section className="relative py-32 bg-[#193A43] overflow-hidden">

                {/* Background shapes */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#6d8355]/20 rounded-full blur-3xl" />

                <div className="container relative z-10">

                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Content */}
                        <div>

                            <span className="uppercase tracking-[5px] text-[#d8c18f] text-sm">
                                Our Promise
                            </span>

                            <h2 className="text-5xl md:text-6xl font-semibold text-white mt-4 leading-tight">
                                Friends Of
                                <br />
                                The Forest
                            </h2>

                            <div className="w-24 h-1 bg-[#d8c18f] mt-8 mb-8" />

                            <p className="text-white/80 leading-8 text-lg mb-6">
                                To say that Natural Herbs are an important element of our
                                production process would be an understatement.
                            </p>

                            <p className="text-white/80 leading-8 mb-10">
                                Our ingredients are sourced from responsible cultivators who
                                grow herbs using healthy agricultural practices. Every extract
                                is created using pure water and sustainable methods that stay
                                true to nature.
                            </p>

                            <div className="flex flex-wrap gap-4">

                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 text-white">
                                    🌿 100% Herbal Focus
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 text-white">
                                    ♻ Sustainable Sourcing
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 text-white">
                                    🧪 Research Driven
                                </div>

                            </div>

                            <a href="/shop">
                                <button className="mt-10 bg-white text-[#193A43] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
                                    Explore Products
                                </button>
                            </a>

                        </div>

                        {/* Right Side */}
                        <div className="flex justify-center">

                            <div className="bg-white rounded-[40px] p-8 shadow-2xl max-w-md">

                                <Image
                                    src={customers}
                                    alt="Mitvana Community"
                                    className="w-full"
                                />

                                <div className="text-center mt-8">

                                    <h3 className="text-3xl font-semibold text-[#193A43]">
                                        Wellness Through Nature
                                    </h3>

                                    <p className="mt-4 text-gray-600 leading-7">
                                        Bringing together ancient herbal wisdom and modern
                                        science to create products that inspire healthier,
                                        happier lifestyles.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
            <FooterCosmetics />
            {/* <BelowFooter /> */}
        </div>
    )
}

export default OurStory