import Cookies from "js-cookie";
import { toast } from "sonner";

export const getUserId = () => Cookies.get("userId");
export const getUserName = () => Cookies.get("userName");
export const getToken = () => Cookies.get("token");

export const checkAuth = (router) => {
  const userId = getUserId();
  if (!userId) {
    toast.error("Please login first!");
    setTimeout(() => router.push("/login"), 2000);
    return false;
  }
  return true;
};

export const validatePostForm = (text, startDate, endDate, isEvent = false) => {
  if (!text.trim()) {
    toast.warning("Please write something");
    return false;
  }
  if (isEvent && !startDate) {
    toast.warning("Please select start date");
    return false;
  }
  if (isEvent && !endDate) {
    toast.warning("Please select end date");
    return false;
  }
  return true;
};

export const handleImageUpload = (files, maxImages = 7) => {
  const fileArray = Array.from(files);
  if (fileArray.length > maxImages) {
    toast.warning(`Maximum ${maxImages} images allowed`);
    return { files: fileArray.slice(0, maxImages), urls: fileArray.slice(0, maxImages).map(f => URL.createObjectURL(f)) };
  }
  return { files: fileArray, urls: fileArray.map(f => URL.createObjectURL(f)) };
};