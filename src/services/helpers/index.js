import { message } from "antd";

export const successMessage = (msg) => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "success",
    content: msg,
  });
};

export const errorMessage = (msg) => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "error",
    content: msg,
  });
};

export const warningMessage = (msg) => {
  const [messageApi] = message.useMessage();
  messageApi.open({
    type: "warning",
    content: msg,
  });
};

const showInfo = (messageContent, duration = 3) => {
  message.info(messageContent, duration);
};

export const trimString = (string, length = 10) => {
  if (string.length > length) {
    return `${string.slice(0, length)}...`;
  }

  return string;
};
