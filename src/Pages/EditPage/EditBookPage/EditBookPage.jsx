import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  message
} from "antd";
import { addAuthor, getAuthors } from "../../../Services/autoresService";
import { getCategories, addCategory } from '../../../Services/categoryService'; 
import { getBookById, updateBook } from '../../../Services/livrosService'; 
import { BooksContext } from "../../../Components/Wrappers/BooksWrapper";
import BookEditForm from '../../../Components/EditForms/BookEditForm';
import dayjs from "dayjs";

const EditBookPage = () => {
  const { editBook } = useContext(BooksContext);

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialAutorId, setInitialAutorId] = useState(null);
  const [initalCategoriaId, setInitialCategoriaId] = useState(null);
  const [bookTitle, setBookTitle] = useState("");

  const [authorForm] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [bookForm] = Form.useForm();

  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBookById(id);
        setBookTitle(result.titulo)
        setInitialAutorId(result.autor ? result.autor.autorId : null);
        setInitialCategoriaId(result.categoria ? result.categoria.categoriaId : null);
        bookForm.setFieldsValue({
          ...result,
          dataPublicacao: result.dataPublicacao ? dayjs(result.dataPublicacao, 'YYYY-MM-DD') : null,
        });
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
        message.error('Erro ao buscar livro.');
        navigate('/books');
      }
    };
    const fetchAuthors = async () => {
      try {
        const result = await getAuthors();
        setAuthors(result);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
        message.error('Erro ao buscar autores.');
      }
    };
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
        message.error('Erro ao buscar categorias.');
      }
    }
    fetchAuthors();
    fetchCategories();
    fetchBook();
  }, [id, bookForm]);

  const handleUpdateBook = async (values) => {
    try {
      const book = {
        titulo: values.titulo,
        descricao: values.descricao,
        editora: values.editora,
        edicao: values.edicao,
        isbn: values.isbn,
        paginas: values.paginas,
        idioma: values.idioma,
        // dataPublicacao: dayjs(values.dataPublicacao).format('YYYY-MM-DD'),
        dataPublicacao: values.dataPublicacao,
        disponivel: values.disponivel,
        autorId: values.autor,
        categoriaId: values.categoria,
      }

      const updateBookId = await updateBook(id, book);

      if (updateBookId) {
        editBook(updateBookId)
        message.success("Livro atualizado com sucesso!");
        bookForm.resetFields();
        navigate("/books");
      } else {
        message.error("Erro ao atualizar livro!");
      }
    } catch (error) {
      console.error("Erro ao atualizar livro:", error)
      message.error('Erro ao atualizar livro.');
    }
  };

  return (
    <>
      <BookEditForm
        bookTitle={bookTitle}
        authors={authors}
        initialAutorId={initialAutorId}
        categories={categories}
        initalCategoriaId={initalCategoriaId}
        handleAddAuthor={handleAddAuthor}
        handleAddCategory={handleAddCategory}
        showAuthorModal={showAuthorModal}
        showCategoryModal={showCategoryModal}
        handleAuthorOk={handleAuthorOk}
        handleCategoryOk={handleCategoryOk}
        isAuthorModalOpen={isAuthorModalOpen}
        isCategoryModalOpen={isCategoryModalOpen}
        handleAuthorCancel={handleAuthorCancel}
        handleCategoryCancel={handleCategoryCancel}
        authorForm={authorForm}
        categoryForm={categoryForm}
        bookForm={bookForm}
        handleUpdateBook={handleUpdateBook}
      />
    </>
  );
};

export default EditBookPage
