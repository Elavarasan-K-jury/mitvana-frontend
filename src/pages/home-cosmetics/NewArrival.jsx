import React, { useState } from "react";
import ProductModal from "@src/commonsections/ProductModal";
import ProductCard from "./ProductCard";




const NewArrival = ({ handleLoginShow, products }) => {
  const [selectedProduct, setselectedProduct] = useState();
  const [show, setShow] = useState(false);

  const handleShow = (product) => {
    setselectedProduct(product);
    setShow(!show);
  };
  return (
    <React.Fragment>
      <section className="cat-section mt-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div>
                <h1 className="text-4xl position-relative text-center text-capitalize font-playfair text-lima fw-medium">
                  <span>New Arrivals</span>
                </h1>
                <span className="dn tt_divider">
                  <span></span>
                  <i className="la la-spa text-muted"></i>
                  <span></span>
                </span>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-8">
            {products?.map((product) => (
              <ProductCard
                handleLoginShow={handleLoginShow}
                handleShow={handleShow}
                key={product._id}
                product={product}
                colWidth = {3}
              />
            ))}
          </div>
        </div>
      </section>
      <ProductModal
        // handleLoginShow={handleLoginShow}
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
    </React.Fragment>
  );
};

export default NewArrival;
