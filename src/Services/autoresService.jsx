import axios from 'axios';

const api = 'https://localhost:44349/api';

export const getAuthors = async () => {
  try {
    const response = await axios.get(`${api}/autor`)
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${api}/autor/${id}`)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao buscar o autor", error.response.data)
      throw new Error("Erro ao buscar o autor");
    }
  }
}

export const addAuthor = async (author) => {
  try {
    const response = await axios.post(`${api}/autor`, author)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao enviar o autor", error.response.data)
      throw new Error("Erro ao enviar o autor");
    }
  }
}

export const updateAuthor = async (id, author) => {
  try {
    const response = await axios.put(`${api}/autor/${id}`, author)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao atualizar o autor", error.response.data)
      throw new Error("Erro ao atualizar o autor");
    }
  }
}

export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${api}/autor/${id}`)
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao deletar o autor", error.response.data)
      throw new Error("Erro ao deletar o autor");
    }
  }
}