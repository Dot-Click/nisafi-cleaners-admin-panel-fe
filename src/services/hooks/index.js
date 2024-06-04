// import { useSelector } from "react-redux";

// export const useAuth = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   if (isAuthenticated) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const getToken = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     return token;
//   } else {
//     return false;
//   }
// };

// export const getUserData = () => {
//   const userData = JSON.parse(localStorage.getItem("user"));
//   if (userData) {
//     return userData;
//   } else {
//     return false;
//   }
// };

// export const UseGetRole = () => {
//   const { user } = useSelector((state) => state.auth);
//   if (user) {
//     return user?.userData?.role;
//   } else {
//     return false;
//   }
// };

import { useAuthStore } from "../../stores/authStore";
import { useShallow } from "zustand/react/shallow";

export const useAuth = () => {
  const [isAuthenticated, loading] = useAuthStore(
    useShallow((state) => [state.isAuthenticated, state.loading])
  );
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return false;
  }
};

export const getUserData = () => {
  const [isAuthenticated, user] = useAuthStore(
    useShallow((state) => [state.isAuthenticated, state.user])
  );
  if (isAuthenticated && user) {
    return user?.userData;
  } else {
    return null;
  }
};
export const useGetRole = () => {
  const [isAuthenticated, user] = useAuthStore(
    useShallow((state) => [state?.isAuthenticated, state?.user])
  );
  if (isAuthenticated && user) {
    return user?.userData?.role;
  } else {
    return null;
  }
};
