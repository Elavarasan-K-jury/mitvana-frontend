import React, { useState, useEffect, useContext } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import AddToCardModal from "@src/commonsections/AddToCardModal";
import Link from "next/link";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";
import { backendUrl } from "@src/api/axios";
import { useProduct } from "@src/context/ProductContext";
import { getItem, setItem } from "@src/api/localStorage";
import { useSearchStore } from "@src/store/searchStore";
import { addProductOnCart } from "@src/api/services/cartService";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";
import {
  addProductOnWishlist,
  removeProductFromWishlist,
} from "@src/api/services/wishlistService";
import { motion } from "framer-motion";
import NotifyMeModal from "@src/commonsections/NotifyMeModal";

const ProductCard = ({
  handleLoginShow,
  product,
  colWidth,
  handleShow,
  handleAddToCardModalShow,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCartItem } = useCartStore();
  const { setProductId } = useProduct();
  const { getCartDetail, getWishlistDetail, wishlistDetail } =
    useContext(CartWishlistContext);
  const { selectedColor } = useSearchStore();

  const [modalShow, setModalShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm");
  };

  const token = getItem("accessToken");

  // Optimized Add to Cart
  const handleAddtoCart = async (product, color) => {
    try {
      if (!token) {
        const existingCartItems = getItem("cartItem") || [];
        const isProductInCart = existingCartItems.some(
          (item) => item.productId === product?._id
        );

        if (!isProductInCart) {
          const obj = {
            productTitle: product?.productTitle,
            productId: product?._id,
            quantity: 1,
            selectedColor: color,
            thumbnail: product?.thumbnail,
            price: product?.price,
            discountedPrice: product?.discountedPrice,
          };
          existingCartItems.push(obj);
          setCartItem(existingCartItems);
          setItem("cartItem", existingCartItems);

          toast.success("Item added to cart", {
            position: "top-center",
          });
        }
        return;
      }

      const obj = {
        productId: product?._id,
        quantity: 1,
        selectedColor: color,
      };

      await addProductOnCart(obj);
      toast.dismiss();
      toast.success("Item added to cart", {
        position: "top-center",
      });

      await getCartDetail();
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    }
  };

  // Wishlist Add
  const handleWishlistAdd = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!token) {
        handleLoginShow();
        return;
      }

      const obj = { productId: product?._id };
      const response = await addProductOnWishlist(obj);

      if (response) {
        toast.dismiss();
        toast.success("Product added to Wishlist", {
          position: "top-center",
        });
        await getWishlistDetail();
      }
    } catch (error) {
      console.error("Wishlist add error:", error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem("productId", product._id);
    setProductId(product._id);
    router.push(`/product/${product.productCustomUrl}`);
  };

  const isProductInWishlist = wishlistDetail?.some(
    (item) => item.product._id === product?._id
  );

  // Improved Wishlist Remove
  const handleRemoveWishlist = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const res = await removeProductFromWishlist(product._id);
      if (res) {
        toast.success("Removed from wishlist", {
          position: "top-center",
        });
        await getWishlistDetail();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleNotifyMeModalClose = () => {
    setModalShow(false);
  };

  const handleNotifyMeClick = (product) => {
    setSelectedProductId(product._id);
    setModalShow(true);
  };

  return (
    <React.Fragment>
      <div className={`col-md-${colWidth} col-12`}>
        <div
          className="topbar-product-card pb-3 w-100 afacad-flux flex justify-between h-full flex-col cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="position-relative overflow-hidden flex flex-col gap-4 h-full justify-between image-container">
            {product && product?.thumbnail && (
              <>
                <div className="aspect-square flex items-center justify-center overflow-hidden relative">
                  <img
                    src={backendUrl + product?.thumbnail}
                    alt={product.name}
                    className={`absolute inset-0 w-auto h-auto max-h-[900px] max-w-full transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"
                      }`}
                    loading="lazy"
                  />
                  {product.images?.length > 0 &&
                    !isVideo(product.images[0]) && (
                      <img
                        src={backendUrl + product.images[0]}
                        alt={product.name}
                        className={`absolute inset-0 w-auto h-auto max-h-[900px] max-w-full transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                          }`}
                        loading="lazy"
                      />
                    )}
                </div>

                <button
                  type="button"
                  className="hover:bg-sky-700 cursor-pointer z-[1] text-gray-50 bg-[#193A43] py-2 transition-all duration-300 hover:scale-[1.02]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (product.stock > 0) {
                      handleAddtoCart(product, selectedColor);
                    } else {
                      handleNotifyMeClick(product);
                    }
                  }}
                >
                  {product.stock > 0 ? "Add to Cart" : "Notify Me"}
                </button>
              </>
            )}

            {/* Video on Hover */}
            {product?.images?.length > 1 && (
              <div
                className="video-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: isHovered ? "block" : "none",
                  zIndex: 2,
                }}
              >
                {isVideo(product?.images[1]) && (
                  <video
                    autoPlay
                    loop
                    muted
                    width="100%"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  >
                    <source
                      src={backendUrl + product?.images[1]}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            )}

            {/* Wishlist - Mobile */}
            {product && product._id && (
              <Link
                href="#"
                className="d-lg-none position-absolute"
                style={{ zIndex: 10, top: 20, left: 15 }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Add to Wishlist"
              >
                {isProductInWishlist ? (
                  <FaHeart
                    onClick={handleRemoveWishlist}
                    style={{ color: "#e11d48", fontSize: "22px" }}
                  />
                ) : (
                  <CiHeart
                    onClick={handleWishlistAdd}
                    style={{ fontSize: "22px" }}
                  />
                )}
              </Link>
            )}

            {/* Wishlist - Desktop */}
            {product && product._id && (
              <Link
                href="#"
                className="wishlistadd d-none d-lg-flex position-absolute"
                style={{ zIndex: 10, top: 20, right: 15 }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Add to Wishlist"
              >
                {isProductInWishlist ? (
                  <FaHeart
                    onClick={handleRemoveWishlist}
                    style={{ color: "#e11d48", fontSize: "24px" }}
                  />
                ) : (
                  <CiHeart
                    onClick={handleWishlistAdd}
                    style={{ fontSize: "24px" }}
                  />
                )}
              </Link>
            )}

            {/* Quick View */}
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link
                href=""
                data-bs-toggle="modal"
                className="btn rounded-pill fs-14"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShow(product);
                }}
              >
                <span>Quick View</span>
                <i className="iccl iccl-eye"></i>
              </Link>
            </div>

            {/* Tag */}
            {product?.tags?.length > 0 && product?.tags[0]?.name && (
              <p className="absolute top-3 left-3 z-20 w-fit h-fit px-3 py-1 bg-red-500 text-white text-xs font-medium rounded shadow-sm">
                {product.tags[0].name}
              </p>
            )}
          </div>

          <div className="mt-3">
            <h6 className="mb-1 fw-medium text-center">
              <button className="text-center main_link_acid_green line-clamp-1 w-100 hover:underline transition-all">
                {product?.name}
              </button>
            </h6>
            {product?.discountedPrice ? (
              <p className="mb-0 fs-16 text-center">
                <del className="text-muted">
                  ₹{parseInt(product.price)?.toFixed(2)}
                </del>
                &nbsp;
                <span className="font-semibold text-black">
                  ₹{parseInt(product?.discountedPrice)?.toFixed(2)}
                </span>
              </p>
            ) : (
              <p className="mb-0 fs-16 text-center font-semibold">
                ₹{parseInt(product?.price)?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      <NotifyMeModal
        modalShow={modalShow}
        handleNotifyMeModalClose={handleNotifyMeModalClose}
        selectedProductId={selectedProductId}
      />
    </React.Fragment>
  );
};

export default ProductCard;