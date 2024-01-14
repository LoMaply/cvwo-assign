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
    axiosinstance.post(`/load`, {
      token: token
    }).then(response => {
      const user: User = response.data.user;
      // Fix issue where null user may be returned when localStorage contains invalid token
      if (user != null) {
        setUser(response.data.user);
        console.log(response.data.user)
      }
    }).catch(error => {
      console.log(error);
    })
  }

  // Registers new user
  const registerUser = async (name: string) => {
    axiosinstance.post(`/api/users`, {
      username: name
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
      alert("Username is already taken (register)");
    })
  }

  // Logs in user
  const loginUser = async (name: string) => {
    axiosinstance.post(`/login`, {
      username: name
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
      alert("Invalid username");
    });
  };

  // Logs out user
  const logoutUser = () => {
    setUser(emptyUser);
    localStorage.clear();
  };

  // Updates username
  const updateUser = async (token: string, name: string) => {
    authorizedinstance(token).patch(`/api/users/${user.id}`, {
      username: name
    }).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
      alert("Username is already taken (update)");
    })
  }

  // Delete user
  const deleteUser = async (token: string) => {
    authorizedinstance(token).delete(`/api/users/${user.id}`).then(response => console.log(response.data)).catch(error => console.log(error));
    setUser(emptyUser);
    localStorage.clear();
  }
  

  const contextData = {
    user:user,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
