// routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/userContext";

const ProtectedRoute = () => {
    const { token, loading } = useAuth();
    console.log("Im from protected route", token) // this is not getting printed on console

    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    if (token == null) {
        console.log("IF GOT RUN ", token)
        return <Navigate to="/login" replace />;
    }



    return <Outlet />;
};

export default ProtectedRoute;
