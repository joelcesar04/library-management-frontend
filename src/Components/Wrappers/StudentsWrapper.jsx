import { createContext, useEffect, useState } from "react";
import { Alert } from "antd";
import { getStudents } from "../../Services/alunosService";
import Loading from "../Loading/Loading";
import { Outlet } from "react-router-dom";

export const StudentsContext = createContext();

const StudentsWrapper = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const removeStudent = (matricula) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.matricula !== matricula)
    );
  };
  const latestStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };
  const editStudent = (updateStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.alunoId === updateStudent.alunoId ? updateStudent : student
      )
    );
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getStudents();
        setStudents(result);
      } catch (error) {
        setError(
          "Não foi possível carregar os dados dos alunos. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <Loading tip={"Carregando..."} />;
  }
  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <StudentsContext.Provider
      value={{ students, removeStudent, latestStudent, editStudent }}
    >
      <Outlet />
    </StudentsContext.Provider>
  );
};

export default StudentsWrapper;
