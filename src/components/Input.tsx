import { ChangeEvent, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  toggleInputHidden: () => void;
  refetch: () => void;
}

function Input({ toggleInputHidden, refetch }: Props) {
  const [todo, setTodo] = useState("");
  const toastNotification = (msg: string) => {};
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }
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
      onCompleted: () => {
        toast("Added Todo!", { type: "success" });
        refetch();
      },
    });
  return (
    <form
      className={`flex items-center gap-3 justify-between w-full p-9 max-h-24 sticky  bg-blue-500 transition-all  top-0 left-0 z-10`}
      onSubmit={(e) => {
      

        e.preventDefault();
        if (!todo) {
          toast("Please add a todo title", {
            type: "error",
            autoClose: 1000,
          });
          return;
        }
        createTodo({
          variables: {
            input: {
              title: todo,
              userId: "Saroj",
            },
          },
        });
        toggleInputHidden()

      }}
    >
      <input
        type="text"
        onChange={handleChange}
        value={todo}
        placeholder="Buy Eggs"
        className="outline-none p-2"
      />
      <button className="bg-blue-800 flex-1 p-2 text-white cursor-pointer">
        Add
      </button>
    </form>
  );
}

export default Input;
