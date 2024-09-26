import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

const ConfirmAlert = () => {
  return confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.error("Oops errors!"));
    },
    onCancel() {},
  });
};

export default ConfirmAlert;
