import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { emptyUser,User } from "./Types";

/**
 * Component to redirect users away from pages requiring authentication to access.
 */
const PrivateRoute = () => {
    const { user } = useContext(AuthContext) as {user: User}
    return user == emptyUser ? <Navigate to="/"/> : <Outlet />
}

export default PrivateRoute