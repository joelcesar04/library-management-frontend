import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBook } from "../../Services/livrosService";
import { BooksContext } from "../../Components/Wrappers/BooksWrapper";
import TableList from "../../Components/TableList/TableList";
import DeleteBookModal from "../../Components/Modal/DeleteBookModal";

const BooksPage = () => {
  const { books, removeBook } = useContext(BooksContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("");

  const showModal = (record) => {
    setSelectedBook(record.key);
    setBookTitle(record.titulo);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    try {
      await deleteBook(selectedBook);
      message.success("Livro removido com sucesso.");
      removeBook(selectedBook);
    } catch (error) {
      console.error("Erro ao remover livro:", error);
      message.error("Erro ao remover livro.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
      render: (text, record) => (
        <Link to={`/books/details/${record.key}`}>{text}</Link>
      ),
    },
    {
      title: "Autor(a)",
      dataIndex: "autor",
      key: "autor",
      render: (autor) => <span>{autor.nome}</span>,
    },
    {
      title: "Editora",
      dataIndex: "editora",
      key: "editora",
    },
    {
      title: "Edição",
      dataIndex: "edicao",
      key: "edicao",
    },
    {
      title: "Páginas",
      dataIndex: "paginas",
      key: "paginas",
    },
    {
      title: "Idioma",
      dataIndex: "idioma",
      key: "idioma",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      render: (categoria) => <span>{categoria.nome}</span>,
    },
    {
      title: "Data de Publicação",
      dataIndex: "dataPublicacao",
      key: "dataPublicacao",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Disponível",
      dataIndex: "disponivel",
      key: "disponivel",
      render: (available) => (
        <Tag color={available ? "green" : "volcano"}>
          {available ? "Disponível" : "Indisponível"}
        </Tag>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/books/edit/${record.key}`}>
            <EditOutlined style={{ fontSize: "20px" }} />
          </Link>
          <a onClick={() => showModal(record)}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </a>
        </Space>
      ),
    },
  ];
  const registros = Array.isArray(books)
    ? books.map((value) => ({
        ...value,
        key: value.livroId,
      }))
    : [];

  return (
    <>
      <TableList
        title={"Biblioteca JV - Lista de Livros"}
        link="/books/register"
        columns={columns}
        registros={registros}
        addButton={"Cadastrar Novo Livro"}
      />
      <DeleteBookModal
        bookTitle={bookTitle}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
};

export default BooksPage;
