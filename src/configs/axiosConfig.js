import axios from "axios";

// export const baseURL = "https://nisafi-staging.up.railway.app";
export const baseURL = "https://be.nisaficlean.com/";
// export const baseURL = "http://localhost:8001";

// axios instance for json data
const custAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// attaching Bearer token to axios so that it can be used in all the requests and the server can verify the user
export const attachToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    custAxios.defaults.headers.common["Authorization"] = token;
  } else {
    custAxios.defaults.headers.common["Authorization"] = null;
  }
};

// attaching Bearer token to form axios so that it can be used in all the requests and the server can verify the user
export const attachTokenWithFormAxios = () => {
  const token = localStorage.getItem("token");

  if (token) {
    formAxios.defaults.headers.common["Authorization"] = token;
  } else {
    formAxios.defaults.headers.common["Authorization"] = null;
  }
};

// axios instance for formdata
export const formAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export default custAxios;
