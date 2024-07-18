// src/components/CreateFlatForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewFlatsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateAvailable: '',
    hasAc: false,
    rentPrice: '',
    streetName: '',
    streetNumber: '',
    user: '',
    yearBuilt: '',
    status: false,
    bathroom: '',
    bedrooms: '',
    parkingLot: '',
    petsAllowed: false,
    img: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await axios.post('http://localhost:3006/api/v1/flats/createFlat', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/table-page'); // Redirect to the table page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in.');
      } else {
        setError('There was an error creating the flat.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded w-full max-w-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <TextField
          label="Date Available"
          type="date"
          name="dateAvailable"
          value={formData.dateAvailable}
          onChange={handleChange}
          fullWidth
          className="mb-4"
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="hasAc"
              checked={formData.hasAc}
              onChange={handleChange}
            />
          }
          label="Has AC"
          className="mb-4"
        />
        <TextField
          label="Rent Price"
          name="rentPrice"
          value={formData.rentPrice}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Street Name"
          name="streetName"
          value={formData.streetName}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Street Number"
          name="streetNumber"
          value={formData.streetNumber}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="User"
          name="user"
          value={formData.user}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Year Built"
          name="yearBuilt"
          value={formData.yearBuilt}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
          }
          label="Status"
          className="mb-4"
        />
        <TextField
          label="Bathroom"
          name="bathroom"
          value={formData.bathroom}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Parking Lot"
          name="parkingLot"
          value={formData.parkingLot}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
            />
          }
          label="Pets Allowed"
          className="mb-4"
        />
        <input
          type="file"
          name="img"
          onChange={handleFileChange}
          className="mb-4"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Flat
        </Button>
      </form>
    </div>
  );
};

export default NewFlatsPage;
