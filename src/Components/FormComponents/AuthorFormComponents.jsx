import React from 'react'
import { Col, DatePicker, Form, Input, Row } from 'antd';
import locale from "antd/es/date-picker/locale/pt_BR";
import dayjs from 'dayjs';
const { TextArea } = Input;

const AuthorFormComponents = () => {
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              { required: true, message: "O nome do autor é obrigatório." },
              {
                min: 1,
                max: 100,
                message: "O nome do autor deve ter entre 1 e 100 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={5}
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
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Dt. Nasc."
            name="dataNascimento"
            rules={[
              {
                required: true,
                type: "date",
                message: "Informe uma data válida de nascimento.",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              locale={locale}
              style={{ width: "100%" }}
              disabledDate={(current) => {
                return current && current > dayjs().endOf("day");
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Biografia"
            name="biografia"
            rules={[
              {
                max: 500,
                message:
                  "A biografia do autor não pode exceder 500 caracteres.",
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default AuthorFormComponents;