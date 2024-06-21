import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, { formAxios, attachToken } from "../configs/axiosConfig";
import { errorMessage } from "../services/helpers";

export const useDashboardStore = create((set) => ({
  totalJobsCount: 0,
  totalWorkersCount: 0,
  totalClientsCount: 0,
  totalJobs: [],
  completedJobs: [],
  disputedJobs: [],
  recentJobs: [],
  jobStatsLoader: false,
  recentJobsLoader: false,
  generalStatsLoader: false,

  fetchJobStats: async (yearRange = 2024) => {
    try {
      set({
        jobStatsLoader: true,
      });

      attachToken();
      const res = await custAxios.get(`/admin/dashboardStats`, {
        params: { yearRange },
      });

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
      if (res?.data?.success) {
        set({
          recentJobs: res?.data?.data,
          recentJobsLoader: false,
        });
      }
      return true;
    } catch (error) {
      set({
        recentJobsLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  fetchGeneralStats: async () => {
    try {
      set({
        generalStatsLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/generalStats`);
      if (res?.data?.success) {
        console.log("fetchGeneralStats", res?.data?.data);
        set({
          totalJobsCount: res?.data?.data?.totalJobs,
          totalWorkersCount: res?.data?.data?.totalWorkers,
          totalClientsCount: res?.data?.data?.totalClients,
          generalStatsLoader: false,
        });
      }
      return true;
    } catch (error) {
      set({
        generalStatsLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
  fetchJobStats1: async () => {
    try {
      set({
        // recentJobsLoader: true,
      });
      attachToken();
      const res = await custAxios.get(`/admin/jobStats`);
      if (res?.data?.success) {
        console.log("fetchJobStats", res?.data?.data);
        set({
          // recentJobs: res?.data?.data,
          // recentJobsLoader: false,
        });
      }
      return true;
    } catch (error) {
      set({
        // recentJobsLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
}));
