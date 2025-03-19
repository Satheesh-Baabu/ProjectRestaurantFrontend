

// emailid                                password       role
// --------------------------------------------------------------
// msvrestaurant123@gmail.com          Testing@123        user
// satheeshbaabum@gmail.com            satheesh           admin
// supplier                            supplier           supplier or server  


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/User/Profile";
import MenuList from "./pages/User/MenuList";
import Dashboard from "./pages/Admin/Dashboard";
import AddFood from "./pages/Admin/AddFood";
import Unauthorized from "./utils/Unauthorized";
import ProtectedRoute from "./utils/ProtectedRoute";
import Orders from "./pages/User/Orders"
import LandingPage from "./pages/Landing/Landing";
// import SupplierDashboard from "./pages/Supplier/SupplierDashboard"
import HomeSupplier from "./pages/Supplier/HomeSupplier"
import Payment from "./pages/User/Payment";
import ChefDashboard from "./pages/Chef/ChefDashboard";

function App() {

  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
          <Route path="/addfood" element={<AddFood />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={ <ProtectedRoute allowedRoles={["admin"]}><Dashboard/></ProtectedRoute>}>
            <Route path="home" />
            <Route path="qrgenerator" />
            <Route path="tablelist" />
            <Route path="foodlist" />
            <Route path="addfood" />
            <Route path="users"/>
            <Route path="add-users"/>
            <Route path="orders"/>
          </Route>
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><Profile /></ProtectedRoute>} >
            <Route path="menulist" element={<MenuList/>}/>
            <Route path="orders" element={<Orders/>}/> 
          </Route>
          <Route path="/payment" element={<Payment/>}/> 
          <Route path="/supplier" element={<ProtectedRoute allowedRoles={["supplier"]}><HomeSupplier/></ProtectedRoute>} >
            
          </Route>
          <Route path="/chef" element={<ProtectedRoute allowedRoles={["chef"]}><ChefDashboard/></ProtectedRoute>} >
            
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;