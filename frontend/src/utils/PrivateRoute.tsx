import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { emptyUser,User } from "./Types";

const PrivateRoute = () => {
    const { user } = useContext(AuthContext) as {user: User}
    return user == emptyUser ? <Navigate to="/"/> : <Outlet />
}

export default PrivateRoute