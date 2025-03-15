import React from "react";

const FoodSection = ({ title, items }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#8B0000] mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-[#FFF5E1] p-4 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
            <p className="text-[#938f29] text-xl">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSection;
