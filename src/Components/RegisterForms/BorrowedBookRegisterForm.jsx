import { Button, Col, Form, Row } from "antd";
import BorrowedBookFormComponents from "../FormComponents/BorrowedBookFormComponents";
import { Link } from "react-router-dom";
import { BorrowedBookContext } from "../Wrappers/BorrowedBookWrapper";
import { useContext } from "react";

const BorrowedBookRegisterForm = ({
  handleAddBorrowedBook,
  borrowedBookForm,
}) => {
  const { students, books } = useContext(BorrowedBookContext);

  return (
    <>
      <h1 className="title">Biblioteca JV - Cadastro de Empréstimo</h1>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        style={{
          maxWidth: 1200,
        }}
        form={borrowedBookForm}
        onFinish={handleAddBorrowedBook}
      >
        <BorrowedBookFormComponents
          students={students}
          books={books}
          borrowedBookForm={borrowedBookForm}
        />
        <Row gutter={2}>
          <Col span={12} style={{ display: "flex", gap: "15px" }}>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type="primary" htmlType="submit">
                Adicionar
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button>
                <Link to={"/borrowed-books"}>Voltar</Link>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BorrowedBookRegisterForm