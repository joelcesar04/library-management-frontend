import { useState, useEffect } from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import { getStudents } from "../../Services/alunosService";
import { getBooks } from "../../Services/livrosService";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resultBooks = await getBooks();
      const resultStudentes = await getStudents();

      setBooks(resultBooks);
      setStudents(resultStudentes);
    };
    getData();
  }, []);

  return (
    <>
      <Dashboard books={books} students={students} />
    </>
  );
};

export default HomePage;
