import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, message } from "antd";
import {
  getStudentByMatric,
  updateStudent,
} from "../../../Services/alunosService";
import { StudentsContext } from "../../../Components/Wrappers/StudentsWrapper";
import StudentEditForm from "../../../Components/EditForms/StudentEditForm";

const EditStudentPage = () => {
  const { editStudent } = useContext(StudentsContext);

  const [studentName, setStudentName] = useState("");

  const [studentForm] = Form.useForm();

  const { matricula } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await getStudentByMatric(matricula);
        setStudentName(result.nome);
        studentForm.setFieldsValue({
          ...result,
        });
      } catch (error) {
        message.error(error.message);
        navigate("/students");
      }
    };
    fetchStudent();
  }, [matricula]);

  const handleUpdateStudent = async (values) => {
    try {
      const result = await updateStudent(matricula, {
        nome: values.nome,
        curso: values.curso,
        email: values.email,
        telefone: values.telefone,
        ativo: values.ativo,
      });

      if (result) {
        editStudent(result);
        message.success("Aluno atualizado com sucesso!");
        studentForm.resetFields();
        navigate("/students");
      } else {
        message.error("Erro ao atualizar aluno!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <StudentEditForm
        studentName={studentName}
        studentForm={studentForm}
        handleUpdateStudent={handleUpdateStudent}
      />
    </>
  );
};

export default EditStudentPage;
