// function DashboardContent({ cards,values }) {
//     return (
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cards.map((card, index) => (
//             <div key={index} className="bg-white p-4 shadow rounded">{card}<span>{values[index]}</span></div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// export default DashboardContent


import React from 'react';
import { User, ShoppingCart, ChefHat, Truck } from 'lucide-react';

function DashboardContent({ cards, values }) {
  const icons = [
    <User size={40} className="text-blue-500" />, 
    <ShoppingCart size={40} className="text-green-500" />, 
    <ChefHat size={40} className="text-yellow-500" />, 
    <Truck size={40} className="text-red-500" />
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-6 shadow-xl rounded-lg flex items-center space-x-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-4 rounded-full bg-gray-100">{icons[index]}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{card}</h2>
              <p className="text-3xl font-bold text-gray-900">{values[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardContent;
