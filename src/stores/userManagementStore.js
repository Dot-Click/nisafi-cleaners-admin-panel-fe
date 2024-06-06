import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, {
  formAxios,
  attachToken,
  attachTokenWithFormAxios,
} from "../configs/axiosConfig";
import { successMessage, errorMessage } from "../services/helpers";

export const useUserManagementStore = create((set) => ({
  usersLoader: false,
  userList: [],

  fetchUsers: async (role, search, sort) => {
    try {
      set({
        usersLoader: true,
      });

      attachToken();
      let queryParams = {
        role,
        search,
        sort,
      };
      const res = await custAxios.get(`/admin/users`, { params: queryParams });
      if (res?.data?.success) {
        set({
          usersLoader: false,
          userList: res?.data?.data,
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
}));
