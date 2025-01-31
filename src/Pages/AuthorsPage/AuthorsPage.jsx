import { useContext, useState } from "react";
import { message, Space } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteAuthor } from "../../Services/autoresService";
import TableList from "../../Components/TableList/TableList";
import DeleteAuthorModal from "../../Components/Modal/DeleteAuthorModal";
import { AuthorsContext } from "../../Components/Wrappers/AuthorsWrapper";

const AuthorsPage = () => {
  const { authors, removeAuthor } = useContext(AuthorsContext);
  const [authorName, setAuthorName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const showModal = (record) => {
    setSelectedAuthor(record.key);
    setAuthorName(record.nome);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    try {
      await deleteAuthor(selectedAuthor);
      message.success("Autor removido com sucesso.");
      removeAuthor(selectedAuthor);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "País de Origem",
      dataIndex: "paisOrigem",
      key: "paisOrigem",
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataNascimento",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Biografia",
      dataIndex: "biografia",
      key: "biografia",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/authors/edit/${record.key}`}>
            <EditOutlined style={{ fontSize: "20px" }} />
          </Link>
          <a onClick={() => showModal(record)}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </a>
        </Space>
      ),
    },
  ];
  const registros = Array.isArray(authors)
    ? authors.map((value) => ({
        ...value,
        key: value.autorId,
      }))
    : [];

  return (
    <>
      <TableList
        title={"Biblioteca JV - Lista de Autores"}
        link="/authors/register"
        columns={columns}
        registros={registros}
        addButton={"Cadastrar Novo Autor"}
      />
      <DeleteAuthorModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        authorName={authorName}
      />
    </>
  );
};

export default AuthorsPage;
