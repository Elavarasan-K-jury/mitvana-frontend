import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { getItem } from "@src/api/localStorage";
import { handleApiError } from "@src/lib/handleApiError";
import { setCookie } from "cookies-next";
export const userRegister = (data) => {
  return DataService.post("/user/register", data, false)
    .then((res) => {
      console.log(res.data);
      toast.dismiss();
      toast.success(res.data.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const requestPasswordRecover = (data) => {
  return DataService.post("/user/request-password-reset", data, false)
    .then((res) => {
      console.log(res.data);
      toast.dismiss();
      toast.success(res.data.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const resetPasswordAPI = async ({ token, email, newPassword }) => {
  return DataService.post(
    "/user/reset-password",
    { token, email, newPassword },
    false
  )
    .then((res) => {
      console.log(res.data);
      toast.dismiss();
      toast.success(res.data.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const verifyUser = (data) => {
  return DataService.post("/user/verify-email", data, false)
    .then((res) => {
      console.log(res.data);
      toast.dismiss();
      toast.success(res.data.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const loginUser = async (data) => {
  try {
    const res = await DataService.post("/user/login", data, false);

    console.log("LOGIN RESPONSE", res.data);

    if (res.data.success) {
      setItem("accessToken", res.data.token);
      setCookie("accessToken", res.data.token);
      setItem("accessUser", res.data.user);
    }

    return res.data;
  } catch (err) {
    console.log("LOGIN ERROR STATUS", err.response?.status);
    console.log("LOGIN ERROR DATA", err.response?.data);

    throw err;
  }
};

export const getUserDetail = async () => {
  try {
    const res = await DataService.get("/user/profile", true);
    console.log("PROFILE RESPONSE", res.data);
    return res.data;
  } catch (err) {
    console.log("PROFILE ERROR", err.response?.data);
    return null;
  }
};

export const changePasswordUser = (obj) => {
  return DataService.put("/user/change-password", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      throw err.response ? err.response.data : new Error(err.message);
    });
};

export const updateUserDetails = (obj) => {
  return DataService.put("/user/profile", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      throw err.response ? err.response.data : new Error(err.message);
    });
};

export const updateAddress = (obj) => {
  return DataService.put("/user/address", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      throw err.response ? err.response.data : new Error(err.message);
    });
};

export const getAddress = () => {
  return DataService.get("/user/address", true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      throw err.response ? err.response.data : new Error(err.message);
    });
};

export const deleteAddress = (id) => {
  return DataService.delete(`/user/address/${id}`, {}, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      throw err.response ? err.response.data : new Error(err.message);
    });
};
