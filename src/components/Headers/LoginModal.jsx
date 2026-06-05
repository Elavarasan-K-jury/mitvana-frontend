import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import SignUpModal from "./SignupModal";
import { loginUser } from "@src/api/services/userService";
import RecoverPassword from "./RecoverPassword";
import { getItem, removeItemByKey } from "@src/api/localStorage";
import MamaLoader from "../Loader";

import { toast } from "react-hot-toast";
import { createPortal } from "react-dom";

const LoginModal = ({ loginShow, handleLoginClose }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrPhoneTouched, setEmailOrPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [recoverPasswordShow, setRecoverPasswordShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSignUpClose = () => {
    setSignupShow(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const data = {
        emailOrPhone,
        password,
        cartItem: getItem("cartItem"),
        totalCartPrice: getItem("totalCartPrice"),
      };

      const res = await loginUser(data);

      if (!res?.success) {
        toast.error(res?.message || "Login failed");
        return;
      }

      toast.success(res.message || "Login successful");

      window.dispatchEvent(new Event("user-login"));

      handleLoginClose();

      removeItemByKey("cartItem");
      removeItemByKey("totalCartPrice");

      if (res?.order) {
        location.href = `/checkout?order=${res.order._id}`;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setisLoading(false);
    }
  };

  const handleSignUpOpen = () => {
    setSignupShow(true);
    handleLoginClose();
  };

  const handleRecoverPasswordClose = () => {
    setRecoverPasswordShow(false);
  };

  const handleRecoverPasswordOpen = () => {
    setRecoverPasswordShow(true);
    handleLoginClose();
  };

  return (
    <>
      {loginShow &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
            }}
            onClick={handleLoginClose}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="row g-0">

                {/* Desktop Left Panel */}
                <div
                  className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center text-center text-white p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #193A43 0%, #244d58 100%)",
                    minHeight: "600px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "42px",
                      fontWeight: 700,
                    }}
                  >
                    Welcome Back
                  </h2>

                  <p
                    style={{
                      maxWidth: "280px",
                      opacity: 0.9,
                      lineHeight: "1.8",
                    }}
                  >
                    Sign in to access your orders,
                    wishlist, rewards and account details.
                  </p>
                </div>

                {/* Right Panel */}
                <div className="col-lg-7 position-relative">

                  {/* Close */}
                  <button
                    onClick={handleLoginClose}
                    className="position-absolute"
                    style={{
                      right: "20px",
                      top: "20px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#f5f5f5",
                      zIndex: 2,
                    }}
                  >
                    ✕
                  </button>

                  <div
                    className="px-4 px-md-5 py-5"
                    style={{
                      maxWidth: "520px",
                      margin: "0 auto",
                    }}
                  >
                    {/* Mobile Header */}
                    <div className="d-lg-none text-center mb-4">
                      <h2
                        style={{
                          color: "#193A43",
                          fontWeight: 700,
                        }}
                      >
                        Welcome Back
                      </h2>

                      <p className="text-muted">
                        Sign in to your Mitvana account
                      </p>
                    </div>

                    <h2
                      className="mb-2"
                      style={{
                        color: "#193A43",
                        fontWeight: 700,
                      }}
                    >
                      Sign In
                    </h2>

                    <p className="text-muted mb-4">
                      Login to continue shopping with Mitvana
                    </p>

                    {isLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center py-5"
                      >
                        <MamaLoader />
                      </div>
                    ) : (
                      <>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Email or Phone
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              type="text"
                              value={emailOrPhone}
                              onChange={(e) =>
                                setEmailOrPhone(e.target.value)
                              }
                              onBlur={() =>
                                setEmailOrPhoneTouched(true)
                              }
                              placeholder="Enter your email or phone number"
                              className="rounded-pill py-3 px-4"
                              required
                            />

                            {emailOrPhoneTouched &&
                              !emailOrPhone && (
                                <p className="mt-2 text-danger small">
                                  Email or phone field cannot be empty
                                </p>
                              )}
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label>
                              Password
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              type="password"
                              value={password}
                              onChange={(e) =>
                                setPassword(e.target.value)
                              }
                              onBlur={() =>
                                setPasswordTouched(true)
                              }
                              autoComplete="off"
                              className="rounded-pill py-3 px-4"
                              required
                            />

                            {passwordTouched &&
                              !password && (
                                <p className="mt-2 text-danger small">
                                  Password field cannot be empty
                                </p>
                              )}
                          </Form.Group>

                          <Button
                            type="submit"
                            className="w-100 rounded-pill py-3 border-0"
                            style={{
                              backgroundColor: "#193A43",
                              fontWeight: 600,
                            }}
                          >
                            SIGN IN
                          </Button>
                        </Form>

                        <div className="mt-4 text-center">

                          <p className="mb-2 text-muted">
                            New customer?{" "}
                            <Link
                              href="#"
                              onClick={handleSignUpOpen}
                              className="fw-semibold"
                            >
                              Create your account
                            </Link>
                          </p>

                          <p className="text-muted">
                            Lost password?{" "}
                            <Link
                              href="#"
                              onClick={
                                handleRecoverPasswordOpen
                              }
                              className="fw-semibold"
                            >
                              Forgot Password
                            </Link>
                          </p>

                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <SignUpModal
        signupShow={signupShow}
        handleLoginClose={handleLoginClose}
        handleSignUpClose={handleSignUpClose}
      />

      <RecoverPassword
        signupShow={recoverPasswordShow}
        handleLoginClose={handleLoginClose}
        handleSignUpClose={handleRecoverPasswordClose}
      />
    </>
  );
};

export default LoginModal;
