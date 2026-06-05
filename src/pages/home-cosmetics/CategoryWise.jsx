import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductModal from "@src/commonsections/ProductModal";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

// Styled Components for Custom Arrows
const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  color: black;
  font-size: 26px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-50%) scale(1.2);
  }

  /* Default Position for Large Screens */
  &.next {
    right: -50px;
  }

  &.prev {
    left: -50px;
  }

  @media (max-width: 1480px) {
    &.next {
      right: -30px;
    }

    &.prev {
      left: -30px;
    }
  }

  /* Adjust for Medium Screens (Tablets) */
  @media (max-width: 1400px) {
    &.next {
      right: -20px;
    }

    &.prev {
      left: -20px;
    }
  }

  @media (max-width: 1024px) {
    &.next {
      right: -30px;
    }

    &.prev {
      left: -30px;
    }
  }

  /* Adjust for Small Screens (Mobile) */
  @media (max-width: 768px) {
    font-size: 22px;

    &.next {
      right: -10px;
    }

    &.prev {
      left: -10px;
    }
  }

  /* Further Adjust for Extra Small Devices */
  @media (max-width: 480px) {
    font-size: 18px;

    &.next {
      right: -5px;
    }

    &.prev {
      left: -5px;
    }
  }
`;

// Updated NextArrow & PrevArrow Components
const NextArrow = ({ onClick }) => (
  <Arrow className="next" onClick={onClick}>
    <ChevronRight size={40} />
  </Arrow>
);

const PrevArrow = ({ onClick }) => (
  <Arrow className="prev" onClick={onClick}>
    <ChevronLeft size={40} />
  </Arrow>
);

// Styled Components for UI
const Section = styled.section`
  padding-bottom: 30px;
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #3c3c3c;
  text-align: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  span {
    width: 50px;
    height: 2px;
    background-color: #ddd;
    margin: 0 5px;
  }

  i {
    font-size: 20px;
    color: #bbb;
  }
`;

const SliderCard = styled.div`
  padding: 0 10px; /* Default spacing between slides */

  @media (max-width: 1400px) {
    transform: scale(0.85); /* Slightly reduce card size */
    padding: 0 3px; /* Reduce padding further */
  }

  @media (max-width: 1024px) {
    
  }

  @media (max-width: 768px) {
    transform: scale(0.8);
    padding: 0 5px;
  }
`;

const CategoryWise = ({ handleLoginShow, productsByCategory = {} }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <React.Fragment>
      <Container>
        {Object.keys(productsByCategory).length > 0 ? (
          Object.entries(productsByCategory).map(([category, products]) => (
            <Section key={category}>
              <Row className="justify-content-center">
                <Col lg={8}>
                  <div className="text-center mt-4 ">
                    <Heading>{category}</Heading>
                    <Divider>
                      <span></span>
                      <i className="la la-spa text-muted"></i>
                      <span></span>
                    </Divider>
                  </div>
                </Col>
              </Row>

              {isClient && (
                <Slider {...sliderSettings} className="mt-4">
                  {products?.length > 0 ? (
                    products.map((product) => (
                      <SliderCard key={product._id}>
                        <ProductCard handleLoginShow={handleLoginShow} handleShow={handleShow} product={product} />
                      </SliderCard>
                    ))
                  ) : (
                    <p className="text-center text-muted">No products available.</p>
                  )}
                </Slider>
              )}
            </Section>
          ))
        ) : (
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mt-4">
                <h3 className="text-muted">No categories available.</h3>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Product Modal */}
      <ProductModal
        show={show}
        handleClose={handleClose}
        handleLoginShow={handleLoginShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
    </React.Fragment>
  );
};

export default CategoryWise;
