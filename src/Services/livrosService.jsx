import axios from 'axios';

const api = 'https://localhost:44349/api';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${api}/livro`);
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${api}/livro/${id}`);
    return response.data
  } catch (error) {
    console.error('Erro ao carregar o livro', error);
  }
}

export const addBook = async (book) => {
  try {
    const response = await axios.post(`${api}/livro`, book)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro ao enviar o livro");
    }
  }
}

export const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${api}/livro/${id}`, book)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Resposta do erro", error.response.data);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    } else {
      console.error("Erro ao atualizar o livro", error.message);
      throw new Error("Erro ao atualizar o livro");
    }
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${api}/livro/${id}`)
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao deletar o livro", error)
      throw new Error("Erro ao deletar o livro");
    }
  }
} 