import { Row, Modal } from "antd";

const GeneralModal = ({ open, handleCancel, component }) => {
  return (
    <Modal
      open={open}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
      centered
      // width={1200}
    >
      <Row className="modal-container">{component}</Row>
    </Modal>
  );
};

export default GeneralModal;
