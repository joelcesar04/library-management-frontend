import { Modal, Form, Input, DatePicker, Button } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
const { TextArea } = Input;

const AuthorModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleAddAuthor,
  authorForm,
}) => {
  return (
    <Modal
      title="Adicionar Autor"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={authorForm} onFinish={handleAddAuthor} layout="vertical">
        <Form.Item
          label="Nome do Autor"
          name="nome"
          rules={[
            {
              required: true,
              message: "O nome do autor é obrigatório.",
            },
            {
              min: 1,
              max: 100,
              message: "O nome do autor deve ter entre 1 e 100 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="País de Origem"
          name="paisOrigem"
          rules={[
            {
              required: true,
              message: "O país de origem do autor é obrigatório.",
            },
            {
              min: 1,
              max: 100,
              message:
                "O país de origem do autor deve ter entre 1 e 100 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Data de Nascimento"
          name="dataNascimento"
          rules={[
            {
              required: true,
              message: "Informe uma data válida de nascimento.",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            locale={locale}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Biografia"
          name="biografia"
          rules={[
            {
              max: 500,
              message: "A biografia do autor não pode exceder 500 caracteres.",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthorModal;
