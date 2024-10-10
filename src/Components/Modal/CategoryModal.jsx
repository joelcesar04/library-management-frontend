import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
const { TextArea } = Input;

const CategoryModal = ({ isModalOpen, handleOk, handleCancel, handleAddCategory, categoryForm }) => {
  return (
    <Modal
      title="Adicionar Categoria"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={categoryForm} onFinish={handleAddCategory} layout="vertical">
        <Form.Item
          label="Nome da Categoria"
          name="nome"
          rules={[
            {
              required: true,
              message: "O nome da categoria é obrigatório.",
            },
            {
              min: 1,
              max: 100,
              message: "O nome da categoria deve ter entre 1 e 100 caracteres.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            {
              max: 500,
              message:
                "A descrição da categoria não pode exceder 500 caracteres.",
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

export default CategoryModal;
