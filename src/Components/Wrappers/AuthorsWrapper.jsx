import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getAuthors } from '../../Services/autoresService';
import { Alert } from 'antd';
import Loading from '../Loading/Loading';

export const AuthorsContext = createContext();

const AuthorsWrapper = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const latestAuthor = (newAuthor) => {
    setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
  }
  const editAuthor = (updateAuthor) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.autorId === updateAuthor.autorId ? updateAuthor : author
      )
    );
  }
  const removeAuthor = (id) => {
    setAuthors(prevAuthors => prevAuthors.filter(author => author.autorId !== id));
  }

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const result = await getAuthors();
        setAuthors(result)
      } catch (error) {
        console.error("Erro ao carregar autores", error);
        setError(
          "Não foi possível carregar os dados dos autores. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  if (loading) {
    return <Loading tip={"Carregando..."} />;
  }
  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <AuthorsContext.Provider
      value={{ authors, removeAuthor, latestAuthor, editAuthor }}
    >
      <Outlet />
    </AuthorsContext.Provider>
  );
}

export default AuthorsWrapper