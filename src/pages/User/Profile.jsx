import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

const Profile = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {/* Show Home only when at /profile, not for nested routes */}
      {location.pathname === "/profile" && <Home />}
      <Outlet />
    </div>
  );
};

export default Profile;
