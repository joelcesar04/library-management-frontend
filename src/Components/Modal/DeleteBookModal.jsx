import { Modal } from "antd";

const DeleteBookModal = ({
  bookTitle,
  isModalVisible,
  handleCancel,
  handleOk,
}) => {
  return (
    <>
      <Modal
        title="Deletar Livro"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Deletar"
        cancelText="Cancelar"
      >
        <p>
          Deseja deletar o livro <b>{bookTitle}</b>?
        </p>
      </Modal>
    </>
  );
};

export default DeleteBookModal;
