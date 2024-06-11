import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, {
  formAxios,
  attachToken,
  attachTokenWithFormAxios,
} from "../configs/axiosConfig";
import { successMessage, errorMessage } from "../services/helpers";

export const jobManagementStore = create((set) => ({
  jobsList: [],
  pagesCount: 0,
  listLoader: false,
  jobDetailLoader: false,
  jobDetail: {},

  fetchJobsList: async (page, search, sort, limit = 10, status) => {
    try {
      set({
        listLoader: true,
      });

      attachToken();
      const res = await custAxios.get(
        `/admin/jobs?sort=${sort}&page=${page}&limit=${limit}&search=${search}&status=${status}`
      );
      const pagesCount = Math.ceil(res?.data?.data?.totalJobs / limit);

      if (res?.data?.success) {
        set({
          listLoader: false,
          jobsList: res?.data?.data?.jobs,
          pagesCount: pagesCount,
        });
      }
      return true;
    } catch (error) {
      set({
        listLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  fetchSingleJob: async (id) => {
    try {
      set({
        jobDetailLoader: true,
      });

      attachToken();
      const res = await custAxios.get(`/admin/jobs/${id}`);

      if (res?.data?.success) {
        set({
          jobDetailLoader: false,
          jobDetail: res?.data?.data,
        });
      }
      return true;
    } catch (error) {
      set({
        jobDetailLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  clearJobDetail: () => {
    set({
      jobDetail: {},
    });
  },
}));
