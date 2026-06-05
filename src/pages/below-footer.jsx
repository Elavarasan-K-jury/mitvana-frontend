import React, { useState } from "react";
import {
    FaLeaf,
    FaShieldAlt,
    FaAward,
    FaHeart,
    FaSpa,
    FaPumpSoap,
    FaTooth,
} from "react-icons/fa";

const BelowFooter = () => {

    const [openAccordion, setOpenAccordion] = useState(0);

    const accordionData = [
        {
            title: "Skin Care Range",
            content:
                "Face Wash, Face Scrub, Face Mask, Toner, Creams, Serums and Lip Care products designed to cleanse, nourish and protect your skin.",
        },
        {
            title: "Hair Care Range",
            content:
                "Hair Oils, Shampoos, Conditioners, Hair Creams and Serums formulated to nourish roots and strengthen hair.",
        },
        {
            title: "Body Care Range",
            content:
                "Body Washes, Body Butters, Body Scrubs, Hand & Foot Care products enriched with natural ingredients.",
        },
        {
            title: "Dental Care Range",
            content:
                "Neem-based toothpaste and oral care solutions for cleaner teeth, fresher breath and healthier gums.",
        },
    ];

    return (
        <React.Fragment>
            <section className="mitvana-about-section">
                <div className="container">

                    {/* HERO */}
                    <div className="hero-content text-center">
                        <span className="hero-badge">
                            Nature Inspired Beauty
                        </span>

                        <h1>
                            Get Your Hands On Nature-Inspired
                            <span> Mitvana Products</span>
                        </h1>

                        <p>
                            Discover premium skincare, haircare, body care and wellness
                            products crafted with the goodness of nature. Made using safe,
                            gentle and toxin-free ingredients.
                        </p>
                    </div>

                    {/* FEATURES */}

                    <div className="row g-4 mt-5">

                        <div className="col-lg-3 col-md-6">
                            <div className="feature-card">
                                <FaLeaf />
                                <h5>Natural Ingredients</h5>
                                <p>
                                    Carefully selected botanical ingredients for everyday care.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="feature-card">
                                <FaShieldAlt />
                                <h5>Toxin Free</h5>
                                <p>
                                    Free from harsh chemicals and unnecessary additives.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="feature-card">
                                <FaAward />
                                <h5>Made Safe Certified</h5>
                                <p>
                                    Trusted quality standards for healthier personal care.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="feature-card">
                                <FaHeart />
                                <h5>Trusted Brand</h5>
                                <p>
                                    Loved by customers seeking natural beauty solutions.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* INTRO TEXT */}

                    <div className="seo-content mt-5">
                        <p>
                            Mitvana is one of the most trustworthy brands in India. Explore
                            Mitvana’s natural Skin, Hair, Body & Facial Care products.
                            Our products are formulated using safe, pure, gentle and
                            toxin-free ingredients designed to support your beauty journey.
                        </p>

                        <p>
                            We are your one-stop destination for beauty, skin, hair and
                            body care needs. Browse a wide range of products created to
                            deliver nature-inspired care with convenience and quality.
                        </p>
                    </div>

                    {/* CATEGORY CARDS */}

                    <div className="section-title text-center">
                        <h2>Explore Our Product Categories</h2>
                    </div>

                    <div className="row g-4 mt-2">

                        <div className="col-lg-3 col-md-6">
                            <div className="category-card">
                                <FaSpa className="category-icon" />
                                <h4>Skin Care</h4>

                                <ul>
                                    <li>Face Wash</li>
                                    <li>Face Scrub</li>
                                    <li>Face Toner</li>
                                    <li>Face Cream</li>
                                    <li>Face Serum</li>
                                    <li>Lip Balm</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="category-card">
                                <FaLeaf className="category-icon" />
                                <h4>Hair Care</h4>

                                <ul>
                                    <li>Hair Oil</li>
                                    <li>Shampoo</li>
                                    <li>Conditioner</li>
                                    <li>Hair Cream</li>
                                    <li>Hair Serum</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="category-card">
                                <FaPumpSoap className="category-icon" />
                                <h4>Body Care</h4>

                                <ul>
                                    <li>Body Wash</li>
                                    <li>Body Butter</li>
                                    <li>Body Scrub</li>
                                    <li>Hand Cream</li>
                                    <li>Foot Care</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="category-card">
                                <FaTooth className="category-icon" />
                                <h4>Dental Care</h4>

                                <ul>
                                    <li>Neem Toothpaste</li>
                                    <li>Fresh Breath Care</li>
                                    <li>Healthy Gum Support</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* ACCORDION */}

                    <div className="section-title text-center mt-5">
                        <h2>Learn More About Our Ranges</h2>
                    </div>

                    <div className="modern-accordion">

                        {accordionData.map((item, index) => (
                            <div
                                key={index}
                                className={`accordion-card ${openAccordion === index ? "active" : ""
                                    }`}
                            >
                                <button
                                    className="accordion-header-custom"
                                    onClick={() =>
                                        setOpenAccordion(
                                            openAccordion === index ? null : index
                                        )
                                    }
                                >
                                    <span>{item.title}</span>

                                    <span className="accordion-icon">
                                        {openAccordion === index ? "−" : "+"}
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${openAccordion === index ? "show" : ""
                                        }`}
                                >
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* CTA */}

                    <div className="cta-section">
                        <h2>Experience The Goodness Of Nature</h2>

                        <p>
                            Explore Mitvana's complete collection of nature-inspired
                            personal care products.
                        </p>

                        <a href="/shop" className="cta-btn">
                            Explore Products
                        </a>
                    </div>

                </div>
            </section>
        </React.Fragment>
    );
};

export default BelowFooter;
