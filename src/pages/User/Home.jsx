import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!isAuthenticated()) {
          alert("Session expired! Please log in again.");
          navigate("/");
        } else {
          setUser(getUser());
        }
      }, [navigate]);
    return (
        <div>
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Hi, {user?.name || "Guest"}
                    </h2>
                    {user ? (
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                to="/profile"
                                className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
                            >
                                Home
                            </Link>
                            <Link
                                to="menulist"
                                className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
                            >
                                Menu List
                            </Link>
                            <Link
                                to="orders"
                                className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
                            >
                                My Orders
                            </Link>
                        </div>
                    ) : (
                        <p className="text-center text-red-500">Error loading profile...</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Home