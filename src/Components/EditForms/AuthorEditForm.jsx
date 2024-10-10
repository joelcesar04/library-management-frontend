import React from 'react'
import { Button, Col, Form, Row } from 'antd';
import AuthorFormComponents from '../FormComponents/AuthorFormComponents'
import { Link } from 'react-router-dom';

const AuthorEditForm = ({ authorName, authorForm, handleUpdateAuthor }) => {
  return (
    <>
      <h1 className="title">Biblioteca JV - Editar</h1>
      <h3 className="title">{authorName}</h3>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1200,
        }}
        form={authorForm}
        onFinish={handleUpdateAuthor}
      >
        <AuthorFormComponents />
        <Row gutter={2}>
          <Col span={12} style={{ display: "flex", gap: "15px" }}>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Confirmar
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button>
                <Link to={"/authors"}>Voltar</Link>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AuthorEditForm