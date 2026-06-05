import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import bg from "@assets/images/mainpopup/bg.jpeg";
import p1 from "@assets/images/mainpopup/p1.jpg";
import p2 from "@assets/images/mainpopup/p2.jpg";
import p3 from "@assets/images/mainpopup/p3.jpg";
import p4 from "@assets/images/mainpopup/p4.jpg";

const products = [
    {
        href: "/product/neem-tooth-paste",
        img: p1, alt: "Neem Tooth Paste",
        name: "Neem Tooth Paste",
        sub: "Natural oral care",
        price: "₹125.00",
    },
    {
        href: "/product/anti-dandruff-hair-oil",
        img: p2, alt: "Anti Dandruff Hair Oil",
        name: "Anti Dandruff Hair Oil",
        sub: "Scalp treatment",
        price: "₹350.00",
    },
    {
        href: "/product/energizing-body-polish-scrub-with-orange-turmeric-walnut",
        img: p3, alt: "Energizing Body Scrub",
        name: "Energizing Body Scrub — Orange & Walnut",
        sub: "Body care",
        price: "₹425.00",
    },
    {
        href: "/product/deep-moisturising-body-wash-with-honey-apricot",
        img: p4, alt: "Deep Moisturizing Body Wash",
        name: "Deep Moisturizing Body Wash — Honey & Apricot",
        sub: "Body wash",
        price: "₹300.00",
    },
];

const MainModel = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    // ✅ Portal needs document to be available (Next.js SSR safe)
    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // ✅ Close on Escape key
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleKeyDown]);

    const handleCopy = () => {
        navigator.clipboard.writeText('REDEEM20').catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ✅ Click outside backdrop to close
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <>
            {/* ✅ Pure custom backdrop — zero Bootstrap interference */}
            <div
                onClick={handleBackdropClick}
                className="fixed inset-0 z-[1050] flex items-center justify-center p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                role="dialog"
                aria-modal="true"
                aria-label="Special offer"
            >
                {/* ✅ Modal box — full control, no Bootstrap classes at all */}
                <div
                    className="relative w-full max-w-3xl rounded-2xl overflow-hidden
                                flex flex-col md:flex-row md:items-stretch
                                shadow-2xl"
                    style={{ maxHeight: '90vh' }}
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* ── LEFT: Offer panel ── */}
                    <div
                        className="relative md:w-1/2 flex-shrink-0 flex flex-col
                                   items-center justify-center text-center
                                   px-7 py-10 min-h-[280px]"
                        style={{ backgroundColor: '#0f0f0f' }}
                    >
                        {/* Background image — fills entire panel always */}
                        <Image
                            src={bg}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            style={{ filter: 'brightness(40%)' }}
                            aria-hidden="true"
                            priority
                        />

                        {/* Extra dark overlay */}
                        <div className="absolute inset-0 bg-black/25" />

                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 z-10
                                        bg-gradient-to-r from-emerald-400 to-teal-500" />

                        {/* Mobile close button */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="md:hidden absolute top-3 right-3 z-20
                                       w-9 h-9 rounded-full bg-white/15 hover:bg-white/25
                                       border border-white/20 backdrop-blur-sm
                                       flex items-center justify-center
                                       text-white text-sm transition-all"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                            <span className="text-[10px] tracking-widest uppercase text-white/60
                                             border border-white/20 rounded-full px-3 py-1 bg-white/5">
                                Limited time offer
                            </span>

                            <div className="text-white mt-1">
                                <span className="block text-6xl font-light leading-none">20%</span>
                                <span className="block text-xs text-white/50 mt-1">
                                    off on orders above ₹1000
                                </span>
                            </div>

                            <div className="w-12 h-px bg-white/20 my-1" />

                            <p className="text-white text-base font-medium leading-snug">
                                Wait! Before you leave...
                            </p>
                            <p className="text-white/55 text-xs leading-relaxed">
                                Use the code below at checkout and save on your favourite Mitvana natural products.
                            </p>

                            {/* Coupon box */}
                            <div className="flex items-stretch w-full mt-1 rounded-lg overflow-hidden
                                            border border-white/20 bg-white/[0.08]">
                                <span className="flex-1 flex items-center justify-center text-white
                                                 font-semibold tracking-[0.15em] text-sm py-2.5 px-3">
                                    REDEEM20
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1.5 px-3 text-xs text-white/70
                                               bg-white/10 border-l border-white/15
                                               hover:bg-white/20 transition-colors"
                                    aria-label="Copy coupon code"
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            {copied && (
                                <p className="text-emerald-400 text-xs -mt-1">
                                    Code copied to clipboard!
                                </p>
                            )}

                            <button
                                onClick={onClose}
                                className="mt-1 text-[11px] text-white/35 hover:text-white/60
                                           underline underline-offset-2 transition-colors"
                            >
                                No thanks, I'll pay full price
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT: Products panel ── */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4
                                        border-b border-neutral-100 flex-shrink-0">
                            <h3 className="text-sm font-semibold text-neutral-800">
                                Recommended for you
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-neutral-400 bg-neutral-100
                                                 px-2.5 py-0.5 rounded-full">
                                    {products.length} items
                                </span>
                                {/* Desktop close */}
                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="hidden md:flex w-7 h-7 rounded-full
                                               bg-neutral-100 hover:bg-neutral-200
                                               items-center justify-center text-neutral-500
                                               transition-colors text-xs leading-none"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Scrollable list */}
                        <div className="overflow-y-auto px-3 py-2" style={{ maxHeight: '400px' }}>
                            {products.map((p, i) => (
                                <React.Fragment key={p.href}>
                                    <Link
                                        href={p.href}
                                        className="group flex items-center gap-3 p-2.5 rounded-xl
                                                   hover:bg-neutral-50 border border-transparent
                                                   hover:border-neutral-100 transition-all no-underline"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0
                                                        bg-neutral-100 border border-neutral-200">
                                            <Image
                                                src={p.img}
                                                alt={p.alt}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-800
                                                          leading-snug line-clamp-2">
                                                {p.name}
                                            </p>
                                            {p.sub && (
                                                <p className="text-xs text-neutral-400 mt-0.5">{p.sub}</p>
                                            )}
                                            <p className="text-sm font-semibold text-neutral-900 mt-1">
                                                {p.price}
                                            </p>
                                        </div>
                                        <div className="w-7 h-7 rounded-full border border-neutral-200
                                                        flex items-center justify-center text-neutral-400
                                                        text-base flex-shrink-0
                                                        group-hover:bg-neutral-900 group-hover:text-white
                                                        group-hover:border-neutral-900 transition-all">
                                            +
                                        </div>
                                    </Link>
                                    {i < products.length - 1 && (
                                        <div className="h-px bg-neutral-100 mx-2 my-0.5" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto px-4 py-3 border-t border-neutral-100 flex-shrink-0">
                            <Link
                                href="/shop"
                                onClick={onClose}
                                className="block w-full text-center text-xs text-neutral-500
                                           border border-neutral-200 rounded-lg py-2.5
                                           hover:bg-neutral-50 hover:text-neutral-700
                                           transition-colors no-underline"
                            >
                                View all products →
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>,
        document.body
    );
};

export default MainModel;