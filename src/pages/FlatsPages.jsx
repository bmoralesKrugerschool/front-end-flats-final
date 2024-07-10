import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getFlats } from '../servers/flats'; // Asegúrate de que la ruta de importación sea correcta

const FlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [city, setCity] = useState('');
  const [minRentPrice, setMinRentPrice] = useState('');
  const [maxRentPrice, setMaxRentPrice] = useState('');
  const [minAreaSize, setMinAreaSize] = useState('');
  const [maxAreaSize, setMaxAreaSize] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchFlats = async () => {
    setLoading(true);
    setError(null); // Reiniciar el estado de error antes de la nueva solicitud
    try {
      const data = await getFlats(city, minRentPrice, maxRentPrice, minAreaSize, maxAreaSize, page, limit, sortField, sortOrder);
      console.log('data:', data);

      if(data.code === 200) {
        setFlats(data.data.flats || []); // Asegurar que flats sea un arreglo 
      }
      
    } catch (error) {
      setError(error.message || 'Error fetching flats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, [city, minRentPrice, maxRentPrice, minAreaSize, maxAreaSize, page, limit, sortField, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchFlats();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
        <img src="https://i.pinimg.com/originals/b0/67/d1/b067d18ebe9d4d703c827ffd33c07769.gif" alt="Loading..." className="w-20 h-20" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Dividir flats en dos partes
  const topFlats = flats.slice(0, 5);
  const bottomFlats = flats.slice(5, 10);

  return (
    <div className="relative">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
        <div className="bg-[#5C5470] w-full max-w-4xl p-10 rounded-md shadow-md">
          <h2 className="text-2xl text-center text-[#FAF0E6] mb-4">Available Flats</h2>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="bg-[#413c4e] p-4 rounded-md shadow-md mb-8">
              <h3 className="text-xl text-center text-[#FAF0E6] mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Min Rent Price"
                  value={minRentPrice}
                  onChange={(e) => setMinRentPrice(e.target.value)}
                  className="p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max Rent Price"
                  value={maxRentPrice}
                  onChange={(e) => setMaxRentPrice(e.target.value)}
                  className="p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Min Area Size"
                  value={minAreaSize}
                  onChange={(e) => setMinAreaSize(e.target.value)}
                  className="p-2 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max Area Size"
                  value={maxAreaSize}
                  onChange={(e) => setMaxAreaSize(e.target.value)}
                  className="p-2 rounded-md"
                />
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                  className="p-2 rounded-md"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="areaSize">Area Size</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="p-2 rounded-md"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-[#FAF0E6] text-[#352F44] px-4 py-2 rounded-md w-full">
                Search
              </button>
            </div>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {topFlats.map(flat => (
              <div key={flat._id} className="bg-[#413c4e] p-4 rounded-md shadow-md">
                <img src={flat.imageUrl} alt={flat.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.title}</h3>
                <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
                <p className="text-[#FAF0E6] font-bold">${flat.rentPrice}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bottomFlats.map(flat => (
              <div key={flat._id} className="bg-[#413c4e] p-4 rounded-md shadow-md">
                <img src={flat.imageUrl} alt={flat.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.title}</h3>
                <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
                <p className="text-[#FAF0E6] font-bold">${flat.rentPrice}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-[#413c4e] text-[#FAF0E6] px-4 py-2 rounded-md"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="bg-[#413c4e] text-[#FAF0E6] px-4 py-2 rounded-md"
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlatsPage;
