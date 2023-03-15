import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://graphql-todo-backend-production.up.railway.app/`,
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// import "./App.css";
// import DisplayData from "./DisplayData";

// function App() {

//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <DisplayData />
//       </div>
//     </ApolloProvider>
//   );
// }

export default App;
