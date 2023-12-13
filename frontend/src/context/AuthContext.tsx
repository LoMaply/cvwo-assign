import { createContext, useState, useEffect } from "react";
import { User, emptyUser } from "../utils/Types";
import { axiosinstance } from "../utils/AxiosInstance";


const AuthContext = createContext({})

export default AuthContext;

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User>(emptyUser)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser).user)
    }
  }, [])


  // Logs in user
  const loginUser = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: {value: string}
    };
  
    axiosinstance.post(`/login`, {
      username: target.username.value
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
  }

  const contextData = {
    user:user,
    loginUser,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}