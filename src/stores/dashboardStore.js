import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, { formAxios, attachToken } from "../configs/axiosConfig";
import { errorMessage } from "../services/helpers";

export const useDashboardStore = create(
  devtools((set) => ({
    totalJobsCount: 0,
    totalWorkersCount: 0,
    totalClientsCount: 0,
    unReadCount: 0,
    totalJobs: [],
    completedJobs: [],
    disputedJobs: [],
    recentJobs: [],
    notifications: [],
    jobStatsLoader: false,
    recentJobsLoader: false,
    generalStatsLoader: false,
    notificationLoader: false,

    fetchJobStats: async (yearRange) => {
      try {
        set({
          jobStatsLoader: true,
        });

        attachToken();
        const res = await custAxios.get(`/admin/jobStats`, {
          params: { yearRange },
        });

        if (res?.data?.success) {
          set({
            jobStatsLoader: false,
            totalJobs: res?.data?.data?.jobsByMonth,
            disputedJobs: res?.data?.data?.disputedJobsByMonth,
            completedJobs: res?.data?.data?.completedJobsByMonth,
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

    fetchNotifications: async () => {
      try {
        set({
          notificationLoader: true,
        });
        attachToken();
        const res = await custAxios.get(`/notification`);
        if (res?.data?.success) {
          set({
            notifications: res?.data?.data,
            unReadCount: 0,
            notificationLoader: false,
          });
        }
        return true;
      } catch (error) {
        set({
          notificationLoader: false,
        });
        console.error(error);
        errorMessage(error?.response?.data?.message);
      }
    },
    fetchUnreadCount: async () => {
      try {
        set({
          notificationLoader: true,
        });
        attachToken();
        const res = await custAxios.get(`/notification/unread-count`);
        if (res?.data?.success) {
          set({
            unReadCount: res?.data?.data,
            notificationLoader: false,
          });
        }
        return true;
      } catch (error) {
        set({
          notificationLoader: false,
        });
        console.error(error);
      }
    },

    handleNotificationCount: () => {
      set((state) => ({
        unReadCount: state.unReadCount + 1,
      }));
    },
  }))
);
