import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    birthDate: '',
    status: false,
    photos: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:3006/api/v1/users/updateUser', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.status}
                onChange={handleChange}
                name="status"
              />
            }
            label="Status"
          />
          <input
            type="file"
            name="photos"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
