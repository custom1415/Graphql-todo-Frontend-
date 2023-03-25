import { useEffect } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

function useCheckUser() {
  const QUERY_USER = gql`
    query {
      showMe {
        username
        email
      }
    }
  `;
  const { loading, error, data } = useQuery(QUERY_USER, {
    onCompleted(data) {
      console.log(data);
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  return data ? data.showMe : null;
}

export default useCheckUser;
