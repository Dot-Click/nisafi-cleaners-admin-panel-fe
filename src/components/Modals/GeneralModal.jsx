import React, { useState } from "react";
import { Button, Modal } from "antd";

const GeneralModal = ({ title, component }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {component}
    </Modal>
  );
};

export default GeneralModal;
