import React, { useState } from "react";
import { Button, Modal } from "antd";

const GeneralModal = ({
  title = "",
  setModalOpen,
  open,
  clickHandler,
  component,
}) => {
  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      width={400}
      cancelText={"Han beya"}
      title={title}
      
      open={open}
      onOk={clickHandler}
      onCancel={handleCancel}
    >
      {component}
    </Modal>
  );
};

export default GeneralModal;
