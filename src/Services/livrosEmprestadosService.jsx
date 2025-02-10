import axios from 'axios';

const api = 'https://localhost:44349/api';

export const getBorrowedBooks = async () => {
  try {
    const response = await axios.get(`${api}/emprestimo`);
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const addBorrowedBook = async (borrowedBook) => {
  try {
    const response = await axios.post(`${api}/emprestimo`, borrowedBook)
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        throw new Error(data); // Trata respostas diretas como strings
      } else if (data.message) {
        throw new Error(data.message);
      } else if (data.errors && Array.isArray(data.errors)) {
        throw new Error(data.errors.join("\n"));
      }
    }

    console.error("Erro ao enviar o empréstimo", error.response?.data);
    throw new Error("Erro ao enviar o empréstimo");
  }
}


export const updateBorrowedBook = async (id) => {
  try {
    const response = await axios.put(`${api}/emprestimo/${id}`)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao devolver livro", error.response.data)
      throw new Error("Erro ao devolver livro");
    }
  }
}
