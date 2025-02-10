import { Modal } from 'antd'

const BorrowedBookModal = ({
  isModalVisible,
  handleCancel,
  handleOk,
  bookName,
}) => {
  return (
    <>
      <Modal
        title="Devolução de Livro"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>
          Deseja realizar a devolução do livro <b>"{bookName}"</b>?
        </p>
      </Modal>
    </>
  );
};

export default BorrowedBookModal