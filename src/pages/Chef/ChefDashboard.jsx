import React from 'react'
import { useState } from 'react';
import Sidebar from './SidebarChef';
import HomeChef from './HomeChef'
import Header from './HeaderChef';

function ChefDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('Welcome');
    const [currentComponent, setCurrentComponent] = useState('home');
    const menuItems = ['Home'];
    const links = ['/chef'];
  
    const componentsMap = {
      home: <HomeChef/>,
    };
  
    // Handle menu item clicks to change the header title and component
    const handleMenuClick = (item, index) => {
      setHeaderTitle(item);
      setCurrentComponent(['home',][index]);
    };
    return (
      <div>
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          menuItems={menuItems} // Pass the menu items
          links={links}          // Pass the corresponding links
          onMenuClick={handleMenuClick}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} title={headerTitle} />
          <main className="flex-1 overflow-y-auto p-4">
            {componentsMap[currentComponent] || <HomeChef />}
          </main>
        </div>
      </div>
      </div>
    )
}

export default ChefDashboard;