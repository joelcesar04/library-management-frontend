import axios from 'axios';

const api = 'https://localhost:44349/api';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${api}/categoria`)
    return response.data
  } catch (error) {
    console.log('Erro ao carregar categorias', error);
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${api}/categoria/${id}`)
    return response.data;
  } catch (error) {
    console.log('Erro ao carregar categoria', error);
  }
}

export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${api}/categoria`, category)
    return response.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro ao enviar a categoria");
    }
  }
}