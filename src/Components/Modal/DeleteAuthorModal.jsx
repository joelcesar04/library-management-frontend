import { Modal } from "antd";

const DeleteAuthorModal = ({
  isModalVisible,
  handleCancel,
  handleOk,
  authorName,
}) => {
  return (
    <>
      <Modal
        title="Deletar Autor"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Deletar"
        cancelText="Cancelar"
      >
        <p>
          Deseja deletar o autor <b>"{authorName}"</b>?
        </p>
      </Modal>
    </>
  );
};

export default DeleteAuthorModal;
