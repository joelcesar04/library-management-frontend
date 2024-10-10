import axios from 'axios';

const api = 'https://localhost:44349/api';

export const getStudents = async () => {
  try {
    const response = await axios.get(`${api}/aluno`)
    return response.data
  } catch (error) {
    console.log('Erro ao carregar alunos', error);
    throw error;
  }
}

export const getStudentByMatric = async (matricula) => {
  try {
    const response = await axios.get(`${api}/aluno/${matricula}`)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao buscar o aluno", error.response.data)
      throw new Error("Erro ao buscar o aluno");
    }
  }
}


export const addStudent = async (aluno) => {
  try {
    const response = await axios.post(`${api}/aluno`, aluno)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao enviar o aluno", error)
      throw new Error("Erro ao enviar o aluno");
    }
  }
}

export const updateStudent = async (matricula, student) => {
  try {
    const response = await axios.put(`${api}/aluno/${matricula}`, student)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao atualizar o aluno", error.response.data)
      throw new Error("Erro ao atualizar o aluno");
    }
  }
}


export const deleteStudent = async (matricula) => {
  try {
    const response = await axios.delete(`${api}/aluno/${matricula}`)
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Erro ao deletar o aluno", error.response.data)
      throw new Error("Erro ao deletar o aluno");
    }
  }
}