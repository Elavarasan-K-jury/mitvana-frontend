"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import LoginModal from "@src/components/Headers/LoginModal";
import SearchModal from "@src/components/Headers/SearchModal";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import { useSearchStore } from "@src/store/searchStore";
import useCart from "@src/store/useCart";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  X,
  Store,
  BookOpen,
  FlaskConical,
  Heart,
  LogOut,
  Package,
  UserCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

import MobileHeader from "@src/components/Headers/MobileHeader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { getItem, getName } from "@src/api/localStorage";
import { useRouter } from "next/router";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getProduct } from "@src/api/services/productService";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";
import { getCategory } from "@src/api/services/categoryService";
import { usePathname } from "next/navigation";
import LogoutModal from "../pages/profile/components/LogoutModal";


const HeaderCosmetics = ({ loginShowProp, searchValue: externalSearchValue, setSearchValue: externalSetSearchValue }) => {
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const searchValue = externalSearchValue !== undefined ? externalSearchValue : internalSearchValue;
  const setSearchValue = externalSetSearchValue || setInternalSearchValue;
  const headerRef = useRef(null);
  const [loginShow, setLoginShow] = useState(loginShowProp || false);
  const [headerShow, setHeaderShow] = useState(false);
  const [isStickyActive, setIsStickyActive] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [show, setShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [shoppingShow, setShoppingShow] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const {
    searchClicked,
    setSearchClicked,
    fullProductData,
    handleOnSearch,
    setFullProductData,
    searchProductsFullData,
  } = useSearchStore();
  const { setCartItem, cartItem: newCartItem } = useCartStore();
  const { cartDetail, wishlistDetail, getCartDetail, getWishlistDetail } =
    useContext(CartWishlistContext);

  const pathname = usePathname();

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

  useEffect(() => {
    const handleLogout = () => {
      setToken(null);
      setUserName("");
    };

    window.addEventListener("user-logout", handleLogout);

    return () => {
      window.removeEventListener("user-logout", handleLogout);
    };
  }, []);

  const [showUserDropDown, setShowUserDropDown] = useState(false);

  const handleClick = () => {
    setShow(!show);
    // if (show === id) {
    //   setShow(null);
    // } else {
    //   setShow(id);
    // }
  };

  function handleShowUserDropDown() {
    if (!token) {
      handleLoginShow();
      return;
    }
    setShowUserDropDown(!showUserDropDown);
  }
  const handleClickOutside = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setShow(null);
    }
  };

  const handleSignUpClose = () => {
    setSignupShow(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClose = () => setSearchShow(false);
  const handleShow = () => setSearchShow(true);
  const router = useRouter();

  const handleShoppingClose = () => setShoppingShow(false);
  const handleShoppingShow = () => setShoppingShow(true);

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
  const cartItem = useCart();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      setToken(getItem("accessToken"));

      const user = getName();

      console.log("Stored User Name:", user);

      setUserName(user ?? "");
    };

    loadUser();

    window.addEventListener("user-login", loadUser);

    return () => {
      window.removeEventListener("user-login", loadUser);
    };
  }, []);

  // const [cartDetail, setCartDetail] = useState({});
  // const [wishlistDetail, setwishlistDetail] = useState([]);

  // const getCartDetail = async () => {
  //   const res = await getCartProducts();
  //   console.log(res);
  //   setCartDetail(res);
  // };

  // const getWishlistDetail = async () => {
  //   const res = await getWishlistProducts();
  //   console.log("helloo", res);
  //   setwishlistDetail(res);
  // };

  useEffect(() => {
    getCartDetail();
    getWishlistDetail();
  }, [token]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resProduct = await getProduct();
        setFullProductData(resProduct);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  // Initialize the store with the initial product data
  useEffect(() => {
    setFullProductData(fullProductData);
  }, [fullProductData, setFullProductData]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchProductsFullData.length === 0) {
      router.push("/shop");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resCategory = await getCategory();
        setCategoryData(
          resCategory?.filter((item) => item.isVisibleInNavigation)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const refreshUserData = () => {
      setToken(getItem("accessToken"));

      getCartDetail();
      getWishlistDetail();
    };

    window.addEventListener(
      "user-login",
      refreshUserData
    );

    return () => {
      window.removeEventListener(
        "user-login",
        refreshUserData
      );
    };
  }, [getCartDetail, getWishlistDetail]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (pathname === "/search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();

    setToken(null);
    setUserName("");

    window.dispatchEvent(new Event("user-logout"));

    setShowUserDropDown(false);

    toast.success("Logged out successfully");

    router.replace("/");
  };


  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container">
          {/* Top Row */}
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="https://www.silkrute.com/images/detailed/4197/41Hf8D9I9lL.jpg"
                alt="Mitvana"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
              <div className="flex w-full overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-sm">

                <div className="flex items-center px-4">
                  <Search size={18} className="text-gray-400" />
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent py-3 outline-none text-gray-700"
                />

                <button
                  onClick={() => router.push(`/search?q=${searchValue}`)}
                  className="bg-customPrimary px-6 text-white font-medium"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-5">

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative"
              >
                <Heart
                  size={24}
                  className="
      text-gray-700
      transition-all
      duration-300
      hover:text-red-500
      hover:scale-110
    "
                />

                {wishlistDetail?.length > 0 && (
                  <span
                    className="
    absolute
    -top-2
    -right-2
    h-5
    w-5
    rounded-full
    bg-customPrimary
    text-white
    text-xs
    flex
    items-center
    justify-center
  "
                  >
                    {wishlistDetail.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/shopping-cart"
                className="relative"
              >
                <ShoppingCart
                  size={24}
                  className="
    text-gray-700
    transition-all
    duration-300
    hover:text-customPrimary
    hover:scale-110
  "
                />

                {(token
                  ? cartDetail?.items?.length
                  : newCartItem?.length) > 0 && (
                    <span
                      className="
          absolute
          -top-2
          -right-2
          h-5
          w-5
          rounded-full
          bg-customPrimary
          text-white
          text-xs
          flex
          items-center
          justify-center
        "
                    >
                      {token
                        ? cartDetail?.items?.length
                        : newCartItem?.length}
                    </span>
                  )}
              </Link>

              {/* Login / Profile */}
              <div className="relative">

                {!token ? (
                  <button
                    onClick={handleLoginShow}
                    className="
    flex
    items-center
    gap-2
    px-3 md:px-4
    py-2
    rounded-full
    border
    border-customPrimary
    text-customPrimary
    hover:bg-customPrimary
    hover:text-white
    transition
    text-sm md:text-base
    whitespace-nowrap
  "
                  >
                    <User size={18} />
                    <span>Login / Sign Up</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleShowUserDropDown}
                      className="
            flex
            items-center
            gap-2
            rounded-full
            bg-gray-100
            px-3
            py-2
            hover:bg-gray-200
          "
                    >
                      <div
                        className="
              w-8
              h-8
              rounded-full
              bg-customPrimary
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
                      >
                        {userName?.charAt(0)?.toUpperCase()}
                      </div>

                      <span
                        className="
    font-medium
    max-w-[90px]
    truncate
  "
                      >
                        {userName || "Account"}
                      </span>

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5 7l5 5 5-5H5z" />
                      </svg>
                    </button>

                      {showUserDropDown && (
                        <div
                          className="
      absolute
      right-0
      mt-2
      w-56
      bg-white
      rounded-xl
      shadow-lg
      border
      overflow-hidden
      z-50
    "
                        >
                          <button
                            onClick={() => {
                              router.push("/profile");
                              setShowUserDropDown(false);
                            }}
                            className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        hover:bg-gray-50
        transition-all
      "
                          >
                            <UserCircle size={18} />
                            <span>My Profile</span>
                          </button>

                          {/* <button
                            onClick={() => {
                              router.push("/orders");
                              setShowUserDropDown(false);
                            }}
                            className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        hover:bg-gray-50
        transition-all
      "
                          >
                            <Package size={18} />
                            <span>My Orders</span>
                          </button> */}

                          <div className="border-t" />

                          <button
                            onClick={() => setShowLogoutModal(true)}
                            className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        text-red-500
        hover:bg-red-50
        transition-all
      "
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                  </>
                )}

              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center border-t border-gray-100 bg-white">
            <nav className="flex items-center gap-16 py-4">

              {/* Shop */}
              <Link
                href="/shop"
                className={`
        relative flex items-center gap-2
        px-4 py-2 rounded-full
        transition-all duration-300

        ${pathname === "/shop"
                    ? "text-customPrimary bg-customPrimary/10"
                    : "text-gray-700 hover:text-customPrimary hover:bg-gray-50"
                  }
      `}
              >
                <Store size={18} />

                <span className="font-medium">
                  Shop
                </span>

                {pathname === "/shop" && (
                  <span
                    className="
            absolute
            -bottom-4
            left-1/2
            -translate-x-1/2

            w-2
            h-2

            rounded-full
            bg-customPrimary

            shadow-[0_0_12px_rgba(255,107,53,0.8)]
          "
                  />
                )}
              </Link>

              {/* Story */}
              <Link
                href="/our-story"
                className={`
        relative flex items-center gap-2
        px-4 py-2 rounded-full
        transition-all duration-300

        ${pathname === "/our-story"
                    ? "text-customPrimary bg-customPrimary/10"
                    : "text-gray-700 hover:text-customPrimary hover:bg-gray-50"
                  }
      `}
              >
                <BookOpen size={18} />

                <span className="font-medium">
                  Our Story
                </span>

                {pathname === "/our-story" && (
                  <span
                    className="
            absolute
            -bottom-4
            left-1/2
            -translate-x-1/2

            w-2
            h-2

            rounded-full
            bg-customPrimary

            shadow-[0_0_12px_rgba(255,107,53,0.8)]
          "
                  />
                )}
              </Link>

              {/* Research */}
              <Link
                href="/our-research"
                className={`
        relative flex items-center gap-2
        px-4 py-2 rounded-full
        transition-all duration-300

        ${pathname === "/our-research"
                    ? "text-customPrimary bg-customPrimary/10"
                    : "text-gray-700 hover:text-customPrimary hover:bg-gray-50"
                  }
      `}
              >
                <FlaskConical size={18} />

                <span className="font-medium">
                  Our Research
                </span>

                {pathname === "/our-research" && (
                  <span
                    className="
            absolute
            -bottom-4
            left-1/2
            -translate-x-1/2

            w-2
            h-2

            rounded-full
            bg-customPrimary

            shadow-[0_0_12px_rgba(255,107,53,0.8)]
          "
                  />
                )}
              </Link>

            </nav>
          </div>
        </div>
      </header>
      <div className="lg:hidden bg-white border-t border-gray-100">

        <div className="flex justify-around py-2">

          <Link
            href="/shop"
            className={`
        flex flex-col items-center
        px-3 py-2 rounded-xl
        transition-all duration-300

        ${pathname === "/shop"
                ? "bg-customPrimary/10 text-customPrimary"
                : "text-gray-600"
              }
      `}
          >
            <Store size={18} />

            <span className="text-xs font-medium mt-1">
              Shop
            </span>
          </Link>

          <Link
            href="/our-story"
            className={`
        flex flex-col items-center
        px-3 py-2 rounded-xl
        transition-all duration-300

        ${pathname === "/our-story"
                ? "bg-customPrimary/10 text-customPrimary"
                : "text-gray-600"
              }
      `}
          >
            <BookOpen size={18} />

            <span className="text-xs font-medium mt-1">
              Story
            </span>
          </Link>

          <Link
            href="/our-research"
            className={`
        flex flex-col items-center
        px-3 py-2 rounded-xl
        transition-all duration-300

        ${pathname === "/our-research"
                ? "bg-customPrimary/10 text-customPrimary"
                : "text-gray-600"
              }
      `}
          >
            <FlaskConical size={18} />

            <span className="text-xs font-medium mt-1">
              Research
            </span>
          </Link>

        </div>

      </div>
      <div className="md:hidden px-4 py-3 bg-white">
        <div
          className="
      flex
      items-center
      h-12
      px-4
      rounded-full
      border
      border-gray-200
      bg-gray-50
      shadow-sm
    "
        >
          <Search
            size={18}
            className="text-gray-400 mr-3"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="
        flex-1
        bg-transparent
        outline-none
        text-sm
        text-gray-700
      "
          />

          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="ml-2"
            >
              <X
                size={16}
                className="text-gray-400"
              />
            </button>
          )}
        </div>
      </div>
      {/* <div className="bg-white lg:flex justify-center items-center py-2 container border-t relative hidden">
        <div
          className="w-[40%] flex justify-between text-xl"
          onMouseLeave={() => setShow(false)} // Hide menu only when mouse leaves this container
        >
          <Link
            href="/shop"
            onMouseEnter={() => setShow(true)} // Show the menu when hovering over "Shop"
          >
            Shop
          </Link>
          <Link   href="/our-story">Our Story</Link>
          <Link href="/our-research">Our Research</Link>
        </div>

        <div
          className={`absolute bg-white px-3 py-2  z-20 left-[30%] ${
            show ? "" : "hidden"
          }`}
          style={{
            top: `${categoryData.length + 30}px`, // Dynamically adjust bottom value based on the length of categoryData
          }}
          onMouseEnter={() => setShow(true)} // Keep the menu open when hovering over the dropdown
          onMouseLeave={() => setShow(false)} // Hide the menu when leaving the dropdown
        >
          <div className="flex flex-col flex-wrap gap-x-8 gap-2">
            {categoryData.map((item, index) => (
              <div key={index}>
                <Link
                  className="text-muted text-base"
                  href={`/product-category/${item.customURL}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <SearchModal show={searchShow} handleClose={handleClose} />
      <LoginModal
        handleSignUpClose={handleSignUpClose}
        loginShow={loginShow}
        handleLoginClose={handleLoginClose}
      />
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
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </React.Fragment>
  );
};

export default HeaderCosmetics;

// <div
//         id="kalles-section-header_top"
//         className="cosmetics-navbar"
//         ref={headerRef}
//       >
//         <nav
//           className={`navbar px-20 navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? "headerFixed" : ""
//             }`}
//         >
//           <div className="container d-inline-block">
//             <div className={`row align-items-center justify-center flex-nowrap ${!showSearchbar ? "w-full" : 'w-fit'}`}>
//               <div className=" col-lg-1 col w-fit">
//                 <div className="text-center">
//                   <Link className="navbar-brand mx-auto" href="/">
//                     <img
//                       src={
//                         "https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"
//                       }
//                       alt=""
//                       className="max-w-160 d-none d-lg-block"
//                       style={{ height: "90px", width: "120px" }}
//                     />
//                     <img
//                       src={
//                         "https://mitvana.com/wp-content/uploads/2021/08/mitvana.png"
//                       }
//                       alt=""
//                       className="max-w-65 d-lg-none d-block"
//                     />
//                   </Link>
//                 </div>
//               </div>

//               {/* {showSearchbar ? (
//                 <div className="mt-4 w-full flex justify-center items-center">
//                   <ReactSearchAutocomplete
//                     items={fullProductData}
//                     fuseOptions={{ keys: ['productTitle', 'productDescription', 'description', 'ingredients'] }}
//                     onSearch={handleOnSearch}
//                     onSelect={(item) => {
//                       router.push(`/product/${item.productCustomUrl}`);
//                     }}
//                     onKeyDown={handleKeyDown}
//                     className="w-full z-50"
//                   />
//                   <Link
//                     href="#!"
//                     role="presentation"
//                     data-bs-toggle="modal"
//                     data-bs-target="#searchModal"
//                     onClick={() => {
//                       if (searchProductsFullData.length == 0 && searchClicked) {
//                         router.push("/shop");
//                       } else {
//                         return;
//                       }
//                     }}
//                   >
//                   </Link>
//                 </div>
//               ) : (
//                 <div className={`${!showSearchbar ? "hidden" : "block"}`} ></div>
//               )} */}
//               <div className=" col-lg-2 col flex justify-center items-center">
//                 <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end cosmetics-header">
//                   {/* <Link href={""}>

//                     <i
//                       className="iccl iccl-search"
//                       onClick={() => {
//                         setShowSearchbar(true);
//                       }}
//                     ></i>
//                   </Link> */}

//                   {!token && (
//                     <>
//                       <Link
//                         className="d-none d-md-block"
//                         data-bs-toggle="offcanvas"
//                         href="#login"
//                         aria-controls="accountOffcanvas"
//                         onClick={handleLoginShow}
//                       >
//                         <i className="iccl iccl-user"></i>
//                       </Link>
//                     </>
//                   )}

//                   {token && (
//                     <>
//                       <Link className="d-md-block d-none" href="/wishlist">
//                         <i className="iccl iccl-heart"></i>
//                         {wishlistDetail?.length > 0 && (
//                           <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
//                             {wishlistDetail?.length}
//                           </span>
//                         )}
//                       </Link>
//                     </>
//                   )}

//                   {token ? (
//                     <Link
//                       data-bs-toggle="offcanvas"
//                       href="/shopping-cart"
//                       aria-controls="shoppingCartOffcanvas"
//                     // onClick={handleShoppingShow}
//                     >
//                       <i className="iccl iccl-cart"></i>
//                       {cartDetail?.items && cartDetail?.items.length > 0 && (
//                         <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
//                           {cartDetail?.items?.length}
//                         </span>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       data-bs-toggle="offcanvas"
//                       href="/shopping-cart"
//                       aria-controls="shoppingCartOffcanvas"
//                     // onClick={handleShoppingShow}
//                     >
//                       <i className="iccl iccl-cart"></i>
//                       {newCartItem?.length > 0 && (
//                         <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
//                           {newCartItem?.length}
//                         </span>
//                       )}
//                     </Link>
//                   )}

//                   {/* <Link
//                       data-bs-toggle="offcanvas"
//                       href="/shopping-cart"
//                       aria-controls="shoppingCartOffcanvas"
//                     // onClick={handleShoppingShow}
//                     >
//                       <i className="iccl iccl-cart"></i>
//                       {cartDetail?.items && cartDetail?.items.length > 0 && (
//                         <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
//                           {cartDetail?.items?.length}
//                         </span>
//                       )}
//                     </Link> */}

//                   {token && (
//                     <div className="relative">
//                       <Link
//                         data-bs-toggle="offcanvas"
//                         href=""
//                         aria-controls="shoppingCartOffcanvas"
//                         onClick={handleShowUserDropDown}
//                       >
//                         <i className="iccl iccl-user"></i>
//                       </Link>
//                       {showUserDropDown && token && (
//                         <div
//                           class="  input absolute right-0 z-[99]"
//                           style={{ backgroundColor: "#EFEFEF" }}
//                         >
//                           <button
//                             class="value"
//                             href="/profil"
//                             onClick={() => {
//                               router.push("/profile");
//                               setShowUserDropDown(false);
//                             }}
//                           >
//                             <svg
//                               viewBox="0 0 16 16"
//                               xmlns="http://www.w3.org/2000/svg"
//                               data-name="Layer 2"
//                             >
//                               <path
//                                 fill="#7D8590"
//                                 d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z"
//                               ></path>
//                             </svg>
//                             My Account
//                           </button>
//                           <button
//                             class="value"
//                             onClick={() => {
//                               localStorage.clear();
//                               router.push(`/`);
//                               setShowUserDropDown(false);
//                             }}
//                           >
//                             <svg
//                               fill="none"
//                               viewBox="0 0 24 25"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 clip-rule="evenodd"
//                                 d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z"
//                                 fill="#7D8590"
//                                 fill-rule="evenodd"
//                               ></path>
//                             </svg>
//                             Log Out
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
// <div className="lg:hidden flex gap-5 md:gap-10 justify-center items-center px-4 w-full">
//   <Link
//     className={`nav-link position-relative ${show === 2 ? "show" : ""
//       }`}
//     href="/shop"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//     onClick={() => handleClick(2)}
//   >
//     Shop
//   </Link>
//   <Link
//     className={`nav-link ${show === 3 ? "show" : ""}`}
//     href="#"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//     onClick={() => handleClick(3)}
//   >
//     Our Story
//   </Link>
//   <Link
//     className={`nav-link ${show === 7 ? "show" : ""}`}
//     href="/our-research"
//     role="button"
//     data-bs-toggle="dropdown"
//     aria-expanded="false"
//     onClick={() => handleClick(7)}
//   >
//     Our Research
//   </Link>
// </div>
//         </nav>
//       </div>
