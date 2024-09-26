import { toast } from "sonner";

//? success
export const successMessage = (msg) => {
  toast.success(msg, {
    duration: 2000,
  });
};

//? error
export const errorMessage = (msg) => {
  toast.error(msg, {
    duration: 2000,
  });
};

//? warning
export const warningMessage = (msg) => {
  toast.warning(msg, {
    duration: 2000,
  });
};

export const trimString = (string, length = 10) => {
  if (string.length > length) {
    return `${string.slice(0, length)}...`;
  }

  return string;
};
