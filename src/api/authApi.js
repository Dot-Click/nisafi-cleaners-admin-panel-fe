import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { errorMessage } from "../services/helpers";

const login = async (values) => {
  try {
    const res = await axios.post("/auth/login", values);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};
