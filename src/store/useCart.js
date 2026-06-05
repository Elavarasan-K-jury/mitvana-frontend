"use client";
import { getItem } from "@src/api/localStorage";
import { useEffect, useState } from "react";

const useCart = () => {
  const [cartFromLocalStorage, setCartFromLocalStorage] = useState([]);

  useEffect(() => {
    const storedCartItems = getItem("cartItem") || [];
    setCartFromLocalStorage(storedCartItems);

    const handleStorageChange = () => {
      const storedCartItems = getItem("cartItem") || [];
      setCartFromLocalStorage(storedCartItems);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return cartFromLocalStorage;
};

export default useCart;
