import React from 'react'
import BookCard from '../Cards/BookCard';
import StudentCard from '../Cards/StudentCard';

const Dashboard = ({ books, students }) => {
  return (
    <>
      <h1 className="title">Biblioteca JV - DashBoard</h1>
      <div style={{
        display: 'flex',
        gap: 20
      }}>
        <BookCard title="Livros" data={books} route="/books" />
        <StudentCard title="Alunos" data={students} route="/students" />
      </div>
    </>
  );
};

export default Dashboard