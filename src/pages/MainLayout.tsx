// import { useAuth } from "../context/userContext";
import { Outlet } from "react-router-dom";
import Leftbar from "../components/Leftbar";
import "./MainLayout.css"

const MainLayout = () => {
    // const { token } = useAuth();

    return (
        <div className="layout">
            <Leftbar />
            <div className="main-content">
                <Outlet /> {/* Feed, Profile, etc. will render here */}
            </div>
        </div>
    );
};

export default MainLayout;
