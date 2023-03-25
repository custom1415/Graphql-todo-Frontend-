import { gql, useMutation } from "@apollo/client";
import "./App.css";
// import DateComponent from "./components/Date";
import Card from "./components/Card";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "./zustand/userStore";
import { useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { ChangePassword } from "./pages/ChangePassword";

function App() {
  const CREATE_TODO_MUTATION = gql`
    mutation CreateTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        title
        _id
      }
    }
  `;

  const [createTodo, { data: createdTodo, loading: createdLoading, error }] =
    useMutation(CREATE_TODO_MUTATION, {
      variables: {
        input: {
          title: "Sarojasdasd",
          description: "hiiiii",
          userId: "Saroj",
        },
      },
    });

  // if (loading) {
  //   return <h1> DATA IS LOADING...</h1>;
  // }

  return (
    <div className="w-screen h-screen grid place-items-center bg-white">
      {/* <Card /> */}
      <div className="absolute">
        <ToastContainer position="top-center" />
      </div>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Private Routes */}
        <Route path="/app" element={<PrivateRoute />}>
          <Route index element={<Card />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
