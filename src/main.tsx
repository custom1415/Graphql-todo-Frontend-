import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const link = createHttpLink({
  uri: `${process.env.GRAPHQL_URI}`,
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
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
