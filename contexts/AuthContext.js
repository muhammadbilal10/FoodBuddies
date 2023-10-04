import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; // Import your Firebase authentication instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (uid) => {
    // Set the user ID in the context state
    setUser(uid);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        loginUser(authUser.uid); // Call the loginUser function with the UID
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
