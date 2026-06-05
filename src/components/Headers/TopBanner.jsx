import React, { useState, useEffect } from "react";
import { getShippingCharges } from "@src/api/services/shippingCharges";

const TopBanner = ({ topclass }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [bannerText, setBannerText] = useState(false);

  useEffect(() => {
    const getText = async () => {
      const res = await getShippingCharges();
      console.log("eh", res);
      setBannerText(res?.topBannerText);
    };

    setIsClient(true);
    getText();
  }, []);

  return (
    <React.Fragment>
      {bannerText && (
        <div className={topclass}>
          <div
            className={`t_header fs-13 d-flex align-items-center ${
              !isOpen ? "d-none" : ""
            }`}
          >
            <div className="container-fluid">
              <div className="d-flex gap-2">
                <div className="col text-center text-white">{bannerText}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopBanner;
