import { createContext, useEffect, useState } from "react";

import { authorizedinstance, axiosinstance } from "../utils/AxiosInstance";
import { emptyUser,User } from "../utils/Types";


const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>(emptyUser)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser && (user == emptyUser)) {
      loadUser(loggedInUser);
    }
  }, [])

  // Automatically logs in user based on token from localStorage
  const loadUser = async (token: string) => {
    await axiosinstance.post(`/load`, {
      token: token
    }).then(response => {
      const user: User = response.data.user;
      // Fix issue where null user may be returned when localStorage contains invalid token
      if (user != null) {
        setUser(response.data.user);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  // Logs out user
  const logoutUser = () => {
    setUser(emptyUser);
    localStorage.clear();
  };

  // Delete user
  const deleteUser = async (token: string) => {
    await authorizedinstance(token).delete(`/api/users/${user.id}`).then(response => console.log(response.data)).catch(error => console.log(error));
    setUser(emptyUser);
    localStorage.clear();
  }
  

  const contextData = {
    user:user,
    setUser,
    logoutUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
