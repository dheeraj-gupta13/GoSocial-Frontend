import { useAuth } from "../context/userContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const { token } = useAuth();

    return (
        <div className="flex">
            {token && <div>Leftbar</div>}
            <div className="flex-grow p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
