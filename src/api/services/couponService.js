import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const alppyCouponCode = async (couponCode, totalCartValue) => {
  const responseObject = {}
  return DataService.post(
    "/couponCode/apply",
    { couponCode, totalCartValue },
    true
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      handleApiError(err);
      return err
    });
};

export const validateCouponCode = async (couponCode, totalCartValue) => {
  try {
    const res = await DataService.post(
      "/couponCode/iscoupon",
      { couponCode, totalCartValue },
      true
    );

    return res;
  } catch (err) {
    throw err;
  }
};
