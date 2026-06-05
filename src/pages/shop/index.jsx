import React, { useState, useEffect } from "react";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/pages/shop/FilterTab";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import BelowFooter from "../below-footer";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { useRouter } from "next/router";
import LoginModal from "@src/components/Headers/LoginModal";
import FloatingCartButton from "@src/pages/home-cosmetics/FloatingCartButton";
import { useCartStore } from "@src/store/cartStore";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useContext } from "react";

const FilterSiderbar = () => {
  const router = useRouter();

  const [loginShow, setLoginShow] = useState(false);
    const { cartItem } = useCartStore();
  
    const { cartDetail } =
      useContext(CartWishlistContext);
  
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const count = token ? cartDetail?.items?.length || 0 : cartItem?.length || 0;
      setCartCount(count);
    }, [cartDetail, cartItem]);

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleSignUpClose = () => {
    setSignupShow(false);
  };
  const handleLoginClose = () => setLoginShow(false);
  return (
    <React.Fragment>
      <HeadTitle title="Mitvana - Shop" />
      <TopBanner />

      {/* header */}
      <HeaderCosmetics loginShowProp = {loginShow}/>

      <div >
        {/* <ShopNavbar /> */}
        <WomenColting />
        <FilterTab handleLoginShow={handleLoginShow} SelectedCategory={""} />
        {/* <div className="filter-pagination">
                    <ul className="pagination py-4 d-flex justify-content-center">
                        <li className="active"><Link href="#" className="text-danger">1</Link></li>
                        <li><Link href="#">2</Link></li>
                        <li><Link href="#">3</Link></li>
                        <li><Link href="#">4</Link></li>
                        <li><Link href="#">Next</Link></li>
                    </ul>
                </div> */}
      </div>
      <FloatingCartButton count={cartCount} />
      <FooterCosmetics />
      {/* <BelowFooter /> */}

      {/* <PopupPage /> */}

      <LoginModal
        handleSignUpClose={handleSignUpClose}
        loginShow={loginShow}
        handleLoginClose={handleLoginClose}
      />
    </React.Fragment>
  );
};
export default FilterSiderbar;
