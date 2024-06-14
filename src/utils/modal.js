// import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

export const showConfirm = (title, desc = null, handleClick, loading) => {
  confirm({
    title: title,
    content: desc,
    onOk: handleClick,
    loading,
    onCancel() {
      console.log("Cancel");
    },
    okButtonProps: {
      style: {
        backgroundColor: "#6BC3E6",
        padding: "5px 20px",
        "&:hover": {
          color: "#FF0000",
          borderColor: "#FF0000",
        },
      },
    },
    cancelButtonProps: {
      className: "cancel-btn",
      style: {
        "&:hover": {
          color: "#FF0000",
          borderColor: "#FF0000",
        },
      },
    },
  });
};
