import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Avatar, Grid, MenuItem, Select, InputLabel } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import LoginModal from '../components/LoginModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { themeMode } = useTheme();
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        birthDate: '',
        role: '',
        avatar: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.id) {
                try {
                    console.log('Fetching user data for ID:', user.id);
                    const response = await axios.get(`http://localhost:3006/api/v1/user/${userId}`)
                    console.log('User data fetched:', response.data);
                    const userData = response.data;
                    setFormData({
                        name: userData.name || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                        birthDate: userData.birthDate || '',
                        role: userData.role || '',
                        avatar: userData.avatar || ''
                    });
                } catch (error) {
                    console.error('Failed to fetch user data:', error.response ? error.response.data : error.message);
                    setOpenLoginModal(true);
                }
            } else {
                console.log('User ID is missing or invalid');
                setOpenLoginModal(true);
            }
            setLoading(false);
        };
        fetchUserData();
    }, [user]);    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({ ...prevState, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.put(`http://localhost:3006/api/v1/user/${user.id}`, formData);
            setIsEditing(false);
            setErrors({});
        } catch (error) {
            console.error('Failed to update profile:', error.response ? error.response.data : error.message);
        }
    };

    const validateFormData = (data) => {
        const errors = {};
        if (!data.name) errors.name = 'First name is required';
        if (!data.lastName) errors.lastName = 'Last name is required';
        if (!data.email) errors.email = 'Email is required';
        if (!data.birthDate) errors.birthDate = 'Birth date is required';
        if (!data.role) errors.role = 'Role is required';
        return errors;
    };

    const handleLoginSuccess = () => {
        setOpenLoginModal(false);
        // Trigger a refresh of user data if needed
        window.location.reload();
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ 
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <Box sx={{ p: 4, bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7', borderRadius: 2, boxShadow: 3, width: '100%', maxWidth: '600px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar src={formData.avatar} sx={{ width: 100, height: 100, mr: 2 }} />
                    {isEditing ? (
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                    ) : (
                        <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                            User ID: {user?.id}
                        </Typography>
                    )}
                </Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                disabled={!isEditing}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button onClick={() => navigate('/send-code')} variant="outlined" color="primary" sx={{ mb: 3 }} disabled={!isEditing}>
                                Change Password
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Birth Date"
                                name="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                InputLabelProps={{ shrink: true }}
                                disabled={!isEditing}
                                error={!!errors.birthDate}
                                helperText={errors.birthDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                fullWidth
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={!isEditing}
                                sx={{ mb: 3 }}
                                error={!!errors.role}
                                helperText={errors.role}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="landlord">Landlord</MenuItem>
                                <MenuItem value="renter">Renter</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            {isEditing ? (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                </Box>
                            ) : (
                                <Button onClick={() => setIsEditing(true)} variant="contained" color="primary">
                                    Edit
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
            </Box>
        </Container>
    );
};

export default ProfilePage;
