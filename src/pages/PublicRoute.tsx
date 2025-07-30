import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const PublicRoute = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
