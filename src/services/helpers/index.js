import { message } from "antd";

export const successMessage = () => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "success",
    content: "This is a success message",
  });
};

export const errorMessage = () => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "error",
    content: "This is an error message",
  });
};

export const warningMessage = () => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "warning",
    content: "This is a warning message",
  });
};

export const trimString = (string, length = 10) => {
  if (string.length > length) {
    return `${string.slice(0, length)}...`;
  }

  return string;
};
