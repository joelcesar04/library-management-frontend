import React from 'react'
import { Col,Form, Input, InputNumber, Row, Switch } from 'antd';
import InputMask from 'react-input-mask';

const StudentFormComponents = ({ handlePhoneChange, phone, isEditMode }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Matrícula"
            name="matricula"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "A matrícula do aluno é obrigatória.",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} disabled={isEditMode} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              { required: true, message: "O nome do aluno é obrigatório." },
              {
                min: 1,
                max: 100,
                message: "O nome do aluno deve ter entre 1 e 100 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "O e-mail do aluno é obrigatório.",
              },
              {
                type: "email",
                message: "O e-mail do aluno não é válido.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Curso"
            name="curso"
            rules={[
              {
                required: true,
                message: "O curso do aluno é obrigatório.",
              },
              {
                min: 1,
                max: 100,
                message: "O curso do aluno deve ter entre 1 e 100 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[
              {
                required: true,
                message: "O número de telefone do aluno é obrigatório.",
              },
              {
                validator: (_, value) => {
                  // Valida o telefone: se estiver preenchido corretamente, aceita
                  if (!value || value.replace(/\D/g, "").length === 11) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "O número de telefone deve estar no formato completo (xx) xxxxx-xxxx."
                    )
                  );
                },
              },
            ]}
          >
            <InputMask
              mask="(99) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
            >
              {() => <Input />}
            </InputMask>
          </Form.Item>
        </Col>
        {isEditMode && (
          <Col span={12}>
            <Form.Item
              label="Ativo"
              name="ativo"
            >
              <Switch />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
}

export default StudentFormComponents