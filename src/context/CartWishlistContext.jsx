import { getCartProducts } from '@src/api/services/cartService';
import { getWishlistProducts } from '@src/api/services/wishlistService';
import { getItem } from '@src/api/localStorage';
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const [cartDetail, setCartDetail] = useState({
    items: [],
  });

  const [wishlistDetail, setWishlistDetail] = useState([]);


  const getCartDetail = useCallback(async () => {
    if (!getItem("accessToken")) {
      setCartDetail({ items: [] });
      return;
    }
    try {
      const res = await getCartProducts();
      setCartDetail(res);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  const getWishlistDetail = useCallback(async () => {
    console.log("TOKEN", getItem("accessToken"));

    if (!getItem("accessToken")) {
      console.log("NO TOKEN");
      setWishlistDetail([]);
      return;
    }

    try {
      const res = await getWishlistProducts();

      console.log("WISHLIST API RESPONSE", res);

      setWishlistDetail(res);

    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }, []);

  useEffect(() => {
    const refreshData = () => {
      getCartDetail();
      getWishlistDetail();
    };

    window.addEventListener("user-login", refreshData);

    return () => {
      window.removeEventListener("user-login", refreshData);
    };
  }, [getCartDetail, getWishlistDetail]);

  return (
    <CartWishlistContext.Provider
      value={{ cartDetail, wishlistDetail, getCartDetail, getWishlistDetail }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
