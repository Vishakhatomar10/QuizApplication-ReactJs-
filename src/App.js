import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/LoginPage/Login';
import SignIn from './Pages/SignUp/SignUp';
import Quiz from './Pages/Quiz/Quiz';
import QuizSubject from './Pages/Quiz/QuizSubject';
import ForgotPswd from './Pages/ForgotPassword/ForgotPswd';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import QuestionTable from './Pages/Admin/QuestionTable';

import LandingPage from './Pages/LandingPage/LandingPage';
import AddQuestion from './Pages/Admin/AddQuestion';
import AdminPage from './Pages/Admin/AdminPage';

import { createContext, useState } from 'react';
import PreviewPage from './Pages/Quiz/PreviewPage';
import SubmitPage from './Pages/Quiz/SubmitPage';
import AboutUs from './Pages/AboutUs/AboutUs';


export const UserContext = createContext();

function App() {
  const [quizData, setQuizData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [user, setUser] = useState("UserName");


  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <LandingPage />
        },
        {
          path:"/aboutUs",
          element:<AboutUs/>
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <SignIn />
        },
        {
          path: "/forgotPassword",
          element: <ForgotPswd />
        }

      ]

    },
    {
      path: "admin",
      element: <AdminPage />
    },
    {
      path: "addQuestion",
      element: <AddQuestion />
    },
    {
      path: "questionTable",
      element: <QuestionTable />
    },
    {
      path: "/:id/:questionId",
      element: <Quiz />
    },
    {
      path: "/:id",
      element: <Quiz />
    },

    {
      path: "selectQuiz",
      element: <QuizSubject />,

    },
    {
      path: "preview",
      element: <PreviewPage />,

    },
    {
      path: "submit",
      element: <SubmitPage />,

    },

  ]
  )

  return (
    <div className="App">
      <UserContext.Provider value={{ quizData, setQuizData, selectedOptions, setSelectedOptions, user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
