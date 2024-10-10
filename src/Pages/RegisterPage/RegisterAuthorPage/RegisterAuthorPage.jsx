import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import { addAuthor } from '../../../Services/autoresService';
import { AuthorsContext } from '../../../Components/Wrappers/AuthorsWrapper';
import AuthorRegisterForm from '../../../Components/RegisterForms/AuthorRegisterForm';

const RegisterAuthorPage = () => {
  const { latestAuthor } = useContext(AuthorsContext);
  const navigate = useNavigate();

  const [authorForm] = Form.useForm();

  const handleAddAuthor = async (values) => {
    try {
      const newAuthor = await addAuthor({
        nome: values.nome,
        paisOrigem: values.paisOrigem,
        dataNascimento: values.dataNascimento,
        biografia: values.biografia,
      });

      if (newAuthor) {
        latestAuthor(newAuthor);
        message.success("Autor adicionado com sucesso!");
        authorForm.resetFields();
        navigate("/authors");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <AuthorRegisterForm 
        handleAddAuthor={handleAddAuthor}
        authorForm={authorForm}
      />
    </>
  );
};

export default RegisterAuthorPage;