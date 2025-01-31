import { useContext, useEffect, useState } from "react";
import { Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorById, updateAuthor } from "../../../Services/autoresService";
import { AuthorsContext } from "../../../Components/Wrappers/AuthorsWrapper";
import AuthorEditForm from "../../../Components/EditForms/AuthorEditForm";
import dayjs from "dayjs";

const EditAuthorPage = () => {
  const { editAuthor } = useContext(AuthorsContext);

  const [authorName, setAuthorName] = useState("");

  const [authorForm] = Form.useForm();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const result = await getAuthorById(id);
        setAuthorName(result.nome);
        authorForm.setFieldsValue({
          ...result,
          dataNascimento: result.dataNascimento
            ? dayjs(result.dataNascimento, "YYYY-MM-DD")
            : null,
        });
      } catch (error) {
        message.error(error.message);
        navigate("/authors");
      }
    };
    fetchAuthor();
  }, [id]);

  const handleUpdateAuthor = async (values) => {
    try {
      const result = await updateAuthor(id, {
        nome: values.nome,
        paisOrigem: values.paisOrigem,
        dataNascimento: values.dataNascimento,
        biografia: values.biografia,
      });

      if (result) {
        editAuthor(result);
        message.success("Autor atualizado com sucesso!");
        authorForm.resetFields();
        navigate("/authors");
      } else {
        message.error("Erro ao atualizar autor!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <AuthorEditForm
        authorName={authorName}
        authorForm={authorForm}
        handleUpdateAuthor={handleUpdateAuthor}
      />
    </>
  );
};

export default EditAuthorPage;
