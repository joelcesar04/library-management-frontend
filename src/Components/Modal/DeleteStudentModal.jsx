import { Modal } from "antd";

const DeleteStudentModal = ({
  isModalVisible,
  handleCancel,
  handleOk,
  studentName,
}) => {
  return (
    <>
      <Modal
        title="Deletar Aluno"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Deletar"
        cancelText="Cancelar"
      >
        <p>
          Deseja deletar o aluno <b>{studentName}</b>?
        </p>
      </Modal>
    </>
  );
};

export default DeleteStudentModal;
