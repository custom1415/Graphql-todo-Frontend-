import { gql, useQuery } from "@apollo/client";

import SingleTodo from "./SingleTodo";
import Input from "./Input";
import DateComponent from "./Date";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "../zustand/userStore";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Todo = {
  title: string;
  completed: boolean;
  _id: string;
};
function Card() {
  const user = useUserStore((state) => state.user);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user.username) navigate("/");
  // }, []);

  const [isInputHidden, setIsInputHidden] = useState(true);
  const QUERY_TODOS = gql`
    query ($email: String!) {
      todos(email: $email) {
        todos {
          title
          _id
          completed
        }
        todosCount
      }
    }
  `;
  const { data, loading, refetch } = useQuery(QUERY_TODOS, {
    variables: {
      email: user.email,
    },
    onCompleted: (data) => console.log(data),
  });

  const toggleInputHidden = () => {
    setIsInputHidden(!isInputHidden);
  };

  return (
    <div className="w-[400px] rounded-xl h-[500px] relative overflow-scroll shadow  flex flex-col  ">
      {isInputHidden ? (
        <DateComponent
          todosCount={data?.todos?.todosCount}
          toggleInputHidden={toggleInputHidden}
        />
      ) : (
        <Input refetch={refetch} toggleInputHidden={toggleInputHidden} />
      )}

      {data ? (
        data.todos.todos.map((todo: Todo) => {
          return (
            <SingleTodo
              refetch={refetch}
              key={todo._id}
              id={todo._id}
              title={todo.title}
              completed={todo.completed}
            />
          );
        })
      ) : (
        <div className="grid place-items-center pt-12">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
        </div>
      )}
      {data?.todos?.todos && !data.todos.todos.length && (
        <h1 className="text-center my-8 text-2xl">Your Todo-list is Empty!</h1>
      )}
    </div>
  );
}

export default Card;
