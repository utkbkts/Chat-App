import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const initialUserState = JSON.parse(localStorage.getItem("user")) || null;
  const [authState, setAuthState] = useState(initialUserState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => {
  return React.useContext(AuthContext);
};
