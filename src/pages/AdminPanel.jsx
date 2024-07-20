import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Container, Box, Typography, Button, TextField, IconButton, Grid } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminPanel = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [flats, setFlats] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [editFlat, setEditFlat] = useState(null);
    const [formData, setFormData] = useState({});

    const { themeMode } = useTheme();

    useEffect(() => {
        if (user?.role !== 'admin') {
            window.location.href = '/';
        }
        fetchUsers();
        fetchFlats();
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3006/api/v1/user/');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFlats = async () => {
        try {
            const response = await axios.get('http://localhost:3006/api/v1/flats/getFlats');
            setFlats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setFormData(user);
    };

    const handleEditFlat = (flat) => {
        setEditFlat(flat);
        setFormData(flat);
    };

    const handleDeleteUser = async (userId) => {
        if (user?.id === userId) {
            alert("You cannot delete your own account.");
            return;
        }
        try {
            await axios.delete(`http://localhost:3006/api/v1/user/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteFlat = async (flatId) => {
        try {
            await axios.delete(`http://localhost:3006/api/v1/flats/${flatId}`);
            fetchFlats();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveUser = async () => {
        try {
            await axios.put(`http://localhost:3006/api/v1/user/${editUser._id}`, formData);
            fetchUsers();
            setEditUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveFlat = async () => {
        try {
            await axios.put(`http://localhost:3006/api/v1/flats/${editFlat._id}`, formData);
            fetchFlats();
            setEditFlat(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Container maxWidth="lg" sx={{ bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6', minHeight: '100vh' }}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                    Admin Panel
                </Typography>

                <Typography variant="h5" sx={{ mb: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                    Users
                </Typography>
                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user._id}>
                            <Box sx={{ p: 2, bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7', borderRadius: 2, boxShadow: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                                    Name: {user.name}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                                    Email: {user.email}
                                </Typography>
                                {editUser?._id === user._id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <Button onClick={handleSaveUser} variant="contained" color="primary" sx={{ mr: 1 }}>
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditUser(null)} variant="outlined" color="secondary">
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEditUser(user)} variant="outlined" color="primary" sx={{ mr: 1 }}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => handleDeleteUser(user._id)} variant="outlined" color="error">
                                            <DeleteIcon />
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                    Flats
                </Typography>
                <Grid container spacing={2}>
                    {flats.map((flat) => (
                        <Grid item xs={12} sm={6} md={4} key={flat._id}>
                            <Box sx={{ p: 2, bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7', borderRadius: 2, boxShadow: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                                    Title: {flat.title}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                                    Description: {flat.description}
                                </Typography>
                                {editFlat?._id === flat._id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            sx={{ mb: 1 }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <Button onClick={handleSaveFlat} variant="contained" color="primary" sx={{ mr: 1 }}>
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditFlat(null)} variant="outlined" color="secondary">
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEditFlat(flat)} variant="outlined" color="primary" sx={{ mr: 1 }}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => handleDeleteFlat(flat._id)} variant="outlined" color="error">
                                            <DeleteIcon />
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default AdminPanel;
