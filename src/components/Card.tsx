import { gql, useQuery } from "@apollo/client";

import SingleTodo from "./SingleTodo";
import Input from "./Input";
import DateComponent from "./Date";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
type Todo = {
  title: string;
  completed: boolean;
  _id: string;
};
function Card() {
  const [isInputHidden, setIsInputHidden] = useState(true);
  const QUERY_TODOS = gql`
    query ($userId: ID!) {
      todos(userId: $userId) {
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
      userId: "Saroj",
    },
  });
  const toggleInputHidden = () => {
    console.log(isInputHidden);

    setIsInputHidden(!isInputHidden);
  };

  return (
    <div className="w-[400px] h-[500px] relative overflow-scroll shadow border flex flex-col  ">
      <ToastContainer position="top-center" />

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
        <h1 className="text-center m-4">Fetching</h1>
      )}
      {data?.todos?.todos && !data.todos.todos.length && (
        <h1 className="text-center my-8 text-2xl">Your Todo-list is Empty!</h1>
      )}
    </div>
  );
}

export default Card;
