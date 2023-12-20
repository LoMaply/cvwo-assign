import { createContext, useEffect,useState } from "react";

import { axiosinstance } from "../utils/AxiosInstance";
import { emptyUser,User } from "../utils/Types";


const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>(emptyUser)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser).user)
    }
  }, [])


  // Registers new user
  const registerUser = async (name: string) => {

    axiosinstance.post(`/api/users`, {
      username: name
    }).then(response => {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data.user);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
      alert("Username is already taken");
    })
  }

  // Logs in user
  const loginUser = async (name: string) => {
  
    axiosinstance.post(`/login`, {
      username: name
    }).then(response => {
      localStorage.setItem('user', JSON.stringify(response.data));
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

  const contextData = {
    user:user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
