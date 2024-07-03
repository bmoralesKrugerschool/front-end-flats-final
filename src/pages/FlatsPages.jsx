import React from 'react';
import Navbar from '../components/Navbar';

const flatsData = [
  {
    id: 1,
    name: "Flat 1",
    description: "Description of Flat 1",
    price: "$1000/month",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Flat 2",
    description: "Description of Flat 2",
    price: "$1200/month",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Flat 3",
    description: "Description of Flat 3",
    price: "$1500/month",
    imageUrl: "https://via.placeholder.com/150"
  }
  // Agrega más datos según sea necesario
];

function FlatsPage() {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
        <div className="bg-[#5C5470] w-full max-w-4xl p-10 rounded-md shadow-md">
          <h2 className="text-2xl text-center text-[#FAF0E6] mb-4">Available Flats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flatsData.map(flat => (
              <div key={flat.id} className="bg-[#413c4e] p-4 rounded-md shadow-md">
                <img src={flat.imageUrl} alt={flat.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.name}</h3>
                <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
                <p className="text-[#FAF0E6] font-bold">{flat.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlatsPage;
