import React, { useEffect, useState } from "react";
import HomeSection from "@pages/home-cosmetics/HomeSection";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewArrival from "@pages/home-cosmetics/NewArrival";
import NowTrending from "@pages/home-cosmetics/NowTrending";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { getProductForHomePage, getProduct } from "@src/api/services/productService";
import HeadTitle from "@src/commonsections/HeadTitle";
import Promises from "@src/components/home/Promises";
import Countries from "@src/components/home/Countries";
import Commitment from "@src/components/home/Commitment";
import HappyCustomer from "./HappyCustomer";
import MainModel from "@src/commonsections/MainModel";
import BelowFooter from "../below-footer";
import CategoryWise from "./CategoryWise";
import FloatingCartButton from "./FloatingCartButton";
import { useCartStore } from "@src/store/cartStore";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useContext } from "react";
import LoginModal from "@src/components/Headers/LoginModal";

const HomeCosmetics = () => {
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState({
    "Skin Care": [],
    "Hair Care": [],
  });
  const [loginShow, setLoginShow] = useState(false);
  const handleLoginShow = () => setLoginShow(true);
  const handleLoginClose = () => setLoginShow(false);

  const { cartItem } = useCartStore();

  const { cartDetail } =
    useContext(CartWishlistContext);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    const count = token
      ? cartDetail?.items?.length || 0
      : cartItem?.length || 0;
    setCartCount(count);
  }, [cartDetail, cartItem]);

  useEffect(() => {
    document.body.classList.add("wrapper_cus");
    return () => {
      document.body.classList.remove("wrapper_cus");
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const res = await getProductForHomePage();

      if (res) {
        console.log("New Arrival & Trending Products:", res);
        setNewArrival(res?.newArrivalProducts || []);
        setTrendingProduct(res?.trendingProducts || []);
      }
    };

    const getCategoryProducts = async () => {
      const res = await getProduct();

      if (res) {
        console.log("All Category Products:", res);


        const skinCareProducts = res.filter((p) =>
          p.category?.some((c) => c.name === "Skin Care")
        );

        const bodyCareProducts = res.filter((p) =>
          p.category?.some((c) => c.name === "Hair Care")
        );

        const categorizedProducts = {
          "Skin Care": skinCareProducts,
          "Body Care": bodyCareProducts,
        };

        console.log("Categorized Products:", categorizedProducts);
        setProductsByCategory(categorizedProducts);
      }
    };

    getProducts();
    getCategoryProducts();
  }, []);

  return (
    <React.Fragment>
      <HeadTitle title="Mitvana" />
      <HeaderCosmetics />

      <div>
        <HomeSection />

        {newArrival?.length > 0 && <NewArrival handleLoginShow={handleLoginShow} products={newArrival} />}

        {trendingProduct?.length > 0 && <NowTrending handleLoginShow={handleLoginShow} products={trendingProduct} />}

        <CategoryWise handleLoginShow={handleLoginShow} productsByCategory={productsByCategory} />

        <Commitment />

        <BelowFooter />

        <Promises />

        <Countries />

        <HappyCustomer />
        <MainModel isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <FloatingCartButton count={cartCount} />
        <FooterCosmetics />


        <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
      </div>
    </React.Fragment>
  );
};

export default HomeCosmetics;
