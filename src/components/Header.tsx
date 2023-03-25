import { useUserStore } from "../zustand/userStore";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  console.log(user);

  const MUTATION_LOGOUT = gql`
    mutation {
      logout
    }
  `;
  const [logoutUser,{loading}] = useMutation(MUTATION_LOGOUT, {
    onCompleted: (data) => console.log(data),
  });

  const logoutHandler = () => {
    setUser({ username: "", email: "" });
    logoutUser();
    navigate('/')
  };
  return (
    <div className="flex justify-end px-8 py-4 gap-8 bg-white shadow-sm absolute top-0 left-0 w-full  ">
      <div className="flex items-center">{user.username}</div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={logoutHandler}
      >
        Log Out
      </button>
    </div>
  );
}

export default Header;
