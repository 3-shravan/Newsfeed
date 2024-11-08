// import React from "react";
// import { Navigate, useLocation, Outlet } from "react-router-dom";
// import { useAuth } from "./authContext";

// function ProtectedRouteBase({ userType }) {
//   const { isLoggedIn, currentUser } = useAuth();
//   const location = useLocation();

//   if (isLoggedIn === null) {
//     return <div>Loading...</div>;
//   }

//   const isAuthorized = isLoggedIn && currentUser?.userType === userType;
//   console.log(isAuthorized);

//   if (!isAuthorized) {
//     confirm(`You are not authorized to view this page. Please log in as a ${userType}.`);
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return <Outlet />;
// }

// export function ProtectedRoute() {
//   return <ProtectedRouteBase userType="user" />;
// }

// export function ProtectedRouteAdmin() {
//   return <ProtectedRouteBase userType="admin" />;
// }





import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

export function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
const {currentUser} = useAuth();
  const isUser = currentUser.userType === "user";

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn && isUser? (
    <Outlet />
  ) : (  confirm("You are not authorized to view this page. Please log in as a user to view this page.") &&
    <Navigate to="/login" state={{ from: location }} />
  );
}

export  function ProtectedRouteAdmin() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const {currentUser} = useAuth();
  const isAdmin = currentUser.userType === "admin";
  
     console.log(isAdmin);
     console.log(isLoggedIn);
  if (isLoggedIn === null) {
     return <div>Loading...</div>;
  }

  return isLoggedIn && isAdmin ? (
     <Outlet />
  ) : (
     confirm("You are not authorized to view this page. Please log in as an admin to view this page.") &&
     <Navigate to="/login" state={{ from: location }} />
  );
}
