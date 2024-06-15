import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, { formAxios, attachToken } from "../configs/axiosConfig";
import { errorMessage } from "../services/helpers";

export const useDashboardStore = create((set) => ({
  totalJobs: [],
  completedJobs: [],
  disputedJobs: [],
  recentJobs: [],
  jobStatsLoader: false,
  recentJobsLoader: false,

  fetchJobStats: async (yearRange = 2024) => {
    try {
      set({
        jobStatsLoader: true,
      });

      attachToken();
      const res = await custAxios.get(`/admin/dashboardStats`, {
        params: { yearRange },
      });

      console.log("res", res?.data?.data);
      if (res?.data?.success) {
        set({
          jobStatsLoader: false,
          totalJobs: res?.data?.data?.totalJobsGraph,
          disputedJobs: res?.data?.data?.disputedJobsGraph,
          completedJobs: res?.data?.data?.completedJobsGraph,
        });
      }
      return true;
    } catch (error) {
      set({
        jobStatsLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  fetchRecentJobs: async () => {
    try {
      set({
        recentJobsLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/recentjobs`);
      console.log("res", res?.data?.data);
      if (res?.data?.success) {
        set({
          recentJobs: res?.data?.data,
          recentJobsLoader: false,
        });
      }
      successMessage(res?.data?.data);
      return true;
    } catch (error) {
      set({
        recentJobsLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
}));
