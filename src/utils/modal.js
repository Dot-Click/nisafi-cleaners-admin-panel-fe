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
      className: "primary-btn w-fit !px-6",
    },
    cancelButtonProps: {
      className: "cancel-btn",
    },
  });
};
