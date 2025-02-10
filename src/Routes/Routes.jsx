import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import BooksPage from "../Pages/BooksPage/BooksPage";
import DetailsBookPage from "../Pages/DetailsPage/DetailsBookPage/DetailsBookPage";
import RegisterBookPage from "../Pages/RegisterPage/RegisterBookPage/RegisterBookPage";
import EditBookPage from "../Pages/EditPage/EditBookPage/EditBookPage";
import AuthorsPage from "../Pages/AuthorsPage/AuthorsPage";
import BooksWrapper from "../Components/Wrappers/BooksWrapper";
import AuthorsWrapper from "../Components/Wrappers/AuthorsWrapper";
import RegisterAuthorPage from "../Pages/RegisterPage/RegisterAuthorPage/RegisterAuthorPage";
import EditAuthorPage from "../Pages/EditPage/EditAuthorPage/EditAuthorPage";
import StudentsWrapper from "../Components/Wrappers/StudentsWrapper";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import RegisterStudentPage from "../Pages/RegisterPage/RegisterStudentPage/RegisterStudentPage";
import EditStudentPage from "../Pages/EditPage/EditStudentPage/EditStudentPage";
import BorrowedBookWrapper from "../Components/Wrappers/BorrowedBookWrapper";
import BorrowedBookPage from "../Pages/BorrowedBookPage/BorrowedBookPage";
import RegisterBorrowedBookPage from "../Pages/RegisterPage/RegisterBorrowedBookPage/RegisterBorrowedBookPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/books",
        element: <BooksWrapper />,
        children: [
          { path: "", element: <BooksPage /> },
          { path: "details/:id", element: <DetailsBookPage /> },
          { path: "register", element: <RegisterBookPage /> },
          { path: "edit/:id", element: <EditBookPage /> },
        ],
      },
      {
        path: "/authors",
        element: <AuthorsWrapper />,
        children: [
          { path: "", element: <AuthorsPage /> },
          { path: "register", element: <RegisterAuthorPage />},
          { path: "edit/:id", element: <EditAuthorPage />}
        ],
      },
      {
        path: "/students",
        element: <StudentsWrapper />,
        children: [
          { path: "", element: <StudentsPage /> },
          { path: "register", element: <RegisterStudentPage /> },
          { path: "edit/:matricula", element: <EditStudentPage />}
        ]
      },
      {
        path: "/borrowed-books",
        element: <BorrowedBookWrapper />,
        children: [
          { path: "", element: <BorrowedBookPage /> },
          { path: "register", element: <RegisterBorrowedBookPage /> },
        ]
      }
    ],
  },
]);