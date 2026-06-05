import React, { useState, useEffect } from "react";
import "swiper/css";
import { getReview } from "@src/api/services/reviewService";
import { backendUrl } from "@src/api/axios";
import { addProductOnCart } from "@src/api/services/cartService";
import { getItem } from "@src/api/localStorage";
import { addProductOnWishlist } from "@src/api/services/wishlistService";
import { toast } from "react-hot-toast";
import { getProductById } from "@src/api/services/productService";
import { Rating } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

const ProductModal = ({
  handleLoginShow = () => {},
  show,
  handleClose,
  selectedProductId,
  selectedProductCustomUrl,
}) => {
  const [selectedColor, setSelectedColor] = useState("Pink");
  const [reviews, setReviews] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  const [avgRating, setAvgRating] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const [varientId, setVarientId] = useState();
  const [selectedMainProduct, setselectedMainProduct] =
    useState(selectedProductId);
  const [selectedMainProductURL, setselectedMainProductURL] = useState(
    selectedProductCustomUrl
  );

  const [presentInCart, setpresentInCart] = useState(false);
  const token = getItem("accessToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setselectedMainProduct(selectedMainProduct);
        const res = await getReview(selectedMainProduct);
        const res2 = await getProductById(selectedMainProductURL);
        setProductVariants(
          [
            res2?.product,
            res2?.product?.productSelected,
            ...res2?.relatedProducts,
          ] || []
        );
        setSelectedProduct(res2?.product);
        setReviews(res?.reviews);
        setAvgRating(res?.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedMainProduct) fetchReviews();
  }, [selectedMainProduct, selectedMainProductURL]);

  useEffect(() => {
    setselectedMainProduct(selectedProductId);
    setselectedMainProductURL(selectedProductCustomUrl);
  }, [selectedProductId, selectedProductCustomUrl]);

  const handleChangeVariant = (item) => {
    setSelectedProduct(item);
    // setselectedMainProduct(item?._id)
    // setselectedMainProductURL(item?.productCustomUrl)
  };

  useEffect(() => {
    setSize(selectedProduct?.size);
    setPrice(selectedProduct?.price);
    setVarientId(selectedProduct?._id);
  }, [selectedProduct]);

  const handleAddtoCart = async () => {
    try {
      if (!token) {
        handleClose();

        setTimeout(() => {
          handleLoginShow();
        }, 100);

        return;
      }

      const obj = {
        productId: selectedProduct?._id,
        quantity: quantity,
      };

      await addProductOnCart(obj);
      toast.dismiss();
      toast.success("item added to Cart", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlistAdd = async () => {
    try {
      if (!token) {
        handleClose();
        setTimeout(() => {
          handleLoginShow();
        }, 1000);
        return;
      }
      const obj = {
        productId: selectedProduct?._id,
        variantId: varientId,
      };
      const response = await addProductOnWishlist(obj);
      if (response) {
        toast.dismiss();
        toast.success("Product added to Wishlist", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log("✌️error from wishlist vala --->", error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  const handleChange = (event) => {
    const value = Math.max(0, Math.min(100, Number(event.target.value)));
    setQuantity(value);
  };

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm"); // Add more video extensions if necessary
  };

  const [thumbnailImage, setThumbnailImage] = useState();
  const [images, setImages] = useState([]); // Use state for images
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const productImages = selectedProduct?.images
      ? [...selectedProduct.images]
      : [];

    if (selectedProduct?.thumbnail) {
      productImages.unshift(selectedProduct.thumbnail);
      setThumbnailImage(selectedProduct.thumbnail);
    }

    setImages(productImages);
  }, [selectedProduct]);

  const handleLeftClick = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setThumbnailImage(images[newIndex]);
  };

  // Handle right button click
  const handleRightClick = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setThumbnailImage(images[newIndex]);
  };
  return (
    <React.Fragment>
      {show &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 p-md-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
            }}
            onClick={handleClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-4 overflow-hidden shadow-2xl"
              style={{
                width: "95%",
                maxWidth: "1400px",
                height: "90vh",
              }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="position-absolute"
                style={{
                  right: "70px",
                  top: "80px",
                  zIndex: 20,
                  width: "45px",
                  height: "45px",
                  border: "none",
                  borderRadius: "50%",
                  background: "#f5f5f5",
                }}
              >
                ✕
              </button>

              <div className="row g-0">
                {/* LEFT SIDE */}
                <div
                  className="col-lg-6 border-end"
                  style={{
                    background: "#fafafa",
                  }}
                >
                  <div
                    className="position-relative d-flex align-items-center justify-content-center"
                    style={{
                      height: "calc(90vh - 90px)",
                      padding: "20px",
                    }}
                  >
                    {/* Left Arrow */}
                    <button
                      onClick={handleLeftClick}
                      className="position-absolute"
                      style={{
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "none",
                        background: "rgba(0,0,0,.55)",
                        color: "#fff",
                      }}
                    >
                      <ChevronLeft />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={handleRightClick}
                      className="position-absolute"
                      style={{
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "none",
                        background: "rgba(0,0,0,.55)",
                        color: "#fff",
                      }}
                    >
                      <ChevronRight />
                    </button>

                    {/* Image */}
                    {thumbnailImage && !isVideo(thumbnailImage) ? (
                      <img
                        src={backendUrl + thumbnailImage}
                        alt="Selected Product"
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "650px",
                          objectFit: "contain",
                          borderRadius: "16px",
                        }}
                      />
                    ) : (
                      <video
                        controls
                        autoPlay
                        style={{
                          maxHeight: "600px",
                          maxWidth: "100%",
                          objectFit: "contain",
                          borderRadius: "16px",
                        }}
                      >
                        <source
                          src={backendUrl + thumbnailImage}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  <div
                    className="d-flex justify-content-center gap-2 px-4"
                    style={{
                      height: "80px",
                      overflowX: "auto",
                      overflowY: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {images?.map((img, index) => (
                      <img
                        key={index}
                        src={backendUrl + img}
                        alt=""
                        onClick={() => {
                          setThumbnailImage(img);
                          setCurrentIndex(index);
                        }}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          cursor: "pointer",
                          border:
                            thumbnailImage === img
                              ? "2px solid #193A43"
                              : "1px solid #ddd",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                  className="col-lg-6"
                >
                  <div
                    style={{
                      height: "90vh",
                      overflowY: "auto",
                      paddingBottom: "40px",
                    }}
                  >
                  <div className="p-4 p-lg-5">

                    {/* Product Name */}
                    <h2
                      className="fw-bold mb-2"
                      style={{
                        color: "#193A43",
                      }}
                    >
                      {selectedProduct?.name}
                    </h2>

                    {selectedProduct?.productSubtitle && (
                      <p className="text-muted">
                        {selectedProduct?.productSubtitle}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {avgRating && (
                        <Rating
                          name="read-only"
                          value={parseInt(avgRating)}
                          readOnly
                        />
                      )}
                      <span>
                        ({reviews?.length} reviews)
                      </span>
                    </div>

                    <p className="text-muted small">
                      <b>200+</b> bought in past month
                    </p>

                    <hr />

                    {/* Price */}
                    {selectedProduct?.discountedPrice ? (
                      <>
                        <p
                          className="mb-1 text-muted"
                          style={{
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{parseInt(price)?.toFixed(2)}
                        </p>

                        <h2
                          className="fw-bold"
                          style={{
                            color: "#193A43",
                          }}
                        >
                          ₹
                          {parseInt(
                            selectedProduct.discountedPrice
                          )?.toFixed(2)}
                        </h2>

                        <p className="text-success">
                          You saved ₹
                          {(
                            parseInt(price) -
                            parseInt(selectedProduct.discountedPrice)
                          ).toFixed(2)}
                        </p>

                        <small className="text-muted">
                          Inclusive of all taxes
                        </small>
                      </>
                    ) : (
                      <h2>₹{parseInt(price)?.toFixed(2)}</h2>
                    )}

                    {/* Variant Section */}
                    {productVariants?.length > 0 && (
                      <>
                        <h6 className="fw-bold text-uppercase mt-4">
                          Select Variant
                        </h6>

                        <div className="d-flex flex-wrap gap-3 mt-3">
                          {productVariants.map(
                            (item, index) =>
                              item?._id && (
                                <div
                                  key={index}
                                  onClick={() =>
                                    handleChangeVariant(item)
                                  }
                                  className="rounded-3 overflow-hidden"
                                  style={{
                                    width: "150px", width: "130px",
                                    minHeight: "110px",
                                    cursor: "pointer",
                                    border:
                                      item?._id === selectedProduct?._id
                                        ? "2px solid #193A43"
                                        : "1px solid #ddd",
                                  }}
                                >
                                  <div
                                    style={{
                                      background:
                                        item?._id === selectedProduct?._id
                                          ? "#193A43"
                                          : "#f5f5f5",
                                      color:
                                        item?._id === selectedProduct?._id
                                          ? "#fff"
                                          : "#000",
                                      padding: "10px",
                                      textAlign: "center",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item?.sizeOrColor}
                                  </div>

                                  <div className="p-3">
                                    <div className="fw-bold">
                                      ₹
                                      {parseInt(
                                        item?.discountedPrice
                                      )?.toFixed(2)}
                                    </div>

                                    <s className="text-muted">
                                      ₹
                                      {parseInt(item?.price)?.toFixed(2)}
                                    </s>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </>
                    )}

                    {/* Quantity + Cart */}
                      <div
                        className="d-flex flex-wrap gap-3 align-items-center mt-4 pt-3"
                        style={{
                          position: "sticky",
                          bottom: 0,
                          background: "#fff",
                          paddingBottom: "15px",
                          zIndex: 5,
                        }}
                      >
                      {!presentInCart && (
                        <div className="input-step border border-dark rounded-pill">
                          <button
                            className="minus"
                            onClick={() =>
                              handleQuantityChange(-1)
                            }
                          >
                            –
                          </button>

                          <input
                            type="text"
                            className="product-quantity"
                            value={quantity}
                            readOnly
                          />

                          <button
                            className="plus"
                            onClick={() =>
                              handleQuantityChange(1)
                            }
                          >
                            +
                          </button>
                        </div>
                      )}

                      <button
                        onClick={handleAddtoCart}
                        className="btn rounded-pill px-4 py-2"
                        style={{
                          background: "#193A43",
                          color: "#fff",
                        }}
                      >
                        {presentInCart
                          ? "Added To Cart"
                          : "Add To Cart"}
                      </button>

                      <button
                        onClick={handleWishlistAdd}
                        className="rounded-circle border"
                        style={{
                          width: "42px",
                          height: "42px",
                          background: "#fff",
                        }}
                      >
                        <i className="facl facl-heart-o"></i>
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

    </React.Fragment>
  );
};
export default ProductModal;
