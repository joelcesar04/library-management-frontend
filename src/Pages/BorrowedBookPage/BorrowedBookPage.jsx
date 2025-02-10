import { useContext, useState } from "react";
import { BorrowedBookContext } from "../../Components/Wrappers/BorrowedBookWrapper";
import { message, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import TableList from "../../Components/TableList/TableList";
import BorrowedBookModal from "../../Components/Modal/BorrowedBookModal";
import { updateBorrowedBook } from "../../Services/livrosEmprestadosService";

const BorrowedBookPage = () => {
  const { borrowedBooks, updateBorrowedBooks } = useContext(BorrowedBookContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookName, setBookName] = useState("");
  const [livroEmprestadoId, setLivroEmprestadoId] = useState(null);

  const showModal = (record) => {
    setBookName(record.livro);
    setLivroEmprestadoId(record.livroEmprestadoId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    try {
      await updateBorrowedBook(livroEmprestadoId);
      message.success("Devolução confirmada com sucesso.");
      updateBorrowedBooks(livroEmprestadoId);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsModalVisible(false);
    }
  };


  const columns = [
    {
      title: "Matrícula",
      dataIndex: "alunoMatricula",
      key: "alunoMatricula",
    },
    {
      title: "Aluno",
      dataIndex: "aluno",
      key: "aluno",
    },
    {
      title: "Livro",
      dataIndex: "livro",
      key: "livro",
    },
    {
      title: "Data do Empréstimo",
      dataIndex: "dataEmprestimo",
      key: "dataEmprestimo",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Data Prevista para Devolução",
      dataIndex: "dataDevolucaoPrevista",
      key: "dataDevolucaoPrevista",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Data da Devolução",
      dataIndex: "dataDevolucaoReal",
      key: "dataDevolucaoReal",
      render: (date) => date ? new Date(date).toLocaleDateString() : "Ainda não devolvido",
    },
    {
      title: "Confirmar Devolução",
      key: "action",
      render: (_, record) => {
        const isReturned = !!record.dataDevolucaoReal;
        return (
          <Tooltip
            title={isReturned ? "Devolução já realizada" : "Realizar devolução"}
          >
            <Space size="middle">
              <a
                onClick={() => !isReturned && showModal(record)}
                disabled={isReturned}
              >
                <CheckOutlined
                  style={{
                    fontSize: "20px",
                    color: isReturned ? "#d9d9d9" : "#1890ff",
                  }}
                />
              </a>
            </Space>
          </Tooltip>
        );
      },
    },
  ];

  const registros = Array.isArray(borrowedBooks)
    ? borrowedBooks.map((value) => ({
        ...value,
        key: value.livroEmprestadoId,
      }))
    : [];

  return (
    <>
      <TableList
        title={"Biblioteca JV - Empréstimo de Livros"}
        link="/borrowed-books/register"
        columns={columns}
        registros={registros}
        addButton={"Cadastrar Empréstimo de Livro"}
      />
      <BorrowedBookModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        bookName={bookName}
      />
    </>
  );
}

export default BorrowedBookPage