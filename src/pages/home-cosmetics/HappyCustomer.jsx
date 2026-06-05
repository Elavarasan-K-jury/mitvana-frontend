import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import avatar1 from "@assets/images/home-bags/SUNIL.jpeg";
import avatar2 from "@assets/images/home-bags/PALLAVI.jpeg";
import avatar3 from "@assets/images/home-bags/ARSH.jpeg";
import avatar4 from "@assets/images/home-bags/mom.jpeg";
import avatar5 from "@assets/images/home-bags/hat.jpeg";

const happycustomer = [
  {
    id: 1,
    avatar: avatar1,
    name: "SUNIL KUMAR",
    review:
      "These skincare products transformed my daily routine. My skin feels so much healthier!",
  },
  {
    id: 2,
    avatar: avatar2,
    name: "PALLAVI UMESH",
    review:
      "Fantastic quality and results! I noticed a huge improvement in just a week.",
  },
  {
    id: 3,
    avatar: avatar3,
    name: "ARSALAN SHAIKH",
    review:
      "Finally found a brand that cares about natural ingredients and real results.",
  },
  {
    id: 4,
    avatar: avatar5,
    name: "JATIN DIXIT",
    review:
      "Impressed by the fast delivery and excellent customer support. Highly recommended!",
  },
  {
    id: 5,
    avatar: avatar4,
    name: "NAUMANALI SHAIKH",
    review:
      "As a healthcare professional, I trust and endorse these products for my patients.",
  },
];

const flickityOptions = {
  contain: true,
  wrapAround: true,
  cellAlign: "left",
  pageDots: false,
  prevNextButtons: false,
  autoPlay: 3500,
  pauseAutoPlayOnHover: true,
  draggable: true,
};

const HappyCustomer = () => {
  return (
    <section className="happy-customer-section">
      <Container>
        {/* Heading */}
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className="section-header text-center">
              <div className="section-badge">
                <span></span>
                <p>What Our Customers Say</p>
                <span></span>
              </div>

              <h2 className="section-title">
                Real Stories. Real Results.
              </h2>

              <p className="section-subtitle">
                Genuine feedback from our community who have experienced the
                benefits of natural wellness and skincare solutions.
              </p>
            </div>
          </Col>
        </Row>

        {/* Slider */}
        <Row>
          <Col lg={12}>
            <Flickity
              className="testimonial-slider"
              elementType="div"
              options={flickityOptions}
              disableImagesLoaded={false}
              reloadOnUpdate
              static
            >
              {happycustomer.map((item) => (
                <div className="testimonial-card" key={item.id}>
                  <FaQuoteLeft className="quote-icon" />

                  <div className="review-wrapper">
                    <p className="testimonial-text">
                      "{item.review}"
                    </p>
                  </div>

                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <div className="customer-info">
                    <div className="avatar-wrapper">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="customer-avatar"
                      />
                    </div>

                    <div className="customer-content">
                      <h5 className="customer-name">
                        {item.name}
                      </h5>

                      <span className="verified-buyer">
                        Verified Customer
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Flickity>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .happy-customer-section {
          padding: 80px 0;
          background: #fafaf8;
          overflow: hidden;
        }

        .section-header {
          margin-bottom: 50px;
        }

.section-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.section-badge span {
  width: 50px;
  height: 1px;
  background: #c9a56b;
}

.section-badge p {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c9a56b;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  line-height: 1.2;
}

        .section-subtitle {
          font-size: 17px;
          color: #6b7280;
          line-height: 1.8;
          max-width: 650px;
          margin: 0 auto;
        }

        .testimonial-card {
          width: calc(33.333% - 24px);
          margin: 12px;
          padding: 32px;
          background: #fff;
          border-radius: 24px;
          border: 1px solid #f3f4f6;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);

          height: 350px;

          display: flex;
          flex-direction: column;

          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .quote-icon {
          font-size: 30px;
          color: #d4b483;
          margin-bottom: 20px;
        }

        .review-wrapper {
          flex: 1;
        }

        .testimonial-text {
          font-size: 16px;
          line-height: 1.9;
          color: #4b5563;

          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .stars {
          display: flex;
          gap: 5px;
          color: #ffc107;
          margin-bottom: 22px;
        }

        .customer-info {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: auto;
        }

        .avatar-wrapper {
          width: 72px;
          height: 72px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          border: 3px solid #d4b483;
          flex-shrink: 0;
        }

        .customer-avatar {
          object-fit: cover;
        }

        .customer-content {
          flex: 1;
        }

        .customer-name {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: #111827;
        }

        .verified-buyer {
          color: #6b7280;
          font-size: 13px;
        }

        :global(.flickity-viewport) {
          overflow: hidden;
        }

        :global(.flickity-slider) {
          display: flex;
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .testimonial-card {
            width: calc(50% - 24px);
          }

          .section-title {
            font-size: 34px;
          }
        }

        @media (max-width: 768px) {
          .happy-customer-section {
            padding: 60px 0;
          }

          .testimonial-card {
            width: calc(100% - 24px);
            height: auto;
            min-height: 320px;
            padding: 24px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default HappyCustomer;