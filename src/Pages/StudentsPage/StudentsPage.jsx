import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { message, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StudentsContext } from "../../Components/Wrappers/StudentsWrapper";
import { deleteStudent } from "../../Services/alunosService";
import TableList from "../../Components/TableList/TableList";
import DeleteStudentModal from "../../Components/Modal/DeleteStudentModal";

const StudentsPage = () => {
  const { students, removeStudent } = useContext(StudentsContext);
  const [studentName, setStudentName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const showModal = (record) => {
    setSelectedStudent(record.matricula);
    setStudentName(record.nome);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    try {
      await deleteStudent(selectedStudent);
      removeStudent(selectedStudent);
      message.success("Aluno removido com sucesso.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsModalVisible(false);
    }
  };
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";

    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length === 11) {
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }

    return phoneNumber; // Retorna o número original se não puder formatar
  };
  const registros = Array.isArray(students)
    ? students.map((value) => ({
        ...value,
        key: value.alunoId,
      }))
    : [];
  const columns = [
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Celular",
      dataIndex: "telefone",
      key: "telefone",
      render: (text) => formatPhoneNumber(text),
    },
    {
      title: "Ativo",
      dataIndex: "ativo",
      key: "ativo",
      render: (available) => (
        <Tag color={available ? "green" : "volcano"}>
          {available ? "Ativo" : "Bloqueado"}
        </Tag>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/students/edit/${record.matricula}`}>
            <EditOutlined style={{ fontSize: "20px" }} />
          </Link>
          <a onClick={() => showModal(record)}>
            <DeleteOutlined style={{ fontSize: "20px" }} />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TableList
        title={"Biblioteca JV - Lista de Alunos"}
        link="/students/register"
        columns={columns}
        registros={registros}
        addButton={"Cadastrar Novo Aluno"}
      />
      <DeleteStudentModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        studentName={studentName}
      />
    </>
  );
};

export default StudentsPage;
