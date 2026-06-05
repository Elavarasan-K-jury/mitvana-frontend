import React, { useState, useRef, useEffect } from "react";
import LoginModal from "@src/components/Headers/LoginModal";
import SearchModal from "@src/components/Headers/SearchModal";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import MobileHeader from "@src/components/Headers/MobileHeader";

import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { getItem } from "@src/api/localStorage";
import { getCartProducts } from "@src/api/services/cartService";
import { getWishlistProducts } from "@src/api/services/wishlistService";
import { useRouter } from "next/router";







const Header = () => {
  const headerRef = useRef(null);
  const [loginShow, setLoginShow] = useState(false);
  const [headerShow, setHeaderShow] = useState(false);
  const [isStickyActive, setIsStickyActive] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [show, setShow] = useState(null);
  const [searchShow, setSearchShow] = useState(false);
  const [shoppingShow, setShoppingShow] = useState(false);
  const [showUserDropDown, setShowUserDropDown] = useState(false);

  function handleShowUserDropDown() {
    if (!token) {
      handleLoginShow();
      return;
    }
    setShowUserDropDown(!showUserDropDown);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < lastScrollTop && scrollTop > 400) {
        setIsStickyActive(true);
      } else {
        setIsStickyActive(false);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleClick = (id) => {
    if (show === id) {
      setShow(null);
    } else {
      setShow(id);
    }
  };

  const handleClickOutside = (event) => {
    if (headerRef.current && !event.target.closest(".demo")) {
      setShow(null);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClose = () => setSearchShow(false);



  const handleShoppingClose = () => setShoppingShow(false);

  const handleHeader = () => {
    setHeaderShow(true);
    setLoginShow(false);
  };
  const handleLoginShow = () => {
    setLoginShow(true);
    setHeaderShow(false);
  };
  const handleLoginClose = () => setLoginShow(false);
  const handleHeaderClose = () => setHeaderShow(false);

  const [token, setToken] = useState(null);
  const [cartFromLocalStorage, setCartFromLocalStorage] = useState([]);

  useEffect(() => {
    setToken(getItem("accessToken"));
    setCartFromLocalStorage(getItem("cartItem") || []);
  }, []);

  const [cartDetail, setCartDetail] = useState({});
  const [wishlistDetail, setwishlistDetail] = useState([]);

  useEffect(() => {
    const getCartDetail = async () => {
      const res = await getCartProducts();
      console.log(res);
      setCartDetail(res);
    };

    const getWishlistDetail = async () => {
      const res = await getWishlistProducts();
      console.log("helloo", res);
      setwishlistDetail(res);
    };

    getCartDetail();
    getWishlistDetail();
  }, [token]);

  const router = useRouter()
  return (
    <React.Fragment>
      {/* <MainModel /> */}
      <div id="kalles-section-header_top" className="demo" ref={headerRef}>
        <nav
          className={`navbar navbar-expand-lg navbar-custom  py-0 d-flex align-items-center ${isStickyActive === true ? "headerFixed" : ""
            }`}
        >
          <div className="container-fluid">
            <Link
              className="d-lg-none"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
              onClick={handleHeader}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="16"
                viewBox="0 0 30 16"
              >
                <rect width="30" height="1.5"></rect>
                <rect y="7" width="20" height="1.5"></rect>
                <rect y="14" width="30" height="1.5"></rect>
              </svg>
            </Link>

            <Link className="navbar-brand" href="/">
              <img
                src={
                  "https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"
                }
                alt=""
                width="95"
                priority
              />
            </Link>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-none d-lg-block mx-auto">
                <Link
                  href={"/shop"}
                  style={{ margin: "0 20px", fontSize: "17px" }}
                >
                  Shop
                </Link>
                <Link
                  href={"/shop"}
                  style={{ margin: "0 20px", fontSize: "17px" }}
                >
                  Product
                </Link>
                <Link
                  href={"/shop"}
                  style={{ margin: "0 20px", fontSize: "17px" }}
                >
                  Features
                </Link>
                {/* <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown dropdown-mega-xxl">
                    <span
                      className={`nav-link position-relative ${
                        show === 2 ? "show" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => handleClick(2)}
                    >
                      Shop <span className="badge bg-teal fw-normal">New</span>
                    </span>
                    <div
                      className={`dropdown-menu p-3 ${
                        show === 2 ? "show" : ""
                      }`}
                    >
                      <Row className="g-0">
                        <Col lg={5}>
                          <Row className="g-0">
                            <Col lg={6}>
                              <div className="dropdown-sub-column-item">
                                <Link
                                  href="/shop-filter-sidebar"
                                  className="dropdown-menu-title"
                                >
                                  SHOP PAGES
                                </Link>
                                <ul className="sub-column-menu">
                                  {ShopPage.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          className="text-muted"
                                          href={item.link}
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="dropdown-sub-column-item">
                                <Link
                                  href="/shop-filter-sidebar"
                                  className="dropdown-menu-title"
                                >
                                  FEATURES
                                </Link>
                                <ul className="sub-column-menu">
                                  {ShopFeatures.map((item, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          className="text-muted position-relative d-inline-flex"
                                          href={item.link}
                                        >
                                          {item.label}
                                          <span className={item.badgeColor}>
                                            {item.badge}
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={7}>
                          <Row className="p-4">
                            {ShopImage.map((item, index) => {
                              return (
                                <Col
                                  lg={6}
                                  className="cat-section p-0"
                                  key={index}
                                >
                                  <Link
                                    href={item.link}
                                    className="d-block position-relative cat_grid_item overflow-hidden "
                                    style={{ height: "350px" }}
                                  >
                                    <div
                                      className="h-100 w-100 cat-grid-img"
                                      style={{
                                        backgroundImage: `url(${item.img.src})`,
                                      }}
                                    ></div>
                                    <div className="cat-grid-button text-body">
                                      <div className="cat_grid_item__title">
                                        {item.label}
                                      </div>
                                    </div>
                                  </Link>
                                </Col>
                              );
                            })}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </li>

                  <li className="nav-item dropdown dropdown-mega-xxl">
                    <span
                      className={`nav-link ${show === 3 ? "show" : ""}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => handleClick(3)}
                    >
                      Product
                    </span>
                    <div
                      className={`dropdown-menu ${show === 3 ? "show" : ""}`}
                    >
                      <Row className="me-4">
                        <Col lg={3}>
                          <div className="dropdown-sub-column-item">
                            <Link
                              href="/product-detail-layout-01"
                              className="dropdown-menu-title"
                            >
                              PRODUCT LAYOUT
                            </Link>
                            <ul className="sub-column-menu">
                              {ProductLayout.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      className="text-muted position-relative d-inline-flex"
                                      href={item.link}
                                    >
                                      {item.label}
                                      <span className={item.badgeColor}>
                                        {item.badge}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="dropdown-sub-column-item">
                            <Link
                              href="/product-detail-layout-01"
                              className="dropdown-menu-title"
                            >
                              PRODUCT DETAIL
                            </Link>
                            <ul className="sub-column-menu">
                              {ProductDetail.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      className="text-muted position-relative d-inline-flex"
                                      href={item.link}
                                    >
                                      {item.label}
                                      <span className={item.badgeColor}>
                                        {item.badge}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="dropdown-sub-column-item">
                            <Link
                              href="/product-detail-layout-01"
                              className="dropdown-menu-title"
                            >
                              PRODUCT SWATCH
                            </Link>
                            <ul className="sub-column-menu">
                              {ProductSwatch.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      className="text-muted"
                                      href={item.link}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="dropdown-sub-column-item">
                            <Link
                              href="/product-detail-layout-01"
                              className="dropdown-menu-title"
                            >
                              PRODUCT FEATURES
                            </Link>
                            <ul className="sub-column-menu">
                              {ProductFeatures.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      className="text-muted position-relative d-inline-flex"
                                      href={item.link}
                                      style={item.badgeStyle}
                                    >
                                      {item.lable}
                                      <span className={item.badgeColor}>
                                        {item.badge}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>
                  <li className="nav-item dropdown dropdown-mega-lg">
                    <span
                      className={`nav-link ${show === 7 ? "show" : ""}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => handleClick(7)}
                    >
                      Blog
                    </span>
                    <ul
                      className={`dropdown-menu dropdown-sub-column ${
                        show === 7 ? "show" : ""
                      }`}
                    >
                      {Blog.map((item, index) => {
                        return (
                          <li key={index}>
                            <Link className="text-muted" href={item.link}>
                              {item.lable}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="topbar-toolbar d-flex align-items-center gap-3">
              {/* <Link
                data-bs-toggle="offcanvas"
                href="#searchOffcanvas"
                aria-controls="searchOffcanvas"
                onClick={handleShow}
              >
                <i className="iccl iccl-search"></i>
              </Link> */}

              {!token && (
                <div className="relative">
                  <Link
                    className="d-md-block d-none"
                    data-bs-toggle="offcanvas"
                    href="#"
                    aria-controls="accountOffcanvas"
                    onClick={handleShowUserDropDown}
                  >
                    <i className="iccl iccl-user"></i>
                  </Link>
                </div>
              )}

              {token && wishlistDetail && (
                <Link className="d-md-block d-none" href="/wishlist">
                  <i className="iccl iccl-heart"></i>
                  {wishlistDetail?.length > 0 && (
                    <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                      {wishlistDetail?.length}
                    </span>
                  )}
                </Link>
              )}

              {token ? (
                <Link
                  data-bs-toggle="offcanvas"
                  href="/shopping-cart"
                  aria-controls="shoppingCartOffcanvas"
                // onClick={handleShoppingShow}
                >
                  <i className="iccl iccl-cart"></i>
                  {cartDetail?.items && cartDetail?.items.length > 0 && (
                    <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                      {cartDetail?.items?.length}
                    </span>
                  )}
                </Link>
              ) : (
                <Link
                  data-bs-toggle="offcanvas"
                  href="/shopping-cart"
                  aria-controls="shoppingCartOffcanvas"
                >
                  <i className="iccl iccl-cart"></i>
                  {cartFromLocalStorage.length > 0 && (
                    <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                      {cartFromLocalStorage.length}
                    </span>
                  )}
                </Link>
              )}
              {token && (
                <div className="relative">
                  <Link
                    data-bs-toggle="offcanvas"
                    href=""
                    aria-controls="shoppingCartOffcanvas"
                    onClick={handleShowUserDropDown}
                  >
                    <i className="iccl iccl-user"></i>
                  </Link>
                  {showUserDropDown && token && (
                    <div class="input absolute right-0 z-[99]">
                      <button class="value" href="/profil" onClick={() => {
                        router.push("/profile")
                      }}>
                        <svg
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 2"
                        >
                          <path
                            fill="#7D8590"
                            d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
                          ></path>
                        </svg>
                        My Account
                      </button>
                      <button class="value" onClick={() => {
                        localStorage.clear();
                        router.push(`/`)
                      }}>
                        <svg
                          fill="none"
                          viewBox="0 0 24 25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clip-rule="evenodd"
                            d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z"
                            fill="#7D8590"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="backdrop-shadow d-none"></div>
      <SearchModal show={searchShow} handleClose={handleClose} />
      <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
      <ShoppingCardModal
        shoppingShow={shoppingShow}
        handleShoppingClose={handleShoppingClose}
      />

      <MobileHeader
        headerShow={headerShow}
        handleHeaderClose={handleHeaderClose}
        loginShow={loginShow}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
    </React.Fragment>
  );
};

export default Header;
