import { Col, Form, Row, Select } from "antd";

const BorrowedBookFormComponents = ({ students, books, borrowedBookForm}) => {
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Aluno"
            name="alunoId"
            rules={[
              {
                required: true,
                message: "Selecione um aluno",
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Select
                // value={borrowedBookForm.getFieldValue("alunoId")}
                onChange={(value) =>
                  borrowedBookForm.setFieldsValue({ alunoId: value })
                }
              >
                {Array.isArray(students) &&
                  students.map((student) => {
                    return (
                      <Select.Option
                        key={student.alunoId}
                        value={student.alunoId}
                      >
                        {student.nome}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Livro"
            name="livroId"
            rules={[
              {
                required: true,
                message: "Selecione um Livro",
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Select
                // value={borrowedBookForm.getFieldValue("livroId")}
                onChange={(value) =>
                  borrowedBookForm.setFieldsValue({ livroId: value })
                }
              >
                {Array.isArray(books) &&
                  books.map((book) => {
                    return (
                      <Select.Option key={book.livroId} value={book.livroId}>
                        {book.titulo}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BorrowedBookFormComponents