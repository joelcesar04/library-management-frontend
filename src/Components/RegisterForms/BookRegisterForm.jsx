import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col
} from "antd";
import AuthorModal from "../Modal/AuthorModal";
import CategoryModal from "../Modal/CategoryModal";
import BookFormComponents from "../FormComponents/BookFormComponents";

const BookRegisterForm = ({
  authors,
  categories,
  handleAddBook,
  handleAddAuthor,
  handleAddCategory,
  showAuthorModal,
  showCategoryModal,
  handleAuthorOk,
  handleCategoryOk,
  handleCategoryChange,
  handleAuthorChange,
  isAuthorModalOpen,
  isCategoryModalOpen,
  handleAuthorCancel,
  handleCategoryCancel,
  authorForm,
  categoryForm,
  bookForm
}) => {
  return (
    <>
      <h1 className="title">Biblioteca JV - Cadastro de Livros</h1>
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
        form={bookForm}
        onFinish={handleAddBook}
      >
        <BookFormComponents
          authors={authors}
          categories={categories}
          bookForm={bookForm}
          setIsAuthorModalOpen={showAuthorModal}
          setIsCategoryModalOpen={showCategoryModal}
          handleCategoryChange={handleCategoryChange}
          handleAuthorChange={handleAuthorChange}
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
                <Link to={"/books"}>Voltar</Link>
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <AuthorModal
          isModalOpen={isAuthorModalOpen}
          handleOk={handleAuthorOk}
          handleCancel={handleAuthorCancel}
          handleAddAuthor={handleAddAuthor}
          authorForm={authorForm}
        />
        <CategoryModal
          isModalOpen={isCategoryModalOpen}
          handleOk={handleCategoryOk}
          handleCancel={handleCategoryCancel}
          handleAddCategory={handleAddCategory}
          categoryForm={categoryForm}
        />
      </Form>
    </>
  );
};

export default BookRegisterForm;
