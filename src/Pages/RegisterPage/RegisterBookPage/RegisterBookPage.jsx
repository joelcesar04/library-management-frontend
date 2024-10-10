import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { addBook } from '../../../Services/livrosService'; 
import { addAuthor, getAuthors } from "../../../Services/autoresService";
import { getCategories, addCategory } from '../../../Services/categoryService'; 
import BookRegisterForm from '../../../Components/RegisterForms/BookRegisterForm'
import { BooksContext } from '../../../Components/Wrappers/BooksWrapper';


const RegisterBookPage = () => {
  const { latestBook } = useContext(BooksContext);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const [authorForm] = Form.useForm()
  const [categoryForm] = Form.useForm();
  const [bookForm] = Form.useForm();

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const showAuthorModal = () => {
    setIsAuthorModalOpen(true);
  };
  const showCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleAuthorOk = () => {
    setIsAuthorModalOpen(false);
  };
  const handleCategoryOk = () => {
    setIsCategoryModalOpen(false);
  };
  
  const handleAuthorCancel = () => {
    setIsAuthorModalOpen(false);
    authorForm.resetFields();
  };
  const handleCategoryCancel = () => {
    setIsCategoryModalOpen(false);
    categoryForm.resetFields();
  };

  const handleCategoryChange = (value) => {
    bookForm.setFieldsValue({ 'categoria': value });
  };
  const handleAuthorChange = (value) => {
    bookForm.setFieldsValue({ 'autor': value });
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const result = await getAuthors();
        setAuthors(result);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }
    fetchAuthors();
    fetchCategories();
  }, []);
  
  const handleAddAuthor = async (values) => {
    try {
      const newAuthor = await addAuthor({
        nome: values.nome,
        paisOrigem: values.paisOrigem,
        dataNascimento: values.dataNascimento,
        biografia: values.biografia,
      });

      if (newAuthor) {
        setAuthors([...authors, newAuthor]);
        message.success('Autor adicionado com sucesso!');
        handleAuthorCancel();
      } else {
        message.error("Erro ao adicionar autor!")        
      }

    } catch (error) {
      message.error(error.message || "Erro ao adicionar autor!")
    }
  }
  const handleAddCategory = async (values) => {
    try {
      const newCategory = await addCategory({
        nome: values.nome,
        descricao: values.descricao,
      });

      if (newCategory) {
        setCategories([...categories, newCategory]);
        message.success('Categoria adicionada com sucesso!');
        handleCategoryCancel();
      } else {
        message.error("Erro ao adicionar categoria!")
      }

    } catch (error) {
      message.error(error.message || "Erro ao adicionar categoria!")
    }
  }
  const handleAddBook = async (values) => {
    if (!values.autor || !values.categoria) {
      message.error("Autor ou categoria não encontrados.");
      return;
    }
    try {
      const newBook = await addBook({
        titulo: values.titulo,
        descricao: values.descricao,
        editora: values.editora,
        edicao: values.edicao,
        isbn: values.isbn,
        paginas: values.paginas,
        idioma: values.idioma,
        dataPublicacao: values.dataPublicacao,
        disponivel: values.disponivel,
        autorId: values.autor,
        categoriaId: values.categoria,
      });

      if (newBook) {
        latestBook(newBook);
        message.success("Livro adicionado com sucesso!");
        bookForm.resetFields();
        navigate("/books");
      } else {
        message.error("Erro ao adicionar livro!");
      }
    } catch (error) {
      message.error(error.message || "Erro ao adicionar livro!");
    }
  };

  return (
    <>
      <BookRegisterForm
        authors={authors}
        categories={categories}
        handleAddBook={handleAddBook}
        handleAddAuthor={handleAddAuthor}
        handleAddCategory={handleAddCategory}
        showAuthorModal={showAuthorModal}
        showCategoryModal={showCategoryModal}
        handleAuthorOk={handleAuthorOk}
        handleCategoryOk={handleCategoryOk}
        handleCategoryChange={handleCategoryChange}
        handleAuthorChange={handleAuthorChange}
        isAuthorModalOpen={isAuthorModalOpen}
        isCategoryModalOpen={isCategoryModalOpen}
        handleAuthorCancel={handleAuthorCancel}
        handleCategoryCancel={handleCategoryCancel}
        authorForm={authorForm}
        categoryForm={categoryForm}
        bookForm={bookForm}
      />
    </>
  );
}

export default RegisterBookPage