import React, { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getItem, setItem } from "@src/api/localStorage";
import {
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} from "@src/api/services/cartService";
import { ToastContainer, toast } from "react-toastify";

import { backendUrl } from "@src/api/axios";
import "react-toastify/dist/ReactToastify.css";
import { useCartStore } from "@src/store/cartStore";
import Link from "next/link";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import {
  Trash2,
  Minus,
  Plus
} from "lucide-react";

const CartDetail = ({ cartDetail, setloading, getCartDetailApi }) => {
  const {
    quantities,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    setCart,
    setCartItem,
  } = useCartStore();

  const { getCartDetail } = useContext(CartWishlistContext);
  const token = getItem("accessToken");
  useEffect(() => {
    if (token) {
      if (cartDetail && cartDetail.items) {
        setCart(cartDetail);
        cartDetail.items.forEach((item) => {
          const itemId = item.product?._id;
          setQuantity(itemId, item.quantity || 1);
        });
      }
    } else {
      if (cartDetail) {
        // setCart(cartDetail);
        cartDetail.forEach((item) => {
          const itemId = item.productId;
          setQuantity(itemId, item.quantity || 1);
        });
      }
    }
  }, [cartDetail, setCart, setQuantity, token]);

  const handleIncrement = async (itemId) => {
    try {
      if (!token) {
        const cartProductArray = getItem("cartItem");
        const cartProduct = cartProductArray.find(
          (item) => item.productId === itemId
        );
        cartProduct.quantity += 1;
        setItem("cartItem", cartProductArray);
        incrementQuantity(itemId);
        // localStorage.setItem("cartItem", JSON.stringify(cartProductArray));
      } else {
        setloading(true);
        incrementQuantity(itemId);
        await updateProductQuantity(itemId, quantities[itemId] + 1, 1);
        await getCartDetailApi();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setloading(false);
    }
  };

  const handleRemoveProduct = async (itemId) => {
    try {
      setloading(true);
      if (!token) {
        const cartProductArray = getItem("cartItem");
        const cartProduct = cartProductArray.find(
          (item) => item.productId === itemId
        );
        const index = cartProductArray.indexOf(cartProduct);
        cartProductArray.splice(index, 1);
        setCartItem(cartProductArray);
        setItem("cartItem", cartProductArray);
      } else {
        const res = await removeProductFromCart(itemId);
        if (res) {
          getCartDetail();
          getCartDetailApi();
        }
        toast.dismiss();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    } finally {
      setloading(false);
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      setloading(true);
      if (!token) {
        const cartProductArray = getItem("cartItem");
        const cartProduct = cartProductArray.find(
          (item) => item.productId === itemId
        );

        console.log(cartProduct);
        if (cartProduct.quantity === 1) {
          const filtered = cartProductArray.filter(
            (item) => item.productId !== itemId
          );
          setItem("cartItem", filtered);
          // localStorage.setItem("cartItem", JSON.stringify(filtered));
          setCartItem(filtered);
          toast.dismiss();
          toast.success("Item removed successfully");
        } else {
          cartProduct.quantity -= 1;
          setItem("cartItem", cartProductArray);
          decrementQuantity(itemId);
          // localStorage.setItem("cartItem", JSON.stringify(cartProductArray));
        }
      } else {
        if (quantities[itemId] === 1) {
          await handleRemoveProduct(itemId);
        } else {
          console.log(itemId);
          decrementQuantity(itemId);
          await updateProductQuantity(itemId, quantities[itemId] - 1, 0);
          await getCartDetailApi();
        }
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    } finally {
      setloading(false);
    }
  };

  if (
    token
      ? !cartDetail || cartDetail?.items?.length == 0
      : !cartDetail || cartDetail?.length == 0
  ) {
    return (
      <div className="container py-5">
        <div
          className="
    col-12
    col-md-6
    mx-auto
    text-center
    p-5
    border
    rounded-5
    bg-white
    shadow-sm
  "
        >
          <div
            className="
      mx-auto
      mb-4
      d-flex
      align-items-center
      justify-content-center
      rounded-circle
      bg-light
    "
            style={{
              width: "90px",
              height: "90px",
            }}
          >
            🛒
          </div>

          <h2 className="fw-bold mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-muted mb-4">
            Looks like you haven't added anything yet.
          </p>

          <Link href="/shop">
            <Button
              className="
        px-4
        py-2
        rounded-pill
      "
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Row className="d-none d-lg-flex border-bottom pb-3 fw-semibold text-uppercase text-muted">
        {/* Header Row */}
        <Col md={6}>PRODUCT</Col>
        <Col md={2}>PRICE</Col>
        <Col md={2}>QUANTITY</Col>
        <Col md={2}>TOTAL</Col>
      </Row>
      {token ? (
        <>
          {cartDetail?.items?.map((item) => {
            console.log("✌️item --->", item);
            const itemId = item?.product?._id;
            console.log("✌️itemId --->", itemId);
            console.log("QTY[itemID]", quantities[itemId]);
            return (
              <>
                {/* Desktop */}

                <Row
                  key={itemId}
                  className="align-items-center py-4 border-bottom d-none d-lg-flex"
                >
                <Col md={6}>
                  <div className="d-flex gap-3 align-items-start">
                    <img
                      style={{ height: "5rem" }}
                      src={backendUrl + item?.product?.thumbnail}
                      alt=""
                      width={70}
                    />
                    <div>
                      <h6>{item?.product?.name}</h6>
                      <div className="flex flex-col gap-2">
                        {item?.selectedColor?.parentColor && (
                          <p>Color: {item?.selectedColor?.parentColor}</p>
                        )}
                        <button
                          onClick={() =>
                            handleRemoveProduct(item?.product?._id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="red"
                            className="bi bi-trash-fill mt-[10px]"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={2}>
                  {/* Product Price */}₹
                  {item?.product?.discountedPrice
                    ? item?.product?.discountedPrice
                    : item?.product?.price}
                </Col>
                <Col md={2}>
                  {/* Quantity Controls */}
                  <div
                    className="
    d-flex
    align-items-center
    border
    rounded-pill
    overflow-hidden
    bg-white
  "
                  >
                    <button
                      className="px-3 py-2 border-0 bg-light"
                      onClick={() => handleDecrement(itemId)}
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3 fw-semibold">
                      {quantities[itemId]}
                    </span>

                    <button
                      className="px-3 py-2 border-0 bg-light"
                      onClick={() => handleIncrement(itemId)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </Col>
                <Col md={2}>
                  {/* Total Price */}₹
                  {(
                    (item?.product?.discountedPrice
                      ? item?.product?.discountedPrice
                      : item?.product?.price) * quantities[itemId]
                  ).toFixed(2)}
                </Col>
                </Row>
                {/* Mobile */}

                <div
                  className="
      d-lg-none
      mb-3
      p-3
      border
      rounded-4
      shadow-sm
      bg-white
    "
                >
                  <div className="d-flex gap-3">

                    <img
                      src={backendUrl + item?.product?.thumbnail}
                      alt=""
                      className="rounded-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="flex-grow-1">

                      <h6 className="fw-semibold mb-1">
                        {item?.product?.name}
                      </h6>

                      {item?.selectedColor?.parentColor && (
                        <p className="text-muted mb-2">
                          Color: {item?.selectedColor?.parentColor}
                        </p>
                      )}

                      <div className="d-flex justify-content-between align-items-center">

                        <span className="fw-bold text-success">
                          ₹
                          {item?.product?.discountedPrice ||
                            item?.product?.price}
                        </span>

                        <button
                          className="btn btn-link p-0 text-danger"
                          onClick={() =>
                            handleRemoveProduct(item?.product?._id)
                          }
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">

                    <div
                      className="
          d-flex
          align-items-center
          border
          rounded-pill
          overflow-hidden
        "
                    >
                      <button
                        className="btn btn-light border-0"
                        onClick={() => handleDecrement(itemId)}
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3 fw-semibold">
                        {quantities[itemId]}
                      </span>

                      <button
                        className="btn btn-light border-0"
                        onClick={() => handleIncrement(itemId)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-end">

                      <small className="text-muted d-block">
                        Total
                      </small>

                      <span className="fw-bold fs-5">
                        ₹
                        {(
                          (item?.product?.discountedPrice ||
                            item?.product?.price) *
                          quantities[itemId]
                        ).toFixed(2)}
                      </span>

                    </div>

                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          {cartDetail &&
            cartDetail?.map((item) => {
              const itemId = item?.productId;
              return (
                <>
                  {/* Desktop */}

                  <Row
                    key={itemId}
                    className="align-items-center py-4 border-bottom d-none d-lg-flex"
                  >
                  <Col md={6}>
                    <div className="d-flex gap-3 align-items-start">
                      <img
                        style={{ height: "5rem" }}
                        src={backendUrl + item?.thumbnail}
                        alt=""
                        width={70}
                      />
                      <div>
                        <h6>{item?.productTitle}</h6>
                        <div className="flex flex-col gap-2">
                          {item?.selectedColor?.parentColor && (
                            <p>Color: {item?.selectedColor?.parentColor}</p>
                          )}
                          <button
                            onClick={() => handleRemoveProduct(item?.productId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="red"
                              className="bi bi-trash-fill mt-[10px]"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={2}>
                    {/* Product Price */}₹{item?.discountedPrice || item?.price}
                  </Col>
                  <Col md={2}>
                    {/* Quantity Controls */}
                    <div className="input-step border rounded-full ">
                      <button onClick={() => handleDecrement(itemId)}>−</button>
                      <input
                        type="text"
                        readOnly
                        value={quantities[itemId] || 1}
                        onChange={(e) =>
                          setQuantity(itemId, Number(e.target.value))
                        }
                      />
                      <button onClick={() => handleIncrement(itemId)}>+</button>
                    </div>
                  </Col>
                  <Col md={2}>
                    {/* Total Price */}₹
                    {(
                      (item?.discountedPrice || item?.price) *
                      (quantities[itemId] || 1)
                    ).toFixed(2)}
                  </Col>
                  </Row>
                  
                  {/* Mobile */}

                  <div
                    className="
      d-lg-none
      mb-3
      p-3
      border
      rounded-4
      shadow-sm
      bg-white
    "
                  >
                    <div className="d-flex gap-3">

                      <img
                        src={backendUrl + item?.product?.thumbnail}
                        alt=""
                        className="rounded-3"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="flex-grow-1">

                        <h6 className="fw-semibold mb-1">
                          {item?.product?.name}
                        </h6>

                        {item?.selectedColor?.parentColor && (
                          <p className="text-muted mb-2">
                            Color: {item?.selectedColor?.parentColor}
                          </p>
                        )}

                        <div className="d-flex justify-content-between align-items-center">

                          <span className="fw-bold text-success">
                            ₹
                            {item?.product?.discountedPrice ||
                              item?.product?.price}
                          </span>

                          <button
                            className="btn btn-link p-0 text-danger"
                            onClick={() =>
                              handleRemoveProduct(item?.product?._id)
                            }
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">

                      <div
                        className="
          d-flex
          align-items-center
          border
          rounded-pill
          overflow-hidden
        "
                      >
                        <button
                          className="btn btn-light border-0"
                          onClick={() => handleDecrement(itemId)}
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-3 fw-semibold">
                          {quantities[itemId]}
                        </span>

                        <button
                          className="btn btn-light border-0"
                          onClick={() => handleIncrement(itemId)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-end">

                        <small className="text-muted d-block">
                          Total
                        </small>

                        <span className="fw-bold fs-5">
                          ₹
                          {(
                            (item?.product?.discountedPrice ||
                              item?.product?.price) *
                            quantities[itemId]
                          ).toFixed(2)}
                        </span>

                      </div>

                    </div>
                  </div>
                </>
              );
            })}
        </>
      )}
    </React.Fragment>
  );
};

export default CartDetail;
