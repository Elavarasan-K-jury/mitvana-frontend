import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingCartButton = ({ count }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (count && count > 0) {
            setShow(true);
        }
    }, [count]);

    if (!show) return null;

    return (
        <>
            {/* Desktop */}
            <Link href="/shopping-cart">
                <div
                    className="
          hidden lg:flex
          fixed
          right-6
          top-1/2
          -translate-y-1/2

          z-40

          bg-customPrimary
          text-white

          rounded-l-2xl

          px-4
          py-4

          flex-col
          items-center
          gap-2

          shadow-xl

          cursor-pointer

          transition-all
          duration-300
          ease-out

          hover:shadow-2xl
          hover:-translate-x-2
          hover:scale-105

          group
        "
                >
                    <div className="relative">
                        <ShoppingCart
                            size={20}
                            className="
              transition-transform
              duration-300
              group-hover:rotate-12
            "
                        />

                        <span
                            className="
              absolute
              -top-2
              -right-2
              h-5
              w-5
              rounded-full
              bg-white
              text-customPrimary
              text-[10px]
              font-bold
              flex
              items-center
              justify-center
              transition-all
              duration-300
              group-hover:scale-110
            "
                        >
                            {count}
                        </span>
                    </div>

                    <span
                        className="
            text-xs
            font-medium
            transition-all
            duration-300
            group-hover:tracking-wide
          "
                    >
                        View Cart
                    </span>
                </div>
            </Link>

            {/* Mobile */}
            <Link href="/shopping-cart">
                <div
                    className="
          lg:hidden

          fixed
          bottom-[75px]

          left-1/2
          -translate-x-1/2

          z-40

          bg-customPrimary
          text-white

          rounded-full

          px-5
          py-3

          flex
          items-center
          gap-3

          shadow-xl
        "
                >
                    <div className="relative">
                        <ShoppingCart size={20} />

                        <span
                            className="
              absolute
              -top-2
              -right-2

              h-5
              w-5

              rounded-full

              bg-white
              text-customPrimary

              text-[10px]
              font-bold

              flex
              items-center
              justify-center
            "
                        >
                            {count}
                        </span>
                    </div>

                    <div className="leading-tight">
                        <div className="text-xs opacity-90">
                            View Cart
                        </div>

                        <div className="font-semibold">
                            {count} Item{count > 1 ? "s" : ""}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default FloatingCartButton;