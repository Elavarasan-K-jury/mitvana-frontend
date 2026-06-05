import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import cart1 from "@assets/images/shopping-cart/cart_image.png";
import Link from "next/link";
import { createOrder } from "@src/api/services/orderService";
import { useRouter } from "next/router";
import { useRouter as newUseRouter } from "next/navigation";
import { useCartStore } from "@src/store/cartStore";
import { getItem, removeItemByKey, setItem } from "@src/api/localStorage";
import LoginModal from "@src/components/Headers/LoginModal";
import {
  alppyCouponCode,
  validateCouponCode,
} from "@src/api/services/couponService";
import { toast } from "react-hot-toast";

import { getCartProducts } from "@src/api/services/cartService";

const AddProductForm = ({ cartDetail, getCartDetail }) => {
  const { cart, quantities } = useCartStore();
  const [isChecked, setIsChecked] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const token = getItem("accessToken");
  const [loginShow, setLoginShow] = useState(false);
  const [responseforCoupun, setResponseforCoupun] = useState();
  // console.log("cartDetail" , cartDetail.totalPrice)
  const [totalPrice, setTotalPrice] = useState("");

  // const subtotal = useMemo(() => {
  //   if (!cart?.items?.length) return 0;

  //   return cart.items.reduce((acc, item) => {
  //     const itemId = item?.product?._id;
  //     const quantity = quantities[itemId] || 1;
  //     const price = item?.product?.price || 0;

  //     return acc + price * quantity;
  //   }, 0);
  // }, [cart, quantities]);
  useEffect(() => {
    if (!token) {
      if (cartDetail && cartDetail.length > 0) {
        const calculatedTotal = cartDetail.reduce((acc, item) => {
          const quantity = quantities[item.productId] || item.quantity;
          const price = parseFloat(item?.discountedPrice || item?.price) || 0;
          return acc + price * quantity;
        }, 0);
        setTotalPrice(calculatedTotal.toFixed(2));
      }
    }
  }, [cartDetail, quantities]);

  useEffect(() => {
    localStorage.setItem("totalCartPrice", totalPrice);
  }, [totalPrice]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const router = useRouter();
  const Nrouter = newUseRouter();
  const handleOrderCreate = async () => {
    try {
      const obj = {
        couponCode,
      };
      const res = await createOrder(obj);
      if (isChecked && res?.order?._id) {
        router.push(`/checkout?order=${res.order._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);

  useEffect(() => {
    const updateCoupon = async () => {
      const totalCartValue = token
        ? parseInt(cartDetail?.totalPrice)?.toFixed(2) || 0
        : totalPrice;
      if (couponCode) {
        await applyCoupon(couponCode, totalCartValue);
      }
    };

    updateCoupon();
  }, [cartDetail?.totalPrice, totalPrice]);

  async function handleApplyCoupon() {
    const totalCartValue = token
      ? parseInt(cartDetail?.totalPrice)?.toFixed(2) || 0
      : totalPrice;

    const iscart = await getCartProducts();
    if (iscart.items.length >= 1) {
      await applyCoupon(couponCode, totalCartValue);
    }
  }

  async function applyCoupon(couponCode, totalCartValue) {
    try {
      const response = await validateCouponCode(
        couponCode,
        totalCartValue
      );

      console.log("Coupon Response:", response);

      setResponseforCoupun(response.data.coupon);
      setItem("coupon", couponCode);

      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.log("Coupon Error:", error);

      setResponseforCoupun(null);

      toast.dismiss();
      toast.error(
        error?.response?.data?.message || "Invalid coupon code"
      );
    }
  }


  useEffect(() => {
    return () => {
      removeItemByKey("coupon");
    }
  }, [])
  const handleClearCoupon = () => {
    setCouponCode("");
    removeItemByKey("coupon");
    Nrouter.refresh();
  };
  useEffect(() => {
    const iscoupun = getItem("coupon");

    if (iscoupun) {
      setCouponCode(iscoupun);
    }
  }, []);
  useEffect(() => {
    if (couponCode) {
      handleApplyCoupon();
    }
  }, []);
  return (
    <React.Fragment>
      <Row className="py-5 g-4">

        {/* Coupon Section */}

        <Col lg={6}>

          <div
            className="
        bg-white
        border
        rounded-4
        shadow-sm
        p-4
        h-100
      "
          >

            <h4 className="fw-bold mb-2">
              Have a Coupon?
            </h4>

            <p className="text-muted mb-4">
              Apply your coupon code and save on your order.
            </p>

            <div className="d-flex gap-2 flex-column flex-sm-row">

              <input
                className="form-control"
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(e.target.value)
                }
              />

              {couponCode ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleClearCoupon}
                >
                  Clear
                </button>
              ) : null}

            </div>

            <button
              className="
          btn
          btn-teal
          mt-3
          px-4
          rounded-pill
        "
              onClick={handleApplyCoupon}
              disabled={!couponCode}
            >
              Apply Coupon
            </button>

            {responseforCoupun && (
              <div
                className="
            mt-4
            p-3
            rounded-3
            bg-success-subtle
            border
          "
              >

                <h6 className="mb-1 text-success fw-bold">
                  Coupon Applied Successfully
                </h6>

                <p className="mb-0">
                  Discount:
                  {" "}
                  {responseforCoupun.discountPercentage}%
                </p>

              </div>
            )}

          </div>

        </Col>

        {/* Summary Section */}

        <Col lg={6}>

          <div
            className="
        bg-white
        border
        rounded-4
        shadow-sm
        p-4
      "
          >

            <h4 className="fw-bold mb-4">
              Order Summary
            </h4>

            {!responseforCoupun ? (

              <div
                className="
            d-flex
            justify-content-between
            align-items-center
            mb-3
          "
              >
                <span className="text-muted">
                  Subtotal
                </span>

                <span className="fw-bold fs-5">
                  ₹
                  {token
                    ? parseFloat(
                      cartDetail?.totalPrice
                    ).toFixed(2) || 0
                    : totalPrice}
                </span>
              </div>

            ) : (

              <>
                <div
                  className="
              d-flex
              justify-content-between
              mb-2
            "
                >
                  <span>
                    Original Price
                  </span>

                  <span
                    className="text-decoration-line-through text-muted"
                  >
                    ₹
                    {parseFloat(
                      cartDetail?.totalPrice
                    ).toFixed(2)}
                  </span>
                </div>

                <div
                  className="
              d-flex
              justify-content-between
              mb-2
              text-success
            "
                >
                  <span>
                    Discount
                  </span>

                  <span>
                    {responseforCoupun.discountPercentage}%
                  </span>
                </div>

                <hr />

                <div
                  className="
              d-flex
              justify-content-between
              align-items-center
              mb-3
            "
                >
                  <span className="fw-semibold">
                    Final Amount
                  </span>

                  <span
                    className="
                fw-bold
                fs-4
                text-success
              "
                  >
                    ₹
                    {token
                      ? (() => {
                        const subtotal =
                          parseFloat(
                            cartDetail?.totalPrice
                          ) || 0;

                        const discount =
                          (subtotal *
                            responseforCoupun.discountPercentage) /
                          100;

                        return (
                          subtotal - discount
                        ).toFixed(2);
                      })()
                      : totalPrice}
                  </span>

                </div>
              </>
            )}

            <p className="text-muted small mt-3">
              Taxes, shipping and discount codes
              are calculated during checkout.
            </p>

            <div
              className="
          mt-4
          p-3
          bg-light
          rounded-3
        "
            >

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  id="termsCheck"
                />

                <label
                  className="form-check-label"
                  htmlFor="termsCheck"
                >
                  I agree to the terms &
                  conditions.
                </label>

              </div>

            </div>

            <button
              className="
          btn
          btn-teal
          w-100
          mt-4
          py-3
          rounded-pill
          fw-bold
        "
              disabled={!isChecked}
              onClick={
                token
                  ? handleOrderCreate
                  : handleLoginShow
              }
            >
              Proceed To Checkout
            </button>

          </div>

        </Col>

      </Row>
    </React.Fragment>
  );
};
export default AddProductForm;
