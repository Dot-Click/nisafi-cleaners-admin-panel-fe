import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, { attachToken } from "../configs/axiosConfig";
import { errorMessage, successMessage } from "../services/helpers";

export const useBannerStore = create((set) => ({
  bannerList: [],
  bannersLoader: false,
  delbannerLoader: false,

  fetchBanners: async () => {
    try {
      set({
        bannersLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/banner`);
      console.log("res", res?.data?.data);
      if (res?.data?.success) {
        set({
          bannersLoader: false,
          bannerList: res?.data?.data,
        });
      }
      return true;
    } catch (error) {
      set({
        bannersLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
  deleteBanner: async (id) => {
    try {
      set({
        delbannerLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/banner/${id}`);
      console.log("res", res?.data?.data);
      if (res?.data?.success) {
        set({
          delbannerLoader: false,
        });
      }
      successMessage(res?.data?.data);
      return true;
    } catch (error) {
      set({
        delbannerLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
}));
