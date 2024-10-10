import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import StudentRegisterForm from '../../../Components/RegisterForms/StudentRegisterForm'
import { StudentsContext } from '../../../Components/Wrappers/StudentsWrapper';
import { addStudent } from '../../../Services/alunosService';

const RegisterStudentPage = () => {
  const { latestStudent } = useContext(StudentsContext);

  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const [studentForm] = Form.useForm(); 

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }
  const removePhoneMask = (phone) => {
    return phone.replace(/\D/g, '')
  }

  const handleAddStudent = async (values) => {
    try {
      const result = await addStudent({
        matricula: values.matricula,
        nome: values.nome,
        email: values.email,
        curso: values.curso,
        telefone: removePhoneMask(values.telefone)
      })
      
      if (result) {
        latestStudent(result);
        message.success("Aluno adicionado com sucesso!");
        studentForm.resetFields();
        navigate("/students");
      }

    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <StudentRegisterForm
        studentForm={studentForm}
        handleAddStudent={handleAddStudent}
        handlePhoneChange={handlePhoneChange}
        phone={phone}
      />
    </>
  );
}

export default RegisterStudentPage