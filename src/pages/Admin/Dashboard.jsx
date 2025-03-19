import React, { useState, useEffect } from 'react';
import { Home, QrCode, List, Utensils, PlusCircle, Users, UserPlus, User, ShoppingCart, ChefHat, Truck } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import QRgenerator from './QRgenerator';
import TableList from './TableList';
import FoodList from './FoodList';
import AddFood from './AddFood';
import UsersComponent from './Users';
import AddUsers from './AddUsers';
import axios from 'axios';
import Orders from './Orders';
import { getCountURL } from '../../services/api';

function DashboardContent({ cards, values }) {
  const icons = [<User size={30} />, <ShoppingCart size={30} />, <ChefHat size={30} />, <Truck size={30} />];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg flex items-center space-x-4">
            <div className="text-orange-500">{icons[index]}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{card}</h2>
              <p className="text-2xl font-bold text-gray-900">{values[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Welcome');
  const [currentComponent, setCurrentComponent] = useState('home');
  const [count, setCount] = useState({});

  // Menu items with icons
  const menuItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'QR Code Generator', icon: <QrCode size={20} /> },
    { name: 'Table List', icon: <List size={20} /> },
    { name: 'Food List', icon: <Utensils size={20} /> },
    { name: 'Add Food', icon: <PlusCircle size={20} /> },
    { name: 'Orders', icon: <UserPlus size={20} /> },
    { name: 'Users', icon: <Users size={20} /> },
    { name: 'Add Supplier/Chef', icon: <UserPlus size={20} /> },
  ];
  const links = ['/dashboard/home', '/dashboard/qrgenerator', '/dashboard/tablelist', '/dashboard/foodlist', '/dashboard/addfood','/dashboard/orders', '/dashboard/users', '/dashboard/add-users'];

  const componentsMap = {
    home: <DashboardContent cards={['Users', 'Today Orders', 'Chefs', 'Suppliers']} values={[count.user, count.order, count.chef, count.supplier]} />, 
    qrgenerator: <QRgenerator />, 
    tablelist: <TableList />, 
    foodlist: <FoodList />, 
    addfood: <AddFood />, 
    orders:<Orders/>,
    users: <UsersComponent />, 
    addusers: <AddUsers />,
  };

  const handleMenuClick = (item, index) => {
    setHeaderTitle(item.name);
    setCurrentComponent(['home', 'qrgenerator', 'tablelist', 'foodlist', 'addfood', 'orders' ,'users', 'addusers'][index]);
  };

  useEffect(() => {
    async function getCount() {
      const res = await getCountURL();
      setCount(res.data);
    }
    getCount();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
        links={links}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} title={headerTitle} />
        <main className="flex-1 overflow-y-auto p-6">
          {componentsMap[currentComponent] || <DashboardContent />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
