import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, {
  formAxios,
  attachToken,
  attachTokenWithFormAxios,
} from "../configs/axiosConfig";
import { successMessage, errorMessage } from "../services/helpers";

export const useUserManagementStore = create((set) => ({
  userDetail: {},
  userList: [],
  pagesCount: 0,
  // loaders
  usersLoader: false,
  userDetailLoader: false,
  approvalLoader: false,

  fetchUsers: async (role, page, search, sort) => {
    try {
      set({
        usersLoader: true,
      });

      attachToken();
      let queryParams = {
        role,
        search,
        sort,
        page,
        limit: 10,
      };
      const res = await custAxios.get(`/admin/users`, { params: queryParams });
      const pagesCount = Math.ceil(
        res?.data?.data?.totalUsers / queryParams.limit
      );

      console.log("res", res?.data);
      if (res?.data?.success) {
        set({
          usersLoader: false,
          userList: res?.data?.data?.users,
          pagesCount: pagesCount,
          docCount: res?.data?.data?.totalUsers,
        });
      }
      return true;
    } catch (error) {
      set({
        usersLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  fetchUserDetail: async (id) => {
    try {
      set({
        userDetailLoader: true,
      });

      attachToken();
      const res = await custAxios.get(`/admin/users/${id}`);
      console.log("res", res?.data);
      if (res?.data?.success) {
        set({
          userDetailLoader: false,
          userDetail: res?.data?.data,
        });
      }
      return true;
    } catch (error) {
      set({
        userDetailLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },

  approveWorker: async (id, status) => {
    try {
      set({
        approvalLoader: true,
      });

      attachToken();
      const res = await custAxios.get(`/admin/approveUser/${id}/${status}`);
      console.log("res", res?.data);
      if (res?.data?.success) {
        set({
          approvalLoader: false,
        });
      }
      successMessage(res?.data?.data);
      return true;
    } catch (error) {
      set({
        approvalLoader: false,
      });
      console.error(error);
      errorMessage(error?.response?.data?.message);
    }
  },
}));