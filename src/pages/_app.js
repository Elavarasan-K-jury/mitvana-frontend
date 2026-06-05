import "@assets/scss/bootstrap.scss";
import "../assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import "../styles/globals.css";
import "../styles/Below_footer.css";
import { ProductProvider } from "@src/context/ProductContext";
import WhatsappButton from "@src/components/WhatsappButton";
import { CartWishlistProvider } from "@src/context/CartWishlistContext";
import { useEffect } from "react";
import { useCartStore } from "@src/store/cartStore";
import { getItem } from "@src/api/localStorage";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { workSans } from "@src/lib/fonts";

export default function App({ Component, pageProps }) {
  const { setCartItem } = useCartStore();

  useEffect(() => {
    setCartItem(getItem("cartItem"));
  }, []);

  return (
    <main className={`${workSans.className}`}>
      <CartWishlistProvider>
        <ProductProvider>
          <Component {...pageProps} />
          <WhatsappButton />
        </ProductProvider>
      </CartWishlistProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </main>
  );
}
