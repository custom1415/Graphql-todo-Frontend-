import {  gql, useMutation } from "@apollo/client";
import "./App.css";
// import DateComponent from "./components/Date";
import Card from "./components/Card";

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
      <Card />
    </div>
  );
}

export default App;
