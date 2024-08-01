import React, { useState, useEffect } from 'react';
import { getFlats } from '../servers/flats';
import { CircularProgress } from '@mui/material';

const FlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setError(null);
    try {
      const data = await getFlats(city, minRentPrice, maxRentPrice, minAreaSize, maxAreaSize, page, limit, sortField, sortOrder);
      if (data.code === 200) {
        setFlats(data.data.flats || []);
      } else {
        setFlats([]);
      }
    } catch (error) {
      setError('Error fetching flats');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFlats();
  };

  useEffect(() => {
    fetchFlats();
  }, [city, minRentPrice, maxRentPrice, minAreaSize, maxAreaSize, page, limit, sortField, sortOrder]);

  return (
    <div className="bg-[#352F44] min-h-screen p-4">
      <div className="bg-[#5C5470] p-6 rounded-md shadow-md max-w-full mx-auto mb-8">
        <h2 className="text-2xl text-center text-[#FAF0E6] mb-4">Available Flats</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="p-6 rounded-md shadow-md max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              />
              <input
                type="number"
                placeholder="Min Rent Price"
                value={minRentPrice}
                onChange={(e) => setMinRentPrice(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              />
              <input
                type="number"
                placeholder="Max Rent Price"
                value={maxRentPrice}
                onChange={(e) => setMaxRentPrice(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              />
              <input
                type="number"
                placeholder="Min Area Size"
                value={minAreaSize}
                onChange={(e) => setMinAreaSize(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              />
              <input
                type="number"
                placeholder="Max Area Size"
                value={maxAreaSize}
                onChange={(e) => setMaxAreaSize(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="areaSize">Area Size</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 rounded-md bg-[#FAF0E6] text-[#352F44] border border-[#352F44] focus:outline-none focus:ring-2 focus:ring-[#E384FF]"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button type="submit" className="mt-4 bg-[#E384FF] text-[#FAF0E6] px-4 py-2 rounded-md w-full hover:bg-[#D373D6] transition duration-300">
              Search
            </button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
          <CircularProgress color="secondary" size={60} />
        </div>
      )}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flats.length > 0 ? flats.map(flat => (
            <div key={flat._id} className="bg-[#5C5470] p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={flat.imageUrl} alt={flat.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.title}</h3>
              <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
              <p className="text-[#FAF0E6] font-bold">${flat.rentPrice}</p>
            </div>
          )) : <p className="text-center text-[#FAF0E6]">No flats found</p>}
        </div>
      )}
    </div>
  );
};

export default FlatsPage;
