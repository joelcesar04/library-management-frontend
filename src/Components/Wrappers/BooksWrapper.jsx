import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Alert } from 'antd';
import { getBooks } from '../../Services/livrosService';
import { getCategoryById } from '../../Services/categoryService';
import { getAuthorById } from '../../Services/autoresService';
import Loading from '../Loading/Loading';

export const BooksContext = createContext();

const BooksWrapper = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const removeBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.livroId !== id)
    );
  }
  const fetchAdditionalData = async (book) => {
    const category = await getCategoryById(book.categoria.categoriaId)
    const author = await getAuthorById(book.autor.autorId)

    return {
      ...book,
      categoria: {
        ...book.categoria,
        nome: category.nome
      },
      autor: {
        ...book.autor,
        nome: author.nome
      },
    };
  }
  const editBook = async (book) => {
    const updateBook = await fetchAdditionalData(book);

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.livroId === updateBook.livroId ? updateBook : book
      )
    );
  }
  const latestBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getBooks();
        setBooks(result);
      } catch (error) {
        console.error("Erro ao carregar livros", error);
        setError(
          "Não foi possível carregar os dados dos livros. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <Loading tip={"Carregando..."} />;
  }
  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <BooksContext.Provider value={{ books, removeBook, editBook, latestBook}}>
      <Outlet />
    </BooksContext.Provider>
  );
}

export default BooksWrapper