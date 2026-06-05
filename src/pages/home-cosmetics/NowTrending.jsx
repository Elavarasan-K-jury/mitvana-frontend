import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductModal from "@src/commonsections/ProductModal";
// import MainModel from "@src/commonsections/MainModel";
import ProductCard from "./ProductCard";
import "flickity/css/flickity.css";

const NowTrending = ({ handleLoginShow, products }) => {
  const [isOpen, setIsOpen] = useState(true); // Automatically open on page load
  const [selectedProduct, setSelectedProduct] = useState();
  const [show, setShow] = useState(false);

  // Ensure modal auto-opens with a slight delay
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

 
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(!show);
  };

  return (
    <React.Fragment>
      <section className="kalles-cosmetics-trending-products pb-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-4">
                <div>
                  <h1 className="text-4xl position-relative text-center text-capitalize font-playfair text-lima fw-medium">
                    <span>Now Trending</span>
                  </h1>
                  <span className="dn tt_divider">
                    <span></span>
                    <i className="la la-spa text-muted"></i>
                    <span></span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <div className="row mt-4">
            {products?.map((product) => (
              <ProductCard
                handleLoginShow={handleLoginShow}
                handleShow={handleShow}
                colWidth={3} 
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* MainModel Component - Opens on Load */}
      {/* <MainModel isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      

      {/* Product Modal */}
      <ProductModal
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
    </React.Fragment>
  );
};

export default NowTrending;
