import { ChangeEvent, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../zustand/userStore";
interface Props {
  toggleInputHidden: () => void;
  refetch: () => void;
}

function Input({ toggleInputHidden, refetch }: Props) {
  const user = useUserStore((state) => state.user);
  const [todo, setTodo] = useState("");
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }
  const CREATE_TODO_MUTATION = gql`
    mutation CreateTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        title
      }
    }
  `;

  const [createTodo, { loading }] = useMutation(CREATE_TODO_MUTATION, {
    onCompleted: () => {
      toast("Added Todo!", { type: "success" });
      refetch();
      toggleInputHidden();
    },
  });
  return (
    <form
      className={`flex items-center justify-between w-full p-9 max-h-24 sticky  bg-blue-500 transition-all  top-0 left-0 z-10`}
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
            },
          },
        });
      }}
    >
      <input
        type="text"
        onChange={handleChange}
        value={todo}
        placeholder="Buy Eggs"
        className="outline-none p-2 rounded-l-xl "
      />
      <button className="bg-blue-800 whitespace-nowrap flex w-full justify-center items-center gap-2  p-2 rounded-r-xl text-white cursor-pointer">
        <span>Add</span>
        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </button>
    </form>
  );
}

export default Input;
