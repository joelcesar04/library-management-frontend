import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "antd";
import AuthorModal from "../Modal/AuthorModal";
import CategoryModal from "../Modal/CategoryModal";
import BookFormComponents from "../FormComponents/BookFormComponents";

const BookEditForm = ({
  bookTitle,
  authors,
  initialAutorId,
  categories,
  initalCategoriaId,
  handleAddAuthor,
  handleAddCategory,
  showAuthorModal,
  showCategoryModal,
  handleAuthorOk,
  handleCategoryOk,
  isAuthorModalOpen,
  isCategoryModalOpen,
  handleAuthorCancel,
  handleCategoryCancel,
  authorForm,
  categoryForm,
  bookForm,
  handleUpdateBook
}) => {
  const [autorId, setAutorId] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);

  const handleCategoryChange = (value) => {
    bookForm.setFieldsValue({ categoria: value });
    setCategoriaId(value)
  };
  const handleAuthorChange = (value) => {
    bookForm.setFieldsValue({ autor: value });
    setAutorId(value)
  };

  useEffect(() => {
    if (initialAutorId !== null) {
      bookForm.setFieldsValue({ autor: initialAutorId });
      setAutorId(initialAutorId)
    }
    if (initalCategoriaId !== null) {
      bookForm.setFieldsValue({ categoria: initalCategoriaId });
      setCategoriaId(initalCategoriaId)
    }
  }, [initialAutorId, initalCategoriaId])


  return (
    <>
      <h1 className="title">Biblioteca JV - Editar</h1>
      <h3 className="title">{bookTitle}</h3>
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
        onFinish={handleUpdateBook}
      >
        <BookFormComponents
          authors={authors}
          autorId={autorId}
          categories={categories}
          categoriaId={categoriaId}
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
                Confirmar
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

export default BookEditForm;
