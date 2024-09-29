import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const initialUserState = localStorage.getItem("user");

  const [authState, setAuthState] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => {
  return React.useContext(AuthContext);
};
