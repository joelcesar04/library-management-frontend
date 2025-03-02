import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "antd";
import StudentFormComponents from "../FormComponents/StudentFormComponents";

const StudentRegisterForm = ({
  studentForm,
  handleAddStudent,
  handlePhoneChange,
  phone,
}) => {
  return (
    <>
      <h1 className="title">Biblioteca JV - Cadastro de Alunos</h1>
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
        form={studentForm}
        onFinish={handleAddStudent}
      >
        <StudentFormComponents
          handlePhoneChange={handlePhoneChange}
          phone={phone}
          studentForm={studentForm}
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
                <Link to={"/students"}>Voltar</Link>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default StudentRegisterForm;
