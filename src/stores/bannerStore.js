import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, {
  attachToken,
  formAxios,
  attachTokenWithFormAxios,
} from "../configs/axiosConfig";
import { errorMessage, successMessage } from "../services/helpers";

export const useBannerStore = create((set) => ({
  bannerList: [],
  bannersLoader: false,
  delbannerLoader: false,
  uploadbannerLoader: false,

  fetchBanners: async () => {
    try {
      set({
        bannersLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/banner`);
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
      const res = await custAxios.delete(`/admin/banner/${id}`);
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
  uploadBanner: async (values) => {
    try {
      set({
        uploadbannerLoader: true,
      });
      attachTokenWithFormAxios();
      const res = await formAxios.post(`/admin/banner`, values);
      if (res?.data?.success) {
        set({
          uploadbannerLoader: false,
        });
      }
      successMessage("Banner Uploaded successfully");
      return true;
    } catch (error) {
      set({
        uploadbannerLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
}));
