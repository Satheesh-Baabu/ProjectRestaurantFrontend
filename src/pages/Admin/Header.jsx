import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar ,title}) {
  const navigate = useNavigate();
  const handleLogout = () => {
      sessionStorage.removeItem("token");
      navigate("/");
    };  
  
    return (
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="text-xl font-bold">{title}</div>
        <button
          className="lg:hidden p-2 rounded bg-blue-600 text-white"
          onClick={toggleSidebar}
        >
          Menu
        </button>
        <button onClick={handleLogout} className="block px-4 py-1 text-left text-white bg-orange-500 hover:bg-orange-600">Logout</button>
      </header>
    );
  }
export default Header