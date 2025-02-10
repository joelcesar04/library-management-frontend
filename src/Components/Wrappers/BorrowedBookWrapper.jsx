import { createContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { Alert } from "antd";
import { getBorrowedBooks } from "../../Services/livrosEmprestadosService";
import { getStudents } from "../../Services/alunosService";
import { getBooks } from "../../Services/livrosService";
import Loading from "../Loading/Loading";

export const BorrowedBookContext = createContext();

const BorrowedBookWrapper = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const latestBorrowedBook = (newBorrowedBook) => {
    const aluno = students.find((a) => a.alunoId === newBorrowedBook.alunoId);
    const livro = books.find((l) => l.livroId === newBorrowedBook.livroId);

    const enrichedBook = {
      ...newBorrowedBook,
      aluno: aluno ? aluno.nome : "Desconhecido",
      alunoMatricula: aluno ? aluno.matricula : "Desconhecido",
      livro: livro ? livro.titulo : "Desconhecido",
    };

    setBorrowedBooks((prevBorrowedBooks) => [
      ...prevBorrowedBooks,
      enrichedBook,
    ]);
  };

    const updateBorrowedBooks = (livroEmprestadoId) => {
      setBorrowedBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.livroEmprestadoId === livroEmprestadoId
            ? { ...book, dataDevolucaoReal: new Date().toISOString() } // Atualiza a data de devolução
            : book
        )
      );
    };

    useEffect(() => {
      const fetchBorrowedBooks = async () => {
        try {
          const result = await getBorrowedBooks();
          const alunos = await getStudents();
          const livros = await getBooks();

          const enrichedBooks = result.map((book) => ({
            ...book,
            aluno:
              alunos.find((a) => a.alunoId === book.alunoId)?.nome ||
              "Desconhecido",
            alunoMatricula:
              alunos.find((a) => a.alunoId === book.alunoId)?.matricula ||
              "Desconhecido",
            livro:
              livros.find((l) => l.livroId === book.livroId)?.titulo ||
              "Desconhecido",
          }));

          setBorrowedBooks(enrichedBooks);
          setStudents(alunos);
          setBooks(livros);
        } catch (error) {
          console.error("Erro ao carregar livros emprestados", error);
          setError(
            "Não foi possível carregar os dados dos livros emprestados. Por favor, tente novamente mais tarde."
          );
        } finally {
          setLoading(false);
        }
      };
      fetchBorrowedBooks();
    }, []);

  if (loading) {
    return <Loading tip={"Carregando..."} />;
  }
  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <BorrowedBookContext.Provider
      value={{
        borrowedBooks,
        updateBorrowedBooks,
        students,
        books,
        latestBorrowedBook,
      }}
    >
      <Outlet />
    </BorrowedBookContext.Provider>
  );
}

export default BorrowedBookWrapper