import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBookById } from '../../../Services/livrosService'
import { Badge } from 'antd';
import Details from '../../../Components/Details/Details'

const DetailsBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const result = await getBookById(id);
        setBook(result);
      } catch (error) {
        console.log("Erro ao buscar detalhes do livro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const items = [
    {
      key: "1",
      label: "Título",
      children: book.titulo,
    },
    {
      key: "2",
      label: "Editora",
      children: book.editora,
    },
    {
      key: "3",
      label: "Edição",
      children: book.edicao,
    },
    {
      key: "4",
      label: "Data de Publicação",
      children: new Date(book.dataPublicacao).toLocaleDateString(),
    },
    {
      key: "5",
      label: "ISBN",
      span: 1,
      children: book.isbn,
    },
    {
      key: "6",
      label: "Páginas",
      span: 1,
      children: book.paginas,
    },
    {
      key: "7",
      label: "Idioma",
      children: book.idioma,
    },
    {
      key: "8",
      label: "Autor (a)",
      children: book.autor.nome,
    },
    {
      key: "9",
      label: "Categoria",
      children: book.categoria.nome,
    },
    {
      key: "10",
      label: "Disponível",
      span: 1,
      children: (
        <Badge
          status={book.disponivel ? "success" : "error"}
          text={book.disponivel}
        />
      ),
    },
    {
      key: "11",
      label: "Descrição",
      children: book.descricao,
    },
  ];

  return (
    <>
      <Details
        detailTitle='Detalhes do Livro:'
        title={`${book.titulo} - ${book.autor.nome}`}
        items={items}
      />
    </>
  );
}

export default DetailsBookPage