import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message, Form } from "antd";
import { BorrowedBookContext } from "../../../Components/Wrappers/BorrowedBookWrapper";
import { addBorrowedBook } from "../../../Services/livrosEmprestadosService";
import BorrowedBookRegisterForm from "../../../Components/RegisterForms/BorrowedBookRegisterForm";

const RegisterBorrowedBookPage = () => {
  const { latestBorrowedBook } = useContext(BorrowedBookContext);

  const navigate = useNavigate();

  const [borrowedBookForm] = Form.useForm();

  const handleAddBorrowedBook = async (values) => {
    try {
      const newBorrowedBook = await addBorrowedBook({
        livroId: values.livroId,
        alunoId: values.alunoId,
      });

      if (newBorrowedBook) {
        latestBorrowedBook(newBorrowedBook);
        message.success("Empréstimo cadastrado com sucesso!");
        borrowedBookForm.resetFields();
        navigate("/borrowed-books");
      }
    } catch (error) {
      message.error(error.message);
    }

  };

  return (
    <>
      <BorrowedBookRegisterForm
        handleAddBorrowedBook={handleAddBorrowedBook}
        borrowedBookForm={borrowedBookForm}
      />
    </>
  );
};

export default RegisterBorrowedBookPage;