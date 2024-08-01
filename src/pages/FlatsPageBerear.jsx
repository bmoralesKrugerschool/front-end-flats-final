import React, { useEffect, useState } from 'react';
import { getFlatsBerear } from '../servers/flats';

const FlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    city: '',
    minRentPrice: '',
    maxRentPrice: '',
    minAreaSize: '',
    maxAreaSize: '',
    sortField: 'name',
    sortOrder: 'asc',
  });

  const fetchFlats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFlatsBerear(
        filters.city,
        filters.minRentPrice,
        filters.maxRentPrice,
        filters.minAreaSize,
        filters.maxAreaSize,
        page,
        limit,
        filters.sortField,
        filters.sortOrder
      );
      if (data.code === 200) {
        setFlats(data.data.flats || []);
      } else {
        setError(data.message || 'Error fetching flats');
      }
    } catch (error) {
      setError(error.message || 'Error fetching flats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, [filters, page, limit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFlats();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
        <img
          src="https://i.pinimg.com/originals/b0/67/d1/b067d18ebe9d4d703c827ffd33c07769.gif"
          alt="Loading..."
          className="w-20 h-20"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#352F44] p-4">
        <p className="text-[#FAF0E6]">Error: {error}</p>
      </div>
    );
  }

  const topFlats = flats.slice(0, 5);
  const bottomFlats = flats.slice(5, 10);

  return (
    <div className="min-h-screen bg-[#352F44] p-4">
      <div className="bg-[#5C5470] max-w-4xl mx-auto p-8 rounded-md shadow-md">
        <h2 className="text-2xl text-center text-[#FAF0E6] mb-6">Available Flats</h2>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-[#413c4e] p-6 rounded-md shadow-md mb-8">
            <h3 className="text-xl text-center text-[#FAF0E6] mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={filters.city}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                name="minRentPrice"
                placeholder="Min Rent Price"
                value={filters.minRentPrice}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                name="maxRentPrice"
                placeholder="Max Rent Price"
                value={filters.maxRentPrice}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                name="minAreaSize"
                placeholder="Min Area Size"
                value={filters.minAreaSize}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                name="maxAreaSize"
                placeholder="Max Area Size"
                value={filters.maxAreaSize}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              />
              <select
                name="sortField"
                value={filters.sortField}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="areaSize">Area Size</option>
              </select>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="p-2 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#FAF0E6] text-[#352F44] px-4 py-2 rounded-md w-full"
            >
              Search
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topFlats.map(flat => (
            <div key={flat._id} className="bg-[#413c4e] p-4 rounded-md shadow-md">
              <img
                src={flat.imageUrl}
                alt={flat.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.title}</h3>
              <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
              <p className="text-[#FAF0E6] font-bold">${flat.rentPrice}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottomFlats.map(flat => (
            <div key={flat._id} className="bg-[#413c4e] p-4 rounded-md shadow-md">
              <img
                src={flat.imageUrl}
                alt={flat.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl text-[#FAF0E6] mb-2">{flat.title}</h3>
              <p className="text-[#B9B4C7] mb-2">{flat.description}</p>
              <p className="text-[#FAF0E6] font-bold">${flat.rentPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlatsPage;
