// import { useUserStore } from "../zustand/userStore";
// import { Navigate, Outlet } from "react-router-dom";
// import { gql, useQuery } from "@apollo/client";
// import Header from "../components/Header";
// function PrivateRoute() {
//   const user = useUserStore((state) => state.user);

//   const setUser = useUserStore((state) => state.user);

//   const QUERY_USER = gql`
//     query {
//       showMe {
//         username
//         email
//       }
//     }
//   `;
//   const { data, loading } = useQuery(QUERY_USER, { onCompleted(data) {} });

//   return <>hi</>;
// }

// export default PrivateRoute;
import { useUserStore } from "../zustand/userStore";
import { Navigate, Outlet } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/Header";

function PrivateRoute() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.user);

  const QUERY_USER = gql`
    query {
      showMe {
        username
        email
      }
    }
  `;
  const { data, loading } = useQuery(QUERY_USER);

  if (loading) {
    // show loading indicator while the data is being fetched
    return <div>Loading...</div>;
  }

  if (!data || !data.showMe) {
    // show login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // show the private route content when the data is available
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PrivateRoute;
