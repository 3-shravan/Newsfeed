import React, { createContext, useContext, useEffect, useState } from "react";
import { checkLocalStorageLoggedInStatus } from "../pages/common";
import { getCurrentUserService } from "../services";
import token from "@/utils/token";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Set to null initially to handle async properly

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await checkLocalStorageLoggedInStatus();
      const { status, payload } = await getCurrentUserService();

      if (!status || !loginStatus) {
        setIsLoggedIn(false);  
        return;
      }

      // console.log(payload);
     


      setIsLoggedIn(true);   
      setCurrentUser(payload);
    };

    checkLoginStatus();
  }, []);

  
  // if (isLoggedIn === null) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //         backgroundColor: "#f0f0f0",
  //       }}
  //     >
  //       <div
  //         style={{
  //           width: "50px",
  //           height: "50px",
  //           border: "6px solid #ccc",
  //           borderTop: "6px solid #007bff", 
  //           borderRadius: "50%",
  //           animation: "spin 1s linear infinite",
  //         }}
  //       />
  //       <style>
  //         {`
  //           @keyframes spin {
  //             0% {
  //               transform: rotate(0deg);
  //             }
  //             100% {
  //               transform: rotate(360deg);
  //             }
  //           }
  //         `}
  //       </style>
  //     </div>
  //   );
  // }
  
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    token.removeAll();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
