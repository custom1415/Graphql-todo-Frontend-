import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/userStore";
import { ReactNode } from "react";

function PublicRoute() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      {user.username ? (
        <>
          <Navigate to="/app" />
        </>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}

export default PublicRoute;
