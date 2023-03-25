import { HiCheckCircle } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  id: string;
  title: string;
  completed: boolean;
  refetch: () => void;
};

function SingleTodo({ id, title, completed, refetch }: Props) {
  const [pointerEvents, setPointerEvents] = useState(true);
  const UPDATE_TODO_MUTATION = gql`
    mutation updateTodo($input: UpdateTodoInput!) {
      updateTodo(input: $input) {
        title
        _id
      }
    }
  `;
  const DELETE_TODO_MUTATION = gql`
    mutation deleteTodo($todoId: ID!) {
      deleteTodo(todoId: $todoId)
    }
  `;
  const [updateTodo, { loading: updateLoading, data }] =
    useMutation(UPDATE_TODO_MUTATION);
  const [deleteTodo, { loading: deleteLoading }] =
    useMutation(DELETE_TODO_MUTATION);

  return (
    <div
      className={`${
        !pointerEvents && "pointer-events-none"
      } px-8 py-4 group flex items-center justify-between transition-all ${
        (updateLoading || deleteLoading) && "opacity-30"
      }  border-gray-100 border-y  hover:border-blue-400    bg-white `}
    >
      <h1 className="group-hover:text-blue-600">{title}</h1>
      <div className=" flex gap-6 items-center">
        {/* <AiOutlineEdit className="text-xl group-hover:inline-block" /> */}
        <div
          onClick={() => {
            setPointerEvents(false);

            deleteTodo({
              variables: {
                todoId: id,
              },
              onCompleted: () => {
                toast("Todo removed!", { type: "error" });
                refetch();
              },
            });
          }}
          className="p-4 cursor-pointer group/del hover:bg-gray-100 rounded-full"
        >
          <RiDeleteBinLine className="text-xl cursor-pointer invisible group-hover:visible group-hover/del:text-red-500 " />
        </div>
        <div
          onClick={() => {
            setPointerEvents(false);
            updateTodo({
              variables: {
                input: {
                  _id: id,
                  title,
                  completed: !completed,
                },
              },
              onCompleted: () => {
                toast(`Todo marked ${!completed ? "complete" : "incomplete"}`, {
                  type: `${completed ? "warning" : "success"}`,
                  autoClose: 1000,
                });

                refetch();
                setPointerEvents(true);
              },
            });
          }}
          className="p-4 group/check cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <HiCheckCircle
            className={`text-xl  cursor-pointer ${
              completed ? "text-blue-600" : "text-gray-300"
            } `}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleTodo;
