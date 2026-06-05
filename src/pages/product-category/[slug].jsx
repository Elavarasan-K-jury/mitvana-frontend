import React, { useState } from "react";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/pages/shop/FilterTab";
import TopBanner from "@src/components/Headers/TopBanner";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();

  const [loginShow, setLoginShow] = useState(false);

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);
  return (
    <React.Fragment>
      <HeadTitle title="Mitvana - Shop" />
      <TopBanner />
      <HeaderCosmetics />

      <div>
        <WomenColting />
        <FilterTab
          handleLoginShow={handleLoginShow}
          SelectedCategory={router.query.slug}
        />
      </div>
      <FooterCosmetics />
      {/* <BelowFooter /> */}

      {/* <PopupPage /> */}
    </React.Fragment>
  );
};
export default Category;
