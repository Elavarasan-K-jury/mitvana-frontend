import { toast } from "react-hot-toast";
import { API_ENDPOINT, DataService } from "../axios";
import { getItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const addProductOnCart = (obj) => {
  return DataService.post("/cart", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Error");
    });
};

export const isProductInCart = (obj) => {
  return DataService.post("/cart/product/is-present", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeProductFromCart = async (itemId) => {
  try {
    const token = getItem("accessToken");
    const response = await fetch(`${API_ENDPOINT}/cart/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove item from cart");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Item removed from cart successfully!");
    return data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    toast.dismiss();
    toast.error(error.message || "Error removing item from cart");
  }
};

export const updateProductQuantity = async (itemId, quantity, type) => {
  try {
    const token = getItem("accessToken");
    const response = await fetch(`${API_ENDPOINT}/cart/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity, type }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update quantity");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Quantity updated successfully!");
    return data;
  } catch (error) {
    console.error("Error updating product quantity:", error);
    toast.dismiss();
    toast.error(error.message || "Error updating product quantity");
  }
};

export const getCartProducts = (obj) => {
  return DataService.get("/cart", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearCart = async () => {
  try {
    const token = getItem("accessToken");
    const response = await fetch(`${API_ENDPOINT}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clear the cart");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success(data.message || "Cart cleared successfully!");
    return data;
  } catch (error) {
    handleApiError(error);
    console.error("Error clearing cart:", error);
    toast.dismiss();
    toast.error(error.message || "Error clearing cart");
  }
};
