import { create } from "zustand";
import { devtools } from "zustand/middleware";
import custAxios, {
  attachToken,
  attachTokenWithFormAxios,
  formAxios,
} from "../configs/axiosConfig";
import { successMessage, errorMessage } from "../services/helpers";

export const useAuthStore = create((set) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return {
    user: token && userData ? { token: token, userData: userData } : null,
    isAuthenticated: token ? true : false,
    loading: false,

    login: async (values) => {
      try {
        set({
          loading: true,
          isAuthenticated: false,
        });
        const res = await custAxios.post(`/auth/login`, values);
        if (values.remember === true) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", window.btoa(values.password));
          localStorage.setItem("remember", values.remember);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("remember");
        }
        if (res?.data?.success) {
          set({
            loading: false,
            isAuthenticated: true,
            user: {
              token: res?.data?.data?.token,
              userData: res?.data?.data?.user,
            },
          });
          localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          localStorage.setItem("token", res?.data?.data?.token);
          successMessage(res?.data?.data?.message);
          return true;
        }
      } catch (error) {
        set({ loading: false, isAuthenticated: false });
        errorMessage(error?.response?.data?.message);
      }
    },
    updateProfile: async (values) => {
      try {
        set({
          loading: true,
        });
        attachTokenWithFormAxios();
        const res = await formAxios.put(`/auth/me`, values);

        if (res?.data?.success) {
          set({
            loading: false,
            isAuthenticated: true,
            user: {
              token: token,
              userData: res?.data?.data?.user,
            },
          });
          localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          successMessage(res?.data?.data?.message);
          return true;
        }
      } catch (error) {
        set({ loading: false });
        errorMessage(error?.response?.data?.message);
      }
    },

    forgot: async (values) => {
      try {
        set({
          loading: true,
          isAuthenticated: false,
        });
        attachToken();
        const res = await custAxios.post(`/auth/forgot-password`, values);

        if (res?.data?.success) {
          set({
            loading: false,
            isAuthenticated: true,
          });
          successMessage(res?.data?.message);
          return true;
        }
      } catch (error) {
        set({ loading: false });
        errorMessage(error?.response?.data?.message);
      }
    },

    reset: async (values) => {
      set({
        loading: true,
      });
      try {
        attachToken();
        const res = await custAxios.put("/auth/resetPassword", {
          email: values.email,
          passwordResetToken: values.passwordResetToken,
          password: values.password,
        });
        if (res?.data?.success) {
          set({ loading: false, isAuthenticated: false });
          successMessage(res?.data?.message);
          return true;
        }
      } catch (error) {
        set({
          loading: false,
        });
        errorMessage(error?.response?.data?.message);
      }
    },

    createClientPassword: async (password, jwt) => {
      set({
        loading: true,
      });
      try {
        const res = await custAxios.post("/auth/create-password", {
          token: jwt,
          password: password,
        });
        if (res?.data?.success) {
          set({ loading: false, isAuthenticated: false });
          successMessage(res?.data?.data?.message);
          return true;
        }
      } catch (error) {
        set({
          loading: false,
        });
        errorMessage(error?.response?.data?.message);
      }
    },

    logout: async () => {
      set({
        loading: true,
      });
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        attachToken();
        const res = await custAxios.get("/auth/logout");
        if (res?.data?.success) {
          set({ loading: false, isAuthenticated: false });
        }
        successMessage("Logout Successful");
        return true;
      } catch (error) {
        set({ loading: false, isAuthenticated: false });
        errorMessage(error?.response?.data?.message);
      }
    },
    getProfile: async () => {
      try {
        set({
          loading: true,
          isAuthenticated: false,
        });
        attachToken();
        const res = await custAxios.get(`/auth/me`);
        if (res?.data?.success) {
          set({
            loading: false,
            isAuthenticated: true,
            user: res?.data?.data,
          });

          return true;
        }
      } catch (error) {
        set({ loading: false });
        errorMessage(error?.response?.data?.message);
      }
    },
  };
});
